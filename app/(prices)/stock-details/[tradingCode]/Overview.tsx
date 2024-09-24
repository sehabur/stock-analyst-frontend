"use client";
import AreaChart from "@/components/charts/AreaChart";
import CandlestickVolumeChart from "@/components/charts/CandlestickVolumeChart";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Slider,
  Divider,
  Button,
} from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { grey } from "@mui/material/colors";
import OverviewCard from "@/components/cards/OverviewCard";
import Link from "next/link";

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Stack from "@mui/material/Stack";
import { constants } from "crypto";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    marginLeft: "12px",
    marginRight: "12px",
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "16px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "18px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "18px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
}));

const formatCandleChartData = (data: any) => {
  let candle = [];
  let volume = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const open = item.open !== 0 ? item.open : item.ycp;
    const close = item.ltp;

    if (close === 0) {
      candle.push({
        time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
        open: item.ycp,
        high: item.ycp,
        low: item.ycp,
        close: item.ycp,
        color: close > open ? "#22ab94" : open > close ? "#f7525f" : "#2962ff",
      });
    } else {
      candle.push({
        time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
        open: open,
        high: item.high,
        low: item.low,
        close: close,
        color: close > open ? "#22ab94" : open > close ? "#f23645" : "#2962ff",
      });
    }

    volume.push({
      time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
      value: item.volume,
      color:
        close > open ? "#22ab9488" : open > close ? "#f7525f88" : "#2962ff88",
    });
  }

  return {
    candle,
    volume,
  };
};

const calcPercentChange = (current: any, previous: any) => {
  if (!previous) {
    return {
      text: "-",
      color: "",
    };
  }

  const stockchanged = current === 0 ? false : true;
  const change = stockchanged ? ((current - previous) / previous) * 100 : 0;
  return {
    text: (change === 0 ? change : change.toFixed(2)) + "%",
    color: change === 0 ? "#2962ff" : change < 0 ? "#f45e6a" : "#00A25B",
  };
};

const formatPercentChangeData = (latestdata: any, lastdaydata: any) => {
  // if (!latestdata || !lastdaydata) return;
  const {
    oneWeekBeforeData,
    oneMonthBeforeData,
    sixMonthBeforeData,
    oneYearBeforeData,
    fiveYearBeforeData,
  } = lastdaydata;

  const { ltp, ycp } = latestdata;

  return {
    today: calcPercentChange(ltp, ycp),
    oneWeek: calcPercentChange(ltp, oneWeekBeforeData),
    oneMonth: calcPercentChange(ltp, oneMonthBeforeData),
    sixMonth: calcPercentChange(ltp, sixMonthBeforeData),
    oneYear: calcPercentChange(ltp, oneYearBeforeData),
    fiveYear: calcPercentChange(ltp, fiveYearBeforeData),
  };
};

function isValidDate(date: any) {
  return !isNaN(date);
}

const agmDateCalculation = (
  agmDateInit: string,
  recordDateInit: string,
  declarationDateInit: string
) => {
  const todayDate = DateTime.now().setZone("Asia/Dhaka");

  let agmPrefix = "";
  let recordPrefix = "";
  let isCircuitEnabled = true;
  let agmDate = "";
  let recordDate = "";
  let declarationDate = "";

  if (agmDateInit) {
    const agmDateFormatted = DateTime.local(
      Number(agmDateInit.substring(6, 10)),
      Number(agmDateInit.substring(3, 5)),
      Number(agmDateInit.substring(0, 2))
    );

    if (isValidDate(agmDateFormatted)) {
      if (agmDateFormatted < todayDate) {
        agmPrefix = "Last";
      } else {
        agmPrefix = "Next";
      }
      agmDate = agmDateFormatted.toFormat("dd MMM yyyy");
    }
  }

  if (declarationDateInit) {
    const declarationDateFormatted = DateTime.fromISO(declarationDateInit);

    if (declarationDateFormatted == todayDate) {
      isCircuitEnabled = false;
    }
    declarationDate = declarationDateFormatted.toFormat("dd MMM yyyy");
  }

  if (recordDateInit) {
    const recordDateFormatted = DateTime.fromISO(recordDateInit);

    if (recordDateFormatted < todayDate) {
      recordPrefix = "Last";
    } else {
      recordPrefix = "Next";
    }
    recordDate = recordDateFormatted.toFormat("dd MMM yyyy");
  }

  return {
    agmPrefix,
    recordPrefix,
    isCircuitEnabled,
    agmDate,
    recordDate,
    declarationDate,
  };
};

export default function Overview({ stock }: any) {
  const [alignment, setAlignment] = React.useState("minute");

  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartColor =
    stock.latest.change === 0
      ? "#2962ff"
      : stock.latest.change < 0
      ? "#f45e6a"
      : "#00A25B";

  const minuteChartData: any = stock.minute
    // .filter((item: any) => item.ltp !== 0 || item.close !== 0)
    .map((item: { time: string; ltp: number; ycp: number }) => {
      return {
        time: DateTime.fromISO(item.time).plus({ hours: 6 }).toUnixInteger(),
        value: item.ltp !== 0 ? item.ltp : item.ycp,
      };
    });

  const dailyCandleData = formatCandleChartData(stock.daily);
  const weeklyCandleData = formatCandleChartData(stock.weekly);
  const monthlyCandleData = formatCandleChartData(stock.monthly);

  const percentChangeData = formatPercentChangeData(
    stock.latest,
    stock.lastDay
  );

  const dates = agmDateCalculation(
    stock.fundamentals.lastAgm,
    stock.fundamentals.recordDate,
    stock.fundamentals.declarationDate
  );

  const handleAlignment = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ maxWidth: "1250px", mx: "auto", py: { xs: 2, sm: 4 }, px: 2 }}>
      <Button
        component={Link}
        href={`/supercharts?symbol=${stock.fundamentals.tradingCode}`}
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
        }}
      >
        {stock.fundamentals.tradingCode} Chart
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: { xs: 1.5, sm: 0 },
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          // color="success"
          exclusive
          onChange={handleAlignment}
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              px: { xs: 2, sm: 2.5 },
              mx: 2,
            },
          }}
        >
          <StyledToggleButton value="minute">
            {matchesSmDown ? "Minute" : "Minute"}
          </StyledToggleButton>
          <StyledToggleButton value="daily">
            {matchesSmDown ? "Day" : "Daily"}
          </StyledToggleButton>
          <StyledToggleButton value="weekly">
            {matchesSmDown ? "Week" : "Weekly"}
          </StyledToggleButton>
          <StyledToggleButton value="monthly">
            {matchesSmDown ? "Month" : "Monthly"}
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ my: 4 }}>
        {alignment === "minute" && (
          <Box sx={{ mt: 4 }}>
            <AreaChart
              data={minuteChartData}
              color={chartColor}
              height={matchesSmDown ? 300 : 360}
              chartWidthValue={1120}
            />
          </Box>
        )}
        {alignment === "daily" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={dailyCandleData.candle}
              volumedata={dailyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "weekly" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={weeklyCandleData.candle}
              volumedata={weeklyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "monthly" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={monthlyCandleData.candle}
              volumedata={monthlyCandleData.volume}
            />
          </Box>
        )}

        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            my: 6,
            mx: { xs: 0, sm: 4 },
            py: { xs: 1.5, sm: 3 },
            px: 2,
            borderRadius: 2,
            bgcolor: "secondaryBackground",
          }}
          elevation={0}
          // variant="outlined"
        >
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              Today
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.today.color,
              }}
            >
              {percentChangeData.today.text}
            </Typography>
          </Box>
          {!matchesSmDown && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              1 Week
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.oneWeek.color,
              }}
            >
              {percentChangeData.oneWeek.text}
            </Typography>
          </Box>
          {!matchesSmDown && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              1 Month
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.oneMonth.color,
              }}
            >
              {percentChangeData.oneMonth.text}
            </Typography>
          </Box>
          {!matchesSmDown && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              6 Month
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.sixMonth.color,
              }}
            >
              {percentChangeData.sixMonth.text}
            </Typography>
          </Box>
          {!matchesSmDown && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              1 Year
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.oneYear.color,
              }}
            >
              {percentChangeData.oneYear.text}
            </Typography>
          </Box>
          {!matchesSmDown && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <Box
            sx={{
              mx: { xs: 2, sm: 7 },
              my: { xs: 1, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              5 Year
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: percentChangeData.fiveYear.color,
              }}
            >
              {percentChangeData.fiveYear.text || "--"}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Typography
            color="text.primary"
            sx={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            Matket Today
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-start"
          // justifyContent="space-between"
          justifyContent="flex-start"
          rowSpacing={{ xs: 4, sm: 4 }}
          columnSpacing={{ xs: 2, sm: 6 }}
          sx={{ mt: 2 }}
        >
          <Grid item xs={4} sm={2}>
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
                {stock.latest.open}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
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
                {stock.latest.low}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
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
                {stock.latest.high}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
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
                {stock.latest.volume}
              </Typography>
              {/* <Typography
                color="text.secondary"
                sx={{ ml: .7, fontSize: ".875rem" }}
              >
                BDT
              </Typography> */}
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
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
                {(stock.latest.value / 10).toFixed(2)}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                Crore
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
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
                {stock.latest.trade}
              </Typography>
              {/* <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                Crore
              </Typography> */}
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
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
                {stock.latest.ycp}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
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
                {Math.min(stock.lastDay.oneYearLow, stock.latest.ltp) || "--"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
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
                {Math.max(stock.lastDay.oneYearHigh, stock.latest.ltp) || "--"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Circuit Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                }}
              >
                {dates.isCircuitEnabled ? stock.fundamentals.circuitLow : "No"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                {dates.isCircuitEnabled ? "BDT" : ""}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Circuit Up
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                }}
              >
                {dates.isCircuitEnabled ? stock.fundamentals.circuitUp : "No"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                {dates.isCircuitEnabled ? "BDT" : ""}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Beta (1 Year)
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.technicals.beta}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider light sx={{ my: 4, mr: { xs: 0, sm: 4 } }} />

        <Box sx={{ mt: 1, mb: 3 }}>
          <Typography
            color="text.primary"
            sx={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            Financial Indicators
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          rowSpacing={{ xs: 4, sm: 6 }}
          columnSpacing={{ xs: 2, sm: 6 }}
          sx={{ mt: 2 }}
        >
          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              P/E ratio
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals?.pe?.value}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {`EPS (${
                stock.fundamentals.screener?.epsQuarterly?.period ||
                stock.fundamentals.screener?.epsYearly?.period
              })`}
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.screener?.epsQuarterly?.value ||
                  stock.fundamentals.screener?.epsYearly?.value}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {`NAV (${
                stock.fundamentals.screener?.navQuarterly?.period ||
                stock.fundamentals.screener?.navYearly?.period
              })`}
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.screener?.navQuarterly?.value ||
                  stock.fundamentals.screener?.navYearly?.value}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Total Shares
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.totalShares / 10000000).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Shot-term loan
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.shortTermLoan / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Long-term loan
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.longTermLoan / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Market Capital
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.marketCap / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Paid-up Capital
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.paidUpCap / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Authorized Capital
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {stock.fundamentals.authCap == 0
                  ? "-"
                  : stock.fundamentals.authCap.toFixed(2) / 10}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                Crore
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {dates.agmPrefix} AGM Date
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {dates.agmDate || "--"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography
              noWrap
              color="text.secondary"
              sx={{ fontSize: ".875rem" }}
            >
              {dates.recordPrefix} Record Date
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {dates.recordDate || "--"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Year End
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.yearEnd}
              </Typography>
            </Stack>
          </Grid>

          {/* <Grid item xs={4} sm={2}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Face Value
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.faceValue}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".875rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid> */}
        </Grid>

        <Divider light sx={{ my: 5, mr: { xs: 0, sm: 4 } }} />

        <Box sx={{ mt: { xs: 2, sm: 2 }, mb: { xs: 2, sm: 4 } }}>
          <Typography
            color="text.primary"
            sx={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            About {stock.fundamentals.companyName}
          </Typography>
        </Box>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={{ xs: 2, sm: 6 }}
          columnSpacing={{ xs: 2, sm: 6 }}
        >
          <Grid item xs={12} sm={3.5}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Sector
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography color="text.primary" sx={{ fontSize: "1.2rem" }}>
                {stock.fundamentals.sector}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Listing Year
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography color="text.primary" sx={{ fontSize: "1.2rem" }}>
                {stock.fundamentals.listingYear}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3.3}>
            <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
              E-Mail
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.2rem", fontWeight: 500 }}
              >
                {stock.fundamentals.address.email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3.2}>
            <Typography
              component={Link}
              href="/"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              Website
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                component={Link}
                href={stock.fundamentals.address.website}
                color="text.primary"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textDecoration: "underline",
                  color: "primary.main",
                }}
                target="_blank"
              >
                {stock.fundamentals.address.website}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "1rem", textAlign: { xs: "left", sm: "justify" } }}
          >
            {stock.fundamentals.about}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
