import React from "react";

import Link from "next/link";

import { Box, Grid, Paper, Typography, Stack, Chip } from "@mui/material";

export default function MobileViewPriceCard({ item }: any) {
  return (
    <Box component={Link} href={`/stock-details/${item.tradingCode}`}>
      <Paper
        sx={{
          my: 1.3,
          px: 1.5,
          py: 1.3,
          borderRadius: 2,
        }}
        elevation={0}
        variant="outlined"
      >
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {item.tradingCode}
              </Typography>

              {item.change !== 0 && (
                <Chip
                  label={item.change}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    ml: 1,
                    fontWeight: 700,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                  }}
                />
              )}
              <Chip
                label={`${item.percentChange}%`}
                size="small"
                sx={{
                  borderRadius: 1,
                  ml: 1,
                  fontWeight: 700,
                  color:
                    item.change === 0
                      ? "primary.main"
                      : item.change < 0
                      ? "error.main"
                      : "success.main",
                }}
              />
              {item.haltStatus !== "none" && (
                <Chip
                  label="Halt"
                  size="small"
                  color={item.haltStatus === "buy" ? "success" : "error"}
                  sx={{
                    ml: 1,
                    fontSize: ".8rem",
                  }}
                />
              )}
            </Stack>
            <Typography sx={{ fontSize: ".875rem" }} color="text.primary">
              Vol: {item.volume} | Val: {(item.value / 10).toFixed(2)}cr | Trd:{" "}
              {item.trade}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Stack alignItems="flex-end" sx={{ mr: 0.7 }}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color:
                    item.change === 0
                      ? "primary.main"
                      : item.change < 0
                      ? "error.main"
                      : "success.main",
                }}
              >
                {item.ltp}
              </Typography>
              <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
                BDT
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
