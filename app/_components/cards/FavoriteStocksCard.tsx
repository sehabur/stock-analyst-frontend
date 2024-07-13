"use client";
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Link from "next/link";

export default function FavoriteStocksCard(props: any) {
  const { data: item } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        component={Link}
        href={`/stock-details/${item.tradingCode}`}
        key={item.tradingCode}
      >
        <Paper
          sx={{
            px: { xs: 1.5, sm: 3 },
            pb: 1.3,
            pt: 1.8,
            borderRadius: 1.5,
            minWidth: { xs: "100%", sm: 450 },
          }}
          elevation={4}
          variant={matchesSmUp ? "elevation" : "outlined"}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              {/* {matchesSmUp && (
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "info.main",
                    mr: 1,
                  }}
                >
                  {item.companyName}
                </Typography>
              )} */}
              <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    mr: 1,
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
                      mr: 1,
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
                    ml: { xs: 1, sm: 1.5 },
                    borderRadius: 1,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                  }}
                />
              </Stack>
              <Typography
                sx={{ fontSize: { xs: ".8rem", sm: ".9rem" } }}
                color="text.secondary"
              >
                Vol: {item.volume} | Val: {(item.value / 10).toFixed(2)}cr |
                Trd: {item.trade}
              </Typography>
              {/* {matchesSmUp && (
                <Stack direction="row" sx={{ mt: 1 }}>
                  <Chip
                    label={item.sector}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      mr: 1,
                      p: 0,
                    }}
                  />
                  <Chip
                    label={`Category ${item.category}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      p: 0,
                    }}
                  />
                </Stack>
              )} */}
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

                <Typography sx={{ fontSize: ".85rem" }} color="text.secondary">
                  {item.tradingCode.startsWith("00") ? "Point" : "BDT"}
                </Typography>
              </Stack>
            </Grid>

            {/* <Grid item xs={2} sm={3}>
              <Stack
                direction={matchesSmUp ? "row" : "column"}
                alignItems={matchesSmUp ? "baseline" : "flex-end"}
                sx={{ mr: 0.7 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.4rem", sm: "1.5rem" },
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
                <Typography
                  sx={{
                    fontSize: { xs: ".7rem", sm: ".875rem" },
                    ml: { xs: 0, sm: 0.5 },
                  }}
                  color="text.secondary"
                >
                  {item.tradingCode.startsWith("00") ? "" : "BDT"}
                </Typography>
              </Stack>
            </Grid> */}
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
