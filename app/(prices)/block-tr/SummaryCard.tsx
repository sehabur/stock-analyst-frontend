import React from "react";
import { Box, Typography, Paper, Chip, Divider } from "@mui/material";
import { DateTime } from "luxon";

export default function SummaryCard({ summary, date }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        // bgcolor: "secondaryBackground",
        px: 3,
        pb: 1.5,
        pt: 1.5,
        borderRadius: 3,
        mb: 2,
        maxWidth: 500,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ mr: 2, fontSize: ".95rem" }}>
          Total{" "}
          <Typography
            sx={{ display: "inline", fontWeight: 700, fontSize: "1.2rem" }}
          >
            {summary.scripts}
          </Typography>{" "}
          scripts traded
        </Typography>
        <Chip
          label={DateTime.fromISO(date).toFormat("dd MMM, yyyy")}
          // variant="outlined"
          size="small"
          sx={{ fontSize: ".9rem", borderRadius: 1 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".9rem" }}>
            Value (Mn)
          </Typography>
          <Typography
            color="text.primary"
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {summary.value.toFixed(2)}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".9rem" }}>
            Volume
          </Typography>
          <Typography
            color="text.primary"
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {summary.quantity}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".9rem" }}>
            Trades
          </Typography>
          <Typography
            color="text.primary"
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {summary.trades}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
