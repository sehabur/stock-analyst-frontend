"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Paper, Typography, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Spinner from "@/components/shared/Spinner";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any>();

  const auth = useSelector((state: any) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [deleteItemId, setDeleteItemId] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickDelete = (id: string) => {
    setDeleteItemId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  async function handlePortfolioDelete() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/portfolio/item?id=${deleteItemId}`, {
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
      handleCloseDialog();
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      handleCloseDialog();
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [auth]);

  return (
    <Box>
      {isLoading && <Spinner />}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this portfolio? Once delete all data
            will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1.5 }}>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handlePortfolioDelete}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
            sx={{ width: 380, py: 2, my: 2, borderRadius: 2, mx: 2 }}
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
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ ml: 1.5 }}
                onClick={() => handleClickDelete(item._id)}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ ml: 1.5 }}
                component={Link}
                href={`/portfolio/details?id=${item._id}`}
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
        {portfolio?.length < 1 && (
          <Box
            sx={{
              bgcolor: "secondaryBackground",
              mt: 8,
              py: 2,
              px: 4,
              borderRadius: 2,
            }}
          >
            <Typography>No portfolio to show</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 2, maxWidth: 400, mx: "auto" }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Box>
  );
}
