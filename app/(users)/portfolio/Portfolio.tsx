"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Paper, Typography, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Spinner from "@/components/shared/Spinner";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any>();

  const auth = useSelector((state: any) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  async function getData() {
    setIsLoading(true);
    const res: any = await fetch(`/api/portfolio?user=${auth._id}`, {
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

  async function handlePortfolioDelete(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/portfolio/item?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Portfolio delete successful");
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
  }

  useEffect(() => {
    getData();
  }, [auth]);

  return (
    <Box sx={{ mx: 4 }}>
      {isLoading && <Spinner />}
      <Box>
        <Button
          component={Link}
          href="/portfolio/create"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 6, px: 4, mt: 2, mb: 4 }}
        >
          Create new portfolio
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {portfolio?.map((item: any) => (
          <Paper
            sx={{ width: 380, py: 2, my: 2, mx: 2, borderRadius: 2 }}
            elevation={6}
            key={item._id}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                textAlign: "left",
                color: "primary.main",
                mb: 1,
                px: 2,
              }}
            >
              {item.name}
            </Typography>
            <Divider />
            <Box sx={{ px: 2, pt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 0.8,
                }}
              >
                <Typography fontSize="1rem">Total portfolio</Typography>
                <Typography fontSize="1.2rem">
                  {item.totalCost}{" "}
                  <Typography component="span" color="text.secondary">
                    BDT
                  </Typography>
                </Typography>
              </Box>
              <Divider light />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 0.8,
                }}
              >
                <Typography fontSize="1rem">Market value</Typography>
                <Typography fontSize="1.2rem">
                  {item.totalSellValue}{" "}
                  <Typography component="span" color="text.secondary">
                    BDT
                  </Typography>
                </Typography>
              </Box>
              <Divider light />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 0.8,
                }}
              >
                <Typography fontSize="1rem">Unrealized gain</Typography>
                <Typography
                  fontSize="1.2rem"
                  color={
                    item.unrealizedGain < 0 ? "error.main" : "success.main"
                  }
                >
                  {item.unrealizedGain}{" "}
                  <Typography component="span" color="text.secondary">
                    BDT
                  </Typography>
                </Typography>
              </Box>
              <Divider light />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 0.8,
                }}
              >
                <Typography fontSize="1rem">Unrealized gain (%)</Typography>
                <Typography
                  fontSize="1.2rem"
                  color={
                    item.unrealizedGain < 0 ? "error.main" : "success.main"
                  }
                >
                  {item.unrealizedGainPercent || 0}{" "}
                  <Typography component="span" color="text.secondary">
                    BDT
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 2 }}
            >
              {" "}
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ ml: 1.5 }}
                onClick={() => handlePortfolioDelete(item._id)}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ ml: 1.5 }}
                component={Link}
                href={`/portfolio/${item._id}`}
              >
                View details
              </Button>
              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{ ml: 1.5 }}
                component={Link}
                href={`/portfolio/trade?portfolio=${item._id}&comm=${item.commission}`}
              >
                Buy/Sell
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ mt: 2, maxWidth: 400, mx: "auto" }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Box>
  );
}
