import React from "react";

import {
  Box,
  Snackbar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CreatePortfolio from "./CreatePortfolio";

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
          My portfolio
        </Typography>
        <CreatePortfolio />
      </Box>
    </Box>
  );
}
