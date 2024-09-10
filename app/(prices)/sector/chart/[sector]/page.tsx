import Link from "next/link";

import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import SectorChart from "./SectorChart";
import { sectorList } from "@/data/dse";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import { DateTime } from "luxon";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Overview from "./Overview";

async function getData(sectorTag: string) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/dailySectorPrice/${sectorTag}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// export async function generateStaticParams() {
//   return sectorList.map((item: { tag: string }) => ({
//     sector: item.tag,
//   }));
// }

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

const getLatestPrice = (latest: any) => {
  if (!latest) {
    return {
      price: "",
      time: "",
    };
  }
  const price = latest.ltp.toFixed(2);
  const time = DateTime.fromISO(latest.time)
    .plus({ hours: 6 })
    .toFormat("dd MMM, HH:mm");
  return {
    price,
    time: "Last updated on " + time,
  };
};

export default async function Sector({ params }: any) {
  const { sector: sectorTag } = params;

  const data = await getData(sectorTag);

  const sector = sectorList.find((item: any) => item.tag === sectorTag);

  const latestPriceData = getLatestPrice(data?.latest);

  const textColor =
    data?.latest?.change === 0
      ? "primary.main"
      : data?.latest?.change < 0
      ? "error.main"
      : "success.main";

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          py: { xs: 0, sm: 2 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1210,
            mx: "auto",
            px: { xs: 3, sm: 8 },

            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "space-between" },
            bgcolor: "financeCardTitlecolor",
            pt: { xs: 3, sm: 4 },
            pb: { xs: 4, sm: 4 },
            borderRadius: { xs: 0, sm: 4 },
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.4rem", sm: "1.8rem" },
                fontWeight: 500,
              }}
            >
              {sector.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                mt: 1,
              }}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "2rem", sm: "2.2rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {latestPriceData.price}
              </Typography>
              <Typography
                sx={{ ml: 0.8, fontSize: "1.2rem", color: "text.secondary" }}
              >
                BDT
              </Typography>
              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  ml: 4,
                  mr: 2,
                }}
              >
                {addPlusSign(data.latest?.change)}
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {data.latest?.change !== 0
                  ? addPlusSign(data.latest?.percentChange)
                  : 0}
                {"%"}
              </Typography>

              {/* <Tooltip
                  title={`Market is ${data.marketOpenStatus?.toLowerCase()} now`}
                  enterTouchDelay={10}
                  arrow
                >
                  <Chip
                    label={data.marketOpenStatus}
                    variant="outlined"
                    size="small"
                    icon={
                      data?.marketOpenStatus == "Open" ? (
                        <RadioButtonCheckedRoundedIcon color="success" />
                      ) : stock?.marketOpenStatus == "Closed" ? (
                        <DoDisturbOnRoundedIcon color="error" />
                      ) : (
                        <DoDisturbOnRoundedIcon color="warning" />
                      )
                    }
                    sx={{ fontSize: ".875rem", px: 0.3 }}
                  />
                </Tooltip> */}
            </Box>

            <Typography
              sx={{
                color: "text.primary",
                fontSize: "1rem",
                mt: { xs: 0.8, sm: 0 },
              }}
            >
              {latestPriceData.time}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <FavoriteButton tradingCode={data?.fundamentals?.tradingCode} />
            <Button
              component={Link}
              href={`/supercharts?symbol=${encodeURIComponent(sector.name)}`}
              target="_blank"
              sx={{ borderRadius: 2, py: 1.05 }}
              variant="contained"
            >
              See on Supercharts
            </Button>
          </Box>
        </Box>

        <Box sx={{ px: 2 }}>
          <Box>
            <Button
              component={Link}
              href={`/supercharts?symbol=${encodeURIComponent(sector.name)}`}
              target="_blank"
              color="primary"
              endIcon={<ArrowForwardIosRoundedIcon />}
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                fontWeight: 700,
                ":hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
                mt: 2,
              }}
            >
              {sector.name} Chart
            </Button>
            <SectorChart data={data} />
          </Box>

          <Box>
            <Overview data={data} />
          </Box>

          <Box sx={{ px: 2, mb: 4, mt: 4 }}>
            <Box>
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.4rem", fontWeight: 700 }}
              >
                Key Stats
              </Typography>
            </Box>

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              rowSpacing={3}
              sx={{ mt: 1, ml: 1 }}
            >
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Open
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.ycp}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  High
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.high}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Low
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.low}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  YCP
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.ycp}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Volume
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.volume}
                    {/* {(data.latest.volume / 10000000).toFixed(2)} */}
                  </Typography>
                  {/* <Typography
                    color="text.secondary"
                    sx={{ ml: 0.7, fontSize: ".875rem" }}
                  >
                    Crore
                  </Typography> */}
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Value
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {(data.latest.value / 10).toFixed(2)}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ ml: 0.7, fontSize: ".875rem" }}
                  >
                    Crore
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Trade
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.trade}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  52W High
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {Math.max(
                      data?.lastDay?.oneYearHigh,
                      data.latest.ltp
                    )?.toFixed(2) || "--"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  52W Low
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {Math.min(
                      data?.lastDay?.oneYearLow,
                      data.latest.ltp
                    )?.toFixed(2) || "--"}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ pt: { xs: 2, sm: 8 }, pb: 6, px: 2 }}>
            <Typography
              color="text.primary"
              sx={{ fontSize: "1.4rem", fontWeight: 700, pb: 2 }}
            >
              Other Sectors
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {sectorList
                .filter((item: any) => item.tag !== sectorTag)
                .map((item: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      mr: { xs: 1, sm: 1.5 },
                      my: { xs: 0.6, sm: 1 },
                      py: 0.6,
                      px: 2,
                      minWidth: 80,
                      textAlign: "center",
                      borderRadius: 1,
                      ":hover": {
                        bgcolor: "secondaryBackground",
                        cursor: "pointer",
                      },
                    }}
                    component={Link}
                    href={`/sector/chart/${item.tag}`}
                    variant="outlined"
                  >
                    <Typography
                      sx={{ fontSize: { xs: ".875rem", sm: "1rem" } }}
                      color="primary.main"
                    >
                      {item.name}
                    </Typography>
                  </Paper>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
