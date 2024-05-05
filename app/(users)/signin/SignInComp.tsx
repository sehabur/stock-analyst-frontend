"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "_store";
import Spinner from "@/components/shared/Spinner";

export default function SignInComp() {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const [formData, setFormData] = React.useState({
    phone: "",
    password: "",
    // keepMeLoggedin: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name === "keepMeLoggedin"
          ? event.target.checked
          : event.target.value,
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
        setSuccessMessage("Sign in successful");

        dispatch(authActions.login(data.user));

        // if (formData.keepMeLoggedin) {
        //   localStorage.setItem("userInfo", JSON.stringify(data.user));
        // }
      } else {
        setErrorMessage(data.message || "Error occured");
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error occured");
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
      <Box sx={{ width: "100%" }}>
        {successMessage && (
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
        )}
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
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Keep me signed in"
          checked={formData.keepMeLoggedin}
          name="keepMeLoggedin"
          sx={{ color: "text.primary" }}
          onChange={handleInputChange}
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
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
