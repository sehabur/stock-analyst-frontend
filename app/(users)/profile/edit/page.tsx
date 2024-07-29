import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import EditComp from "./EditComp";

export default function SignUp() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          pt: 6,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <EditRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.primary">
          Edit my account
        </Typography>
      </Box>
      <Box sx={{ px: 2, pb: 4, maxWidth: 400, mx: "auto" }}>
        <EditComp />
      </Box>
    </Box>
  );
}
