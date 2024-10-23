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
import AdjustIcon from "@mui/icons-material/Adjust";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { isWithinPreviousTwoDays } from "_helper/getter";

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

  const isSpotEnabled = isWithinPreviousTwoDays(item.recordDate);

  return (
    <Box component={Link} href={`/stock-details/${item.tradingCode}`}>
      <Paper
        sx={{
          my: { xs: 0.8, sm: 1.5 },
          px: { xs: 2, sm: 3 },
          py: 1.5,
          borderRadius: { xs: 0, sm: 2 },
          ":hover": {
            // bgcolor: "gainerCardHover",
            boxShadow:
              theme.palette.mode == "light"
                ? "rgba(0, 0, 0, 0.35) 0px 2px 15px"
                : "rgba(255, 255, 255, 0.3) 0px 2px 15px",
          },
          bgcolor: "gainerCardBackground",
          minHeight: 110,
        }}
        elevation={0}
        // variant={matchesSmUp ? "outlined" : "elevation"}
      >
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={8.4} sm={8}>
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
                  fontSize: { xs: ".875rem", sm: ".9rem" },
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
                  fontSize: { xs: ".875rem", sm: ".9rem" },
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
                  fontSize: { xs: ".875rem", sm: ".9rem" },
                }}
              />
            </Stack>

            <Typography
              sx={{ fontSize: { xs: ".8rem", sm: ".875rem" }, ml: 0.3 }}
              color="text.primary"
            >
              {`Vol: ${item.volume} | Val: ${(item.value / 10).toFixed(2)}cr |
              Trd: ${item.trade}`}
            </Typography>
          </Grid>

          <Grid item xs={3.6} sm={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={{ xs: 1.5, sm: 4 }}
            >
              <Stack
                direction="column"
                alignItems="flex-end"
                sx={{ mr: { xs: 0, sm: 0 } }}
              >
                <Typography
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "1.3rem", sm: "1.6rem" },
                    fontWeight: 500,
                  }}
                >
                  {item.close.toFixed(1)}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: ".8rem", sm: ".85rem" }, mt: -0.5 }}
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
                      fontSize: { xs: ".875rem", sm: "1rem" },
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
                    fontSize: { xs: ".85rem", sm: ".95rem" },
                  }}
                />
                {item.haltStatus &&
                  item.haltStatus !== "none" &&
                  !isSpotEnabled && (
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
                        fontSize: { xs: ".85rem", sm: ".9rem" },
                      }}
                    />
                  )}
                {isSpotEnabled && (
                  <Chip
                    label="Spot"
                    size="small"
                    variant="outlined"
                    color="warning"
                    icon={<OpenInFullIcon />}
                    sx={{
                      borderRadius: 1,
                      mt: 1,
                      pl: 0.2,
                      fontSize: { xs: ".85rem", sm: ".9rem" },
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
