"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone");

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<any>({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage(`Confirmed password does not match with new password.`);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await fetch(`/api/manage-password/set-new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, phone: phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Password has been set successfully.");
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
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Box sx={{ width: "100%", mb: 1.5 }}>
        {successMessage && (
          <Alert severity="success">
            {successMessage} Please{" "}
            <Typography
              component={Link}
              href="/signin"
              sx={{ textDecoration: "underline", color: "primary.main" }}
            >
              sign in
            </Typography>{" "}
            with new password.
          </Alert>
        )}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography sx={{ mb: 1, color: "text.primary" }}>
          We have send OTP to your phone number. Please input the OTP and
          continue
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="Minimum 6 characters"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            minlength: 6,
          }}
          value={formData.newPassword}
          onChange={handleInputChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            minlength: 6,
          }}
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <TextField
          type="text"
          margin="normal"
          required
          fullWidth
          label="OTP"
          name="otp"
          autoFocus
          value={formData.otp}
          onChange={handleInputChange}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2, mb: 3, py: 1.2 }}
        >
          Set new password
        </Button>

        <Box sx={{ mb: 1 }}>
          <Typography
            component={Link}
            href="/profile"
            sx={{
              textDecoration: "underline",
              color: "primary.main",
            }}
          >
            Sign in
          </Typography>
        </Box>

        <Box>
          <Typography
            component={Link}
            href="/"
            sx={{
              textDecoration: "underline",
              color: "primary.main",
            }}
          >
            Go back to Homepage
          </Typography>
        </Box>
      </Box>
    </>
  );
}
