import React from "react";

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
          My Alerts
        </Typography>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 500,
            textAlign: "center",
            mt: 4,
            color: "text.primary",
          }}
        >
          Use our mobile app to avail this feature
        </Typography>
      </Box>
    </Box>
  );
}
