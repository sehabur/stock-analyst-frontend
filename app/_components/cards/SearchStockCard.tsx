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

export default function SearchStockCard(props: any) {
  const { data: item } = props;

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box>
        <Paper
          sx={{
            mb: { xs: 1, sm: 1.5 },
            px: { xs: 2, sm: 4 },
            py: 1,
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
                  {item.tradingCode}
                </Typography>
                {/* <Chip
                  label={item.category}
                  size="small"
                  // color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: "50%",
                    mr: 2,
                    p: 0,
                  }}
                /> */}

                {item.change !== 0 && (
                  <Chip
                    label={item.change}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      ml: 1,
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
                  label={`${item.change}%`}
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
                <Typography sx={{ fontSize: ".75rem" }} color="text.secondary">
                  BDT
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
