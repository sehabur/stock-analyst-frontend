import React from "react";

import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import CreatePortfolio from "./CreatePortfolio";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "80vh" }}
    >
      <Box
        sx={{
          maxWidth: { sm: "1280px" },
          mx: "auto",
          px: 2,
          pt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar>
          <WorkRoundedIcon />
        </Avatar>
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: "1.6rem",
            fontWeight: 500,
            mt: 2,
            mb: 4,
          }}
        >
          Create portfolio
        </Typography>
        <CreatePortfolio />
      </Box>
    </Box>
  );
}
