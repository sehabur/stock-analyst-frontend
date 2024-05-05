"use client";
import { CircularProgress, Dialog, Box } from "@mui/material";

const Spinner = (props: any) => {
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
};

export default Spinner;
