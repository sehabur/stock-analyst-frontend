"use client";
import React from "react";

import Link from "next/link";

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

const addPlusSign = (value: number) => {
  let result;
  if (value > 0) {
    result = "+" + value.toFixed(2);
  } else if (value < 0) {
    result = value.toFixed(2);
  } else {
    result = value;
  }
  return result;
};

export default function FavoriteStocksCard(props: any) {
  const { data: item } = props;

  const itemType = item.type;

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
            minWidth: { xs: "100%", sm: 475 },
          }}
          elevation={4}
          variant={matchesSmUp ? "elevation" : "outlined"}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "text.primary",
                    mr: itemType !== "stock" ? 1 : 0.5,
                  }}
                >
                  {itemType === "index"
                    ? item.tradingCode?.slice(2)
                    : item.tradingCode}
                </Typography>

                {itemType === "stock" && (
                  <Chip
                    label={item.category}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      // fontSize: "1rem",
                      mr: 1,
                      fontWeight: 700,
                      "& .MuiChip-label": {
                        px: 0.7,
                      },
                    }}
                  />
                )}

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
                      "& .MuiChip-label": {
                        px: 0.6,
                      },
                      fontWeight: 700,
                    }}
                  />
                )}
                <Chip
                  label={`${item.percentChange}%`}
                  size="small"
                  sx={{
                    mr: { xs: 1, sm: 1.5 },
                    borderRadius: 1,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                    "& .MuiChip-label": {
                      px: 0.6,
                    },
                    fontWeight: 700,
                  }}
                />

                {item.haltStatus && item.haltStatus !== "none" && (
                  <Chip
                    label="Halt"
                    size="small"
                    variant="outlined"
                    color={item.haltStatus === "buy" ? "success" : "error"}
                    sx={{
                      mr: 1,
                      fontSize: ".8rem",
                    }}
                  />
                )}
              </Stack>
              <Typography
                sx={{ fontSize: { xs: ".8rem", sm: ".9rem" } }}
                color="text.primary"
              >
                {itemType === "index"
                  ? `Vol: ${item.value} | Val: ${(
                      item.volume / 10000000
                    ).toFixed(2)}cr | Trd: ${item.trade}`
                  : `Vol: ${item.volume} | Val: ${(item.value / 10).toFixed(
                      2
                    )}cr | Trd: ${item.trade}`}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Stack alignItems="flex-end" sx={{ mr: 0.7 }}>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    mb: itemType === "index" ? 2 : 0,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {item.ltp.toFixed(2)}
                </Typography>

                <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
                  {itemType !== "index" && "BDT"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
