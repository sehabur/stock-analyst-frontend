import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import Link from "next/link";
import AppInfo from "./AppInfo";

export default function SuccessPage({ searchParams }: any) {
  const { tranId, platform } = searchParams;

  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh", py: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <ShoppingCartCheckoutRoundedIcon />
        </Avatar>
        <Typography
          component="h1"
          sx={{ fontSize: "1.8rem", mb: 1 }}
          color="text.primary"
        >
          Premium package
        </Typography>

        <Paper
          elevation={12}
          sx={{
            maxWidth: 500,
            mx: 2,
            my: 3,
            px: 4,
            pt: 3,
            pb: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: 700, color: "success.main" }}
          >
            Payment Successful!
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "text.secondary",
              mt: 2,
            }}
          >
            Transection Id of your order is
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "text.primary",
              mb: 4,
            }}
          >
            {tranId || "not available"}
          </Typography>
          {/* <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
              mb: 3,
            }}
          >
            Please sign in again for the changes to take effect.
          </Typography> */}
          <Box sx={{ my: 3 }}>
            <Typography sx={{ fontSize: "1.4rem", mb: 2 }}>
              Congratulations!
            </Typography>
            <Typography sx={{ fontSize: "1rem" }}>
              You are now subscribed to premium package. Enjoy full access to
              all features of the platform.
            </Typography>
          </Box>
          {platform == "app" ? (
            <AppInfo />
          ) : (
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{ px: 4, fontSize: "1rem", py: 1 }}
            >
              Go to Homepage
            </Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
