"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import { Box, Typography, Button, Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Spinner from "@/components/shared/Spinner";

const formatColor = (value: any) => {
  const res = value === 0 ? "#2962ff" : value < 0 ? "#f45e6a" : "#00A25B";
  return res;
};

export default function View({ id }: any) {
  const [portfolio, setPortfolio] = useState<any>();

  const auth = useSelector((state: any) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  console.log(portfolio);

  async function getData() {
    setIsLoading(true);
    const res: any = await fetch(`/api/portfolio/details?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    setIsLoading(false);
    return setPortfolio(data);
  }

  useEffect(() => {
    getData();
  }, [auth]);

  return (
    <Box>
      {isLoading && <Spinner />}

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2, my: 2 }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: 700, mx: 2, my: 1 }}>
          {portfolio?.name}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  fontSize: "1rem",
                  fontWeight: 500,
                  bgcolor: "financeCardTitlecolor",
                  color: "text.primay",
                },
              }}
            >
              <TableCell>
                <Typography>Trading Code</Typography>
                <Typography>Qty@Buy Price</Typography>
              </TableCell>
              <TableCell>
                <Typography>LTP</Typography>
                <Typography>Total Cost</Typography>
              </TableCell>
              <TableCell>
                <Typography>Total Sell Value</Typography>
                <Typography>Gain/Loss</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio?.stocks?.map((stock: any, index: number) => (
              <TableRow
                hover={true}
                sx={{
                  ".MuiTableCell": {
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                }}
                key={index}
              >
                <TableCell align="left">
                  <Typography
                    component={Link}
                    href={`/stock-details/${stock.tradingCode}`}
                    sx={{
                      color: "primary.main",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    {stock.tradingCode}
                  </Typography>
                  <Typography>
                    {stock.quantity}@{stock.buyPrice}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>{stock.sellPrice}</Typography>
                  <Typography>{stock.totalBuyPrice}</Typography>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: formatColor(stock.unrealizedGain) }}
                >
                  <Typography>{stock.totalSellPrice.toFixed(2)}</Typography>
                  <Typography>
                    {`${stock.unrealizedGain.toFixed(
                      2
                    )} (${stock.unrealizedGainPercent.toFixed(2)}%)`}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow hover={true}>
              <TableCell align="left">
                <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  Total
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  {portfolio?.totalPortfolioBuyPrice}
                </Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  color: formatColor(portfolio?.totalUnrealizedGain),
                }}
              >
                <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  {portfolio?.totalPortfolioSellPrice.toFixed(2)}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                  {`${portfolio?.totalUnrealizedGain.toFixed(2) || 0} (${
                    portfolio?.totalUnrealizedGainPercent.toFixed(2) || 0
                  }%)`}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ px: 4, borderRadius: 12 }}
          component={Link}
          href={`/portfolio/trade?portfolio=${portfolio?._id}&comm=${portfolio?.commission}`}
        >
          Buy/Sell
        </Button>
      </Box>
    </Box>
  );
}
