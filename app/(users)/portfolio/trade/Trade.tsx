"use client";
import SearchStockCard from "@/components/cards/SearchStockCard";
import { Box, Typography, Button, Grid, TextField, Menu } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem, Alert } from "@mui/material";
import Spinner from "@/components/shared/Spinner";

export default function Trade(props: any) {
  const { portfolio, comm } = props;

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [searchResult, setSearchResult] = useState(latestPrice);

  const [formInputs, setFormInputs] = useState({
    price: "",
    quantity: "",
    tradingCode: "",
    portfolioId: portfolio,
    commission: comm,
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const auth = useSelector((state: any) => state.auth);

  const [searchResultFallbackText, setSearchResultFallbackText] =
    useState("Loading data..");

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const getSharesBySearch = async (init = false) => {
    const initdata = latestPrice || [];
    const data = initdata.filter(
      (item: any) =>
        item.tradingCode?.search(new RegExp(searchText, "i")) !== -1 ||
        item.companyName?.search(new RegExp(searchText, "i")) !== -1
    );
    if (data.length === 0) {
      setSearchResultFallbackText("No results found");
    } else {
      setSearchResultFallbackText("");
      setSearchResult(data);
    }
  };

  function handleTradeOpen(tradingCode: string) {
    const ltp = latestPrice.find(
      (item: any) => item.tradingCode === tradingCode
    ).ltp;
    setDialogOpen(true);
    setFormInputs((prevState: any) => ({
      ...prevState,
      tradingCode,
      price: ltp,
    }));
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function handleInputChange(e: any) {
    setFormInputs((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await fetch(`/api/trade`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(formInputs),
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Request execution successful");
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 500);
      return () => clearTimeout(debounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    setSearchResult(latestPrice);
  }, [latestPrice]);

  return (
    <Box>
      {isLoading && <Spinner />}
      <TextField
        name="searchText"
        fullWidth
        autoFocus
        value={searchText}
        size="small"
        variant="filled"
        onChange={handleSearchTextChange}
        sx={{ fontSize: "1.1rem", mb: 3 }}
        placeholder="Search stocks"
      />

      {searchResult.map((item: any) => (
        <Box
          key={item.tradingCode}
          onClick={() => handleTradeOpen(item.tradingCode)}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <SearchStockCard data={item} />
        </Box>
      ))}

      <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
        {searchResultFallbackText}
      </Typography>

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Share buy/sell request
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ px: 4, py: 4 }}>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              alignContent="stretch"
              wrap="wrap"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Trading Code"
                  name="tradingCode"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={formInputs.tradingCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formInputs.quantity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Price"
                  name="price"
                  type="number"
                  value={formInputs.price}
                  onChange={handleInputChange}
                  helperText="Latest trading price"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Commission (%)"
                  name="commission"
                  value={formInputs.commission}
                  inputProps={{
                    readOnly: true,
                  }}
                  helperText="You have set it during portfolio creation"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  id="outlined-select-currency"
                  fullWidth
                  required
                  label="Trade type"
                  name="type"
                  value={formInputs.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
              )}
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Box>
          </DialogContent>
          <DialogActions sx={{ my: 1, mr: 3 }}>
            <Button
              onClick={handleDialogClose}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
