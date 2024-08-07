"use client";
import Link from "next/link";

import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

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

export default function GainerCard(props: any) {
  const { item } = props;

  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box component={Link} href={`/stock-details/${item.tradingCode}`}>
      <Paper
        sx={{
          my: { xs: 0.8, sm: 1.5 },
          px: { xs: 2, sm: 3 },
          py: 1.5,
          borderRadius: { xs: 0, sm: 2 },
          ":hover": {
            bgcolor: "financeCardTitlecolor",
          },
          bgcolor: { xs: "gainerCardMobileView", sm: "gainerCard" },
        }}
        elevation={0}
        variant={matchesSmUp ? "outlined" : "elevation"}
      >
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={7.5} sm={8}>
            <Typography
              noWrap
              gutterBottom
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                // color: "primary.main",
              }}
            >
              {item.companyName}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mb: 0.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}
            >
              <Chip
                label={item.tradingCode}
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  borderRadius: 1,
                  fontSize: ".9rem",
                  mr: 1,
                  mb: 0.5,
                  // fontWeight: 700,
                }}
              />
              <Chip
                label={item.category}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  mr: 1,
                  fontSize: ".9rem",
                }}
              />
              <Chip
                label={
                  item.sector.slice(0, 21) +
                  (item.sector.length > 21 ? ".." : "")
                }
                size="small"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  fontSize: ".9rem",
                }}
              />
            </Stack>

            <Typography
              sx={{ fontSize: ".875rem", ml: 0.3 }}
              color="text.primary"
            >
              {`Vol: ${item.volume} | Val: ${(item.value / 10).toFixed(2)}cr |
              Trd: ${item.trade}`}
            </Typography>
          </Grid>

          <Grid item xs={4.5} sm={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={{ xs: 2.5, sm: 4 }}
            >
              <Stack direction="column" alignItems="flex-end" sx={{ mr: 0.7 }}>
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "1.4rem", sm: "1.6rem" },
                    fontWeight: 500,
                  }}
                >
                  {item.ltp.toFixed(1)}
                </Typography>
                <Typography
                  sx={{ fontSize: ".85rem", mt: -0.5 }}
                  color="text.secondary"
                >
                  BDT
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="flex-end">
                {item.change !== 0 && (
                  <Typography
                    gutterBottom
                    sx={{
                      mr: 1,
                      color:
                        item.change === 0
                          ? "primary.main"
                          : item.change < 0
                          ? "error.main"
                          : "success.main",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {addPlusSign(item.change)}
                  </Typography>
                )}

                <Chip
                  label={`${addPlusSign(item.percentChange)}%`}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    color:
                      item.change === 0
                        ? "primary.main"
                        : item.change < 0
                        ? "error.main"
                        : "success.main",
                    fontWeight: 700,
                    fontSize: ".95rem",
                  }}
                />

                {item.haltStatus !== "none" && (
                  <Chip
                    label="Halt"
                    size="small"
                    color={item.haltStatus === "buy" ? "success" : "error"}
                    icon={
                      item.haltStatus === "buy" ? (
                        <TrendingUpRoundedIcon />
                      ) : (
                        <TrendingDownRoundedIcon />
                      )
                    }
                    sx={{
                      borderRadius: 1,
                      mt: 1,
                      fontSize: ".9rem",
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
