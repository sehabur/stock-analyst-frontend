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
import Alert from "@mui/material/Alert/Alert";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import Link from "next/link";

export default function CreatePortfolio() {
  const [formData, setFormData] = React.useState({
    name: "",
    commission: 0.4,
  });

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const auth = useSelector((state: any) => state.auth);

  function handleInputChange(e: any) {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const reqBody = {
        name: formData.name,
        commission: formData.commission,
        user: auth._id,
      };
      console.log(reqBody);
      const res = await fetch(`/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Portfolio creation successful");
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
      }}
    >
      <Box sx={{ width: "100%" }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Portfolio name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="commission"
          label="Commission"
          id="commission"
          value={formData.commission}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
        <Button
          variant="text"
          color="warning"
          component={Link}
          href="/portfolio"
          startIcon={<KeyboardBackspaceRoundedIcon />}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
}
