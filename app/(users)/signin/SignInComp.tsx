"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { authActions } from "_store";
import Spinner from "@/components/shared/Spinner";

export default function SignInComp({
  redirect,
  isExternalDialog = false,
  externalDialogClose,
}: any) {
  const dispatch = useDispatch();

  const router = useRouter();

  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = React.useState({
    phone: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
      const res = await fetch(`/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMessage("");
        dispatch(authActions.login(data.user));
        // setSuccessMessage("Sign in successful");
        if (isExternalDialog) externalDialogClose();
        router.push(redirect || "/");
      } else {
        setErrorMessage(data.message || "Error occured");
        // setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error occured");
      // setSuccessMessage("");
      if (isExternalDialog) externalDialogClose();
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
      <Box sx={{ width: "100%" }}>
        {/* {successMessage && (
          <Alert severity="success">
            {successMessage}. Go to{" "}
            <Typography
              component={Link}
              href="/"
              sx={{
                textDecoration: "underline",
                color: "primary.main",
              }}
            >
              Homepage
            </Typography>
          </Alert>
        )} */}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone number"
          name="phone"
          autoFocus
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container sx={{ gap: 1, mt: 1 }}>
          <Grid item xs>
            <Typography
              component={Link}
              href="/forget-passwprd"
              sx={{
                textDecoration: "underline",
                color: "primary.main",
              }}
            >
              Forgot password?
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component={Link}
              href="/signup"
              sx={{
                textDecoration: "underline",
                color: "primary.main",
              }}
            >
              {"Don't have an account? Sign Up"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
