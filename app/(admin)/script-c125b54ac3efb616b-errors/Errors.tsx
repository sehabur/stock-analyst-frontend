import React from "react";
import { DateTime } from "luxon";

import { Box, Card, Paper, Typography } from "@mui/material";

export default function Errors({ data }: any) {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 1, textAlign: "center" }}>
        ERRORS
      </Typography>
      {data.map((item: any, index: number) => (
        <Paper sx={{ my: 1, px: 2, py: 0.5 }} variant="outlined" key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0, sm: 5 },
            }}
          >
            <Typography>
              {DateTime.fromISO(item.time).toFormat("dd-MM-yyyy HH:mm")}
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>{item.script}</Typography>
            <Typography>{item.tradingCode}</Typography>
            <Typography>{item.message}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}