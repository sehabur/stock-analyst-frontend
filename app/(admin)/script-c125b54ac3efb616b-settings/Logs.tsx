import React from "react";
import { DateTime } from "luxon";

import { Box, Card, Paper, Typography } from "@mui/material";

export default function Logs({ data }: any) {
  let dataArr = Object.entries(data[0]);

  console.log(dataArr);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 1, textAlign: "center" }}>
        SETTINGS
      </Typography>
      {dataArr.map((item: any, index: number) => (
        <Paper sx={{ my: 1.5, px: 2, py: 1 }} variant="outlined" key={index}>
          <Box
          // sx={{
          //   display: "flex",
          //   flexDirection: { xs: "column", sm: "row" },
          //   gap: { xs: 0, sm: 5 },
          // }}
          >
            <Typography sx={{ fontWeight: 700 }}>{item[0]}</Typography>
            <Typography>{item[1]}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
