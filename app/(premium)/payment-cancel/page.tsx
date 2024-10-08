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

export default function SuccessPage({ searchParams }: any) {
  const { tranId } = searchParams;

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
          sx={{ fontSize: "1.8rem", mt: 1, mb: 1 }}
          color="text.primary"
        >
          Premium package
        </Typography>

        <Paper
          elevation={8}
          sx={{
            maxWidth: 500,
            mx: 2,
            my: 3,
            px: 4,
            py: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: 700, color: "error.main" }}
          >
            Payment Cancelled!
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              color: "text.primary",
              mt: 2,
              mb: 4,
            }}
          >
            Cancelled by user. Please try again later.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            sx={{ px: 3, fontSize: "1rem" }}
          >
            Go to home
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
