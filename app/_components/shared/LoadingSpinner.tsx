import { CircularProgress, Dialog, Box } from "@mui/material";
import React from "react";

const LoadingSpinner = ({ open }: any) => {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Dialog open={open} disableScrollLock={true}>
        <Box sx={{ p: 2.2, pb: 1.5 }}>
          <CircularProgress color="primary" />
        </Box>
      </Dialog>
    </Box>
  );
};

export default LoadingSpinner;
