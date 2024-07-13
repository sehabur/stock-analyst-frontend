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
import {
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@mui/material/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "_store";
import Spinner from "@/components/shared/Spinner";

import CloseIcon from "@mui/icons-material/Close";

import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

export default function VerifyPhone() {
  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const [formData, setFormData] = React.useState({
    otp: "",
  });

  const searchParams = useSearchParams();

  const subscriptionType = searchParams.get("type");

  const [isLoading, setIsLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [openPremiumDialog, setOpenPremiumDialog] = React.useState(false);

  const handlePremiumDialogOpen = () => {
    setOpenPremiumDialog(true);
  };

  const handlePremiumDialogClose = () => {
    setOpenPremiumDialog(false);
  };

  const handleOtpSubmitSuccess = () => {
    if (subscriptionType === "free_trial") {
      handlePremiumDialogOpen();
    } else {
      router.push("/payment-gateway"); // Need to change //
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
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMessage("");
        handleOtpSubmitSuccess();
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
                <WorkspacePremiumRoundedIcon
                  sx={{ fontSize: 40 }}
                  color="warning"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "text.primary",
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
              <Typography sx={{ fontSize: "1.4rem", mb: 2 }}>
                Congratulations!
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                You are now subscribed to 14 days free trial of premium package.
                Enjoy full access to all features of the platform
              </Typography>
            </Box>

            <Box sx={{ ml: 1 }}>
              <Button
                variant="contained"
                sx={{ py: 1.3, px: 2, fontSize: "1.1rem" }}
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
        <Typography sx={{ mb: 2 }}>
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
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
