"use client";
import React, { useEffect, useState } from "react";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import {
  Box,
  TextField,
  Paper,
  Grid,
  Typography,
  MenuItem,
  Autocomplete,
  ButtonBase,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function CreatePortfolio() {
  const latestPrice = useSelector((state: any) => state.latestPrice);

  const stockList = latestPrice.map((item: any) => item.tradingCode);

  const [cards, setCards] = useState([1]);

  const [price, setPrice] = useState(0);

  const [portfolioName, setPortfolioName] = useState("");

  const [portfolioItems, setPortfolioItems] = useState<any>({
    tradingCode_1: "",
    quantity_1: "",
    price_1: "",
    commission_1: 0.4,
  });

  function handleInputChange(e: any, itemIndex: number) {
    setPortfolioItems({
      ...portfolioItems,
      [e.target.name]: e.target.value,
    });
    console.log(portfolioItems);
  }

  useEffect(() => {}, [portfolioItems]);

  function handleTradingCodeChange(
    e: any,
    newValue: any,
    reason: any = "selectOption",
    itemIndex: number
  ) {
    const stock = latestPrice.find(
      (item: any) => item.tradingCode === newValue
    );

    setPrice(stock.ltp);
    setPortfolioItems((prevstate: any) => {
      prevstate[itemIndex]["tradingCode"] = newValue;

      prevstate[itemIndex]["price"] = stock.ltp;
      return prevstate;
    });
  }

  function handleNameChange(e: any) {
    setPortfolioName(e.target.value);
  }

  function handleAddMore() {
    setCards((prevstate: any) => {
      const last = prevstate[prevstate.length - 1];
      return [...prevstate, last + 1];
    });

    setPortfolioItems((prevstate: any) => {
      prevstate.push({
        tradingCode: "",
        quantity: 0,
        price: 0,
        commission: 0.4,
      });
      return prevstate;
    });
  }

  console.log(portfolioName, portfolioItems);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
      <Box sx={{ mt: 2, mb: 6, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          name="porfolioName"
          label="Porfolio name"
          type="text"
          variant="filled"
          value={portfolioName}
          onChange={handleNameChange}
        />
      </Box>
      {cards.map((item: number) => (
        <Paper
          key={item}
          elevation={4}
          sx={{ pt: 2, pb: 3, borderRadius: 2, px: 2, my: 2 }}
        >
          <Typography
            sx={{ fontSize: "1rem", color: "text.primary", ml: 0.5, mb: 2 }}
          >
            ITEM {item}
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12} sm={6}>
              <Autocomplete
                onChange={(e, value, reason) =>
                  handleTradingCodeChange(e, value, reason, item)
                }
                options={stockList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Stock"
                    placeholder="Select to add items to your list"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name={`quantity_${item}`}
                type="number"
                value={portfolioItems["quantity_" + item]}
                onChange={(e) => handleInputChange(e, item)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name={`price_${item}`}
                type="number"
                value={portfolioItems["price_" + item]}
                onChange={(e) => handleInputChange(e, item)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Commission (%)"
                name={`commission_${item}`}
                type="number"
                value={portfolioItems["commission_" + item]}
                onChange={(e) => handleInputChange(e, item)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box>
        <Button
          startIcon={<AddCircleOutlineRoundedIcon />}
          sx={{
            px: 4,
            mt: 3,
            borderRadius: 6,
          }}
          onClick={handleAddMore}
          variant="contained"
        >
          Add more items
        </Button>
      </Box>
    </Box>
  );
}
