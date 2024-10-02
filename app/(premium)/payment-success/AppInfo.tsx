import React from "react";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { grey } from "@mui/material/colors";

export default function AppInfo() {
  return (
    <Paper sx={{ bgcolor: "primary.main", p: 2, borderRadius: 2 }}>
      <Grid container spacing={{ xs: 4, sm: 0 }}>
        <Grid item xs={1.5}>
          <Box>
            <InfoRoundedIcon sx={{ color: grey[200], mt: 0.3 }} />
          </Box>
        </Grid>
        <Grid item xs={10.5}>
          <Box>
            <Typography sx={{ color: grey[50], mb: 2 }}>
              Close this window by pressing close button at top left to go back
              to the application.
            </Typography>
            <Typography sx={{ color: grey[50] }}>
              If your profile status is not updating, try restarting the app or
              login again.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
