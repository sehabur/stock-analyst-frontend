"use client"; // Error components must be Client Components

import { Box, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Paper from "@mui/material/Paper/Paper";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Paper
      variant="outlined"
      sx={{
        maxWidth: 350,
        mx: "auto",
        textAlign: "center",
        my: 8,
        pt: 2,
        pb: 3,
        px: 2,
        borderRadius: 3,
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", color: red[500] }}>
        Something went wrong!
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        sx={{ borderRadius: 6, px: 12, fontSize: "1.1rem", mt: 2 }}
      >
        Try again
      </Button>
    </Paper>
  );
}
