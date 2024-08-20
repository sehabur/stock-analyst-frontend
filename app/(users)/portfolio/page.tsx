import React from "react";

import { Box, Typography } from "@mui/material";

import Portfolio from "./Portfolio";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          maxWidth: { sm: "1400px" },
          mx: "auto",
          py: 2,
          mb: 6,
          px: 2,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 475,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            color="text.primary"
            gutterBottom
            sx={{
              fontSize: "1.6rem",
              fontWeight: 500,
              textAlign: "center",
              mt: 2,
            }}
          >
            My portfolio
          </Typography>
          <Typography color="text.secondary">
            Create your own portfolio and track market value of your shares real
            time. Perform mock buy sell to get started with stock market
          </Typography>
        </Box>
        <Portfolio />
      </Box>
    </Box>
  );
}
