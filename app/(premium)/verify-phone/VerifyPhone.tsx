"use client";
import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Dialog, DialogContent, Stack } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import Spinner from "@/components/shared/Spinner";

import { useDispatch } from "react-redux";
import { authActions } from "_store";

export default function VerifyPhone() {
  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const [formData, setFormData] = React.useState({
    otp: "",
  });

  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const subscriptionType = searchParams.get("type");

  const price = searchParams.get("price");

  const product = searchParams.get("product");

  const validity: any = searchParams.get("validity");

  const [isLoading, setIsLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [openPremiumDialog, setOpenPremiumDialog] = React.useState(false);

  const handlePremiumDialogOpen = () => {
    setOpenPremiumDialog(true);
  };

  const handlePremiumDialogClose = () => {
    setOpenPremiumDialog(false);
  };

  const getUserData = async () => {
    const authDataFromStorage: any = localStorage.getItem("userInfo");
    const auth = JSON.parse(authDataFromStorage);

    if (!auth) return;

    const res = await fetch(`/api/profile?user=${auth._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    if (data) {
      dispatch(authActions.login({ ...data, token: auth.token }));
    }
  };

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
      const res = await fetch(`/api/verify-phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({ ...formData, type: subscriptionType }),
      });
      const data = await res.json();

      if (res.ok) {
        setErrorMessage("");
        if (subscriptionType === "free_trial") {
          handlePremiumDialogOpen();
          getUserData();
        } else {
          router.push(
            `/checkout?price=${price}&product=${product}&validity=${encodeURIComponent(
              validity
            )}&otp=${formData.otp}`
          );
        }
      } else {
        setErrorMessage(data.message || "Error occured");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error occured");
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
      <Dialog
        open={openPremiumDialog}
        onClose={handlePremiumDialogClose}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
      >
        <DialogContent dividers>
          <Box sx={{ maxWidth: "700px", mx: "auto", py: 2 }}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Box>
                <Avatar
                  sx={{ width: 56, height: 56, bgcolor: "text.secondary" }}
                >
                  <WorkspacePremiumRoundedIcon sx={{ fontSize: 50, p: 1 }} />
                </Avatar>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                >
                  Premium membership
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                >
                  Full access to all features
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 4, ml: 1, mb: 4 }}>
              <Typography sx={{ fontSize: "1.5rem", mb: 2 }}>
                Congratulations!
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                You are now subscribed to 14 days free trial of premium package.
                Enjoy full access to all features of the platform.
              </Typography>
            </Box>

            <Box sx={{ ml: 1 }}>
              <Button
                variant="contained"
                sx={{ py: 1.3, px: 3, fontSize: "1.1rem" }}
                component={Link}
                href="/"
              >
                Go to Homepage
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ width: "100%" }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Typography sx={{ mb: 1, color: "text.primary" }}>
          We have send OTP to your registered phone number. Please input the OTP
          and continue
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="otp"
          label="One time password"
          name="otp"
          autoFocus
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
