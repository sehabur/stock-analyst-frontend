import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SystemUpdateRoundedIcon from "@mui/icons-material/SystemUpdateRounded";
import VerifyPhone from "./VerifyPhone";

export default function VerifyPhonePage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          pt: 6,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <SystemUpdateRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.primary">
          Verify your phone number
        </Typography>
      </Box>
      <Box sx={{ px: 2, pb: 4, maxWidth: 400, mx: "auto" }}>
        <VerifyPhone />
      </Box>
    </Box>
  );
}
