"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Stack } from "@mui/system";

import Spinner from "@/components/shared/Spinner";

export default function SignUpComp() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [isLoading, setIsLoading] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // const [openPremiumDialog, setOpenPremiumDialog] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handlePremiumDialogOpen = () => {
  //   setOpenPremiumDialog(true);
  // };

  // const handlePremiumDialogClose = () => {
  //   setOpenPremiumDialog(false);
  // };

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Account creation successful");
        // handlePremiumDialogOpen();
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading && <Spinner />}
      {/* <Dialog
        open={openPremiumDialog}
        onClose={handlePremiumDialogClose}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
      >
        <PremiumDialogContent />
        <IconButton
          onClick={handlePremiumDialogClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Dialog> */}
      <Box sx={{ width: "100%" }}>
        {successMessage && (
          <Alert severity="success">
            {successMessage}. Please{" "}
            <Typography
              component={Link}
              href={redirect ? `/signin?redirect=${redirect}` : `/signin`}
              sx={{
                textDecoration: "underline",
                color: "primary.main",
              }}
            >
              Sign in
            </Typography>{" "}
            now
          </Alert>
        )}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              // required
              fullWidth
              id="name"
              label="User Name"
              autoFocus
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              type="number"
              onChange={handleInputChange}
              placeholder="Example: 01712345678"
              inputProps={{
                minlength: 11,
              }}
              helperText={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <InfoRoundedIcon sx={{ fontSize: "1.2rem" }} />
                  <Typography>Please write 11 digit number</Typography>
                </Stack>
              }
              sx={{
                ".MuiFormHelperText-root": {
                  color: "info.main",
                  fontSize: ".875rem",
                  mt: 1,
                  mb: 0.5,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
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
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              component={Link}
              href="signin"
              variant="body2"
              sx={{
                textDecoration: "underline",
                color: "primary.main",
              }}
            >
              Already have an account? Sign in
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
