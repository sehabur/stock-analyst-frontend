import React from "react";

import Favorites from "./Favorites";

import { Box, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          maxWidth: { sm: "1280px" },
          mx: "auto",
          py: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: "1.6rem",
            fontWeight: 500,
            textAlign: "center",
            mt: 2,
          }}
        >
          My Favorites
        </Typography>
        <Favorites />;
      </Box>
    </Box>
  );
}
