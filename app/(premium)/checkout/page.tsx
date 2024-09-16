import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SystemUpdateRoundedIcon from "@mui/icons-material/SystemUpdateRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Link from "next/link";
import Checkout from "./Checkout";

export default function CheckoutPage() {
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
          sx={{ fontSize: "1.6rem", mt: 1 }}
          color="text.primary"
        >
          Premium package
        </Typography>
      </Box>
      <Checkout />
    </Box>
  );
}
