"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { IconButton, InputAdornment } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await fetch(`/api/manage-password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // setErrorMessage("");
        // setSuccessMessage("Password reset OTP sent to your phone");
        router.push(`/manage-password/set-new?phone=${formData.phone}`);
      } else {
        let errorMsg = "";

        if (data?.errors?.length > 0) {
          errorMsg = data?.errors[0].msg;
        } else if (data?.message) {
          errorMsg = data.message;
        } else {
          errorMsg = "Something went wrong. Please try again";
        }
        setErrorMessage(errorMsg);
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again");
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      phone: event.target.value,
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Box sx={{ width: "100%" }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          type="text"
          margin="normal"
          required
          fullWidth
          label="Phone number"
          name="phone"
          autoFocus
          value={formData.phone}
          onChange={handleInputChange}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2, mb: 2, py: 1.2 }}
        >
          Send Reset OTP
        </Button>
      </Box>
    </>
  );
}
