"use client";
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function SearchStockCard(props: any) {
  const { data: item } = props;

  return (
    <>
      <Box>
        <Paper
          sx={{
            mb: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 4 },
            py: 1.5,
            borderRadius: 1.5,
            ":hover": {
              bgcolor: "secondaryBackground",
            },
            bgcolor: "searchCardColor",
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
                    mr: 1,
                  }}
                >
                  {item.tradingCode.startsWith("00")
                    ? item.tradingCode.slice(2)
                    : item.tradingCode}
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
                    ml: { xs: 1, sm: 1.5 },
                    borderRadius: 1,
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
                      ml: { xs: 1, sm: 1.5 },
                      fontSize: ".8rem",
                    }}
                  />
                )}
              </Stack>
              <Typography
                sx={{ fontSize: { xs: ".8rem", sm: ".9rem" } }}
                color="text.secondary"
              >
                Vol: {item.volume} | Val: {(item.value / 10).toFixed(2)}cr |
                Trd: {item.trade}
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

                <Typography sx={{ fontSize: ".85rem" }} color="text.secondary">
                  {item.tradingCode.startsWith("00") ? "Point" : "BDT"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
