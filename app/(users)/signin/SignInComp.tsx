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
import { Dialog, IconButton, InputAdornment } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import CloseIcon from "@mui/icons-material/Close";

import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@mui/material/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "_store";
import Spinner from "@/components/shared/Spinner";
// import PremiumDialogContent from "./PremiumDialogContent";

export default function SignInComp() {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || null;

  console.log(redirect);

  const [formData, setFormData] = React.useState({
    phone: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  // const [openPremiumDialog, setOpenPremiumDialog] = React.useState(false);

  // const handlePremiumDialogOpen = () => {
  //   setOpenPremiumDialog(true);
  // };

  // const handlePremiumDialogClose = () => {
  //   setOpenPremiumDialog(false);
  // };

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
        dispatch(authActions.login(data.user));

        // handlePremiumDialogOpen();
        if (redirect) {
          router.push(redirect);
        } else {
          setSuccessMessage("Sign in successful");
        }
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
