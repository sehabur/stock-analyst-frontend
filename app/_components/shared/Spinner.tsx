"use client";
import { CircularProgress, Dialog, Box } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        height: "93vh",
      }}
    >
      <Dialog open={true}>
        <Box sx={{ p: 2.2, pb: 1.5 }}>
          <CircularProgress color="primary" />
        </Box>
      </Dialog>
    </Box>
  );
}
