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

export default function SearchStockCard(props: any) {
  const { data: item } = props;

  const itemType = item.type;

  return (
    <>
      <Box>
        <Paper
          sx={{
            mb: { xs: 1, sm: 1 },
            pr: { xs: 1, sm: 3 },
            pl: { xs: 1.5, sm: 3 },
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
          <Grid container alignItems="center" spacing={2}>
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
                    mr: { xs: 1, sm: 1 },
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
                      mr: 1,
                      fontWeight: 700,
                      fontSize: ".9rem",
                      "& .MuiChip-label": {
                        px: 0.7,
                      },
                    }}
                  />
                )}

                {item.change !== 0 && (
                  <Chip
                    label={addPlusSign(item.change)}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      mr: { xs: 1, sm: 1 },
                      fontWeight: 700,
                      color:
                        item.change === 0
                          ? "primary.main"
                          : item.change < 0
                          ? "error.main"
                          : "success.main",
                      "& .MuiChip-label": {
                        px: 0.7,
                      },
                      fontSize: ".9rem",
                    }}
                  />
                )}

                <Chip
                  label={`${addPlusSign(item.percentChange)}%`}
                  size="small"
                  sx={{
                    mr: { xs: 1, sm: 1 },
                    borderRadius: 1,
                    fontWeight: 700,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                    "& .MuiChip-label": {
                      px: 0.7,
                    },
                    fontSize: ".9rem",
                  }}
                />

                {item.haltStatus && item.haltStatus !== "none" && (
                  <Chip
                    variant="outlined"
                    label="Halt"
                    size="small"
                    color={item.haltStatus === "buy" ? "success" : "error"}
                    sx={{
                      mr: 1,
                      fontSize: ".8rem",
                    }}
                  />
                )}
              </Stack>
              <Typography
                sx={{ fontSize: { xs: ".875rem", sm: ".9rem" } }}
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

                <Typography sx={{ fontSize: ".85rem" }} color="text.secondary">
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
