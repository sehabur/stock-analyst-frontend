"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { authActions } from "_store";
import Spinner from "@/components/shared/Spinner";

export default function EditComp() {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

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
      const res = await fetch(`/api/profile?id=${auth._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(
          authActions.updateProfile({
            name: formData.name,
            email: formData.email,
          })
        );

        setErrorMessage("");
        setSuccessMessage("Account edit successful");
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

  useEffect(() => {
    if (auth) {
      setFormData({
        name: auth.name,
        email: auth.email,
        phone: auth.phone,
      });
    }
  }, [auth]);

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
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              fullWidth
              id="name"
              label="User Name"
              onChange={handleInputChange}
              value={formData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              type="number"
              inputProps={{
                minlength: 11,
                readOnly: true,
              }}
              value={formData.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
        >
          Update
        </Button>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            component={Link}
            href="/manage-password/change"
            sx={{
              textDecoration: "underline",
              color: "warning.main",
              fontSize: "1rem",
            }}
          >
            Change password
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
            Go back to homepage
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
