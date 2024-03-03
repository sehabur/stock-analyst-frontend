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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
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
  },
  // color: theme.palette.primary.m ain,
  fontSize: ".9rem",
  textTransform: "none",
}));

const formatCandleChartData = (data: any) => {
  let candle = [];
  let volume = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    candle[i] = {
      time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    };

    volume[i] = {
      time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
      value: item.volume,
      color:
        item.close > item.open
          ? "#67cab9"
          : item.open > item.close
          ? "#fb998e"
          : "#4481ff",
    };
  }
  return {
    candle: candle.filter((item) => item.low !== 0),
    volume: volume.filter((item) => item.value !== 0),
  };
};

const calcPercentChange = (current: any, previous: any) => {
  const stockchanged = current === 0 ? false : true;
  const change = stockchanged ? ((current - previous) / previous) * 100 : 0;
  return {
    text: (change === 0 ? change : change.toFixed(2)) + "%",
    color: change === 0 ? "#2962ff" : change < 0 ? "#f45e6a" : "#00A25B",
  };
};

const formatPercentChangeData = (latestdata: any, lastdaydata: any) => {
  return {
    today: calcPercentChange(latestdata.ltp, latestdata.ycp),
    oneWeek: calcPercentChange(latestdata.ltp, lastdaydata.oneWeekBeforeData),
    oneMonth: calcPercentChange(latestdata.ltp, lastdaydata.oneMonthBeforeData),
    sixMonth: calcPercentChange(latestdata.ltp, lastdaydata.sixMonthBeforeData),
    oneYear: calcPercentChange(latestdata.ltp, lastdaydata.oneYearBeforeData),
    fiveYear: calcPercentChange(latestdata.ltp, lastdaydata.fiveYearBeforeData),
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
          fontSize: "1.4rem",
          fontWeight: 700,
          ":hover": {
            bgcolor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        {stock.fundamentals.tradingCode} Chart
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          // color="success"
          exclusive
          onChange={handleAlignment}
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              px: { xs: 1.5, sm: 2.5 },
            },
          }}
        >
          <StyledToggleButton value="minute">
            {matchesSmDown ? "Minute" : "Minute chart"}
          </StyledToggleButton>
          <StyledToggleButton value="daily">
            {matchesSmDown ? "Daily" : "Daily chart"}
          </StyledToggleButton>
          <StyledToggleButton value="weekly">
            {matchesSmDown ? "Weekly" : "Weekly chart"}
          </StyledToggleButton>
          <StyledToggleButton value="monthly">
            {matchesSmDown ? "Monthly" : "Monthly chart"}
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 4 }}>
        {alignment === "minute" && (
          <Box sx={{ mt: 4 }}>
            <AreaChart
              data={minuteChartData}
              color={chartColor}
              height={325}
              tooltipTitle={stock.fundamentals.tradingCode}
              chartWidthValue={1120}
            />
          </Box>
        )}
        {alignment === "daily" && (
          <Box>
            <CandlestickVolumeChart
              candledata={dailyCandleData.candle}
              volumedata={dailyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "weekly" && (
          <Box>
            <CandlestickVolumeChart
              candledata={weeklyCandleData.candle}
              volumedata={weeklyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "monthly" && (
          <Box>
            <CandlestickVolumeChart
              candledata={monthlyCandleData.candle}
              volumedata={monthlyCandleData.volume}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            my: 6,
            mx: { xs: 0, sm: 6 },
            py: 3,
            px: 2,
            borderRadius: 4,
            bgcolor: "secondaryBackground",
          }}
        >
          <Box sx={{ mx: { xs: 2, sm: 8 }, textAlign: "center" }}>
            <Typography
              gutterBottom
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
          <Divider orientation="vertical" flexItem />
          <Box sx={{ mx: { xs: 2, sm: 8 }, textAlign: "center" }}>
            <Typography
              gutterBottom
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
          <Divider orientation="vertical" flexItem />
          <Box sx={{ mx: { xs: 2, sm: 8 }, textAlign: "center" }}>
            <Typography
              gutterBottom
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
          <Divider orientation="vertical" flexItem />
          <Box sx={{ mx: { xs: 2, sm: 8 }, textAlign: "center" }}>
            <Typography
              gutterBottom
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
          <Divider orientation="vertical" flexItem />
          <Box sx={{ mx: { xs: 2, sm: 8 }, textAlign: "center" }}>
            <Typography
              gutterBottom
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
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            color="text.primary"
            sx={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            Key Stats
          </Typography>
        </Box>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={{ xs: 4, sm: 6 }}
          columnSpacing={{ xs: 2, sm: 6 }}
          sx={{ mt: 2 }}
        >
          <Grid item xs={4} sm={2}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Open
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              High
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Volume
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Value
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.latest.value}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Trade
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.latest.trade}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              YCP
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              52W High
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.lastDay.oneYearHigh || "--"}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              52W Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.lastDay.oneYearLow || "--"}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Circuit Up
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.circuitUp}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Circuit Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.circuitLow}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Face Value
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.faceValue}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Market Capital
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {(stock.fundamentals.marketCap / 10).toFixed(2)}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Paid up Capital
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {(stock.fundamentals.paidUpCap / 10).toFixed(2)}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Total Shares
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {(stock.fundamentals.totalShares / 10000000).toFixed(2)}
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
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Last AGM Date
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.lastAgm}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Year End
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.yearEnd}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Listing Year
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.6rem", fontWeight: 500 }}
              >
                {stock.fundamentals.listingYear}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, mb: 4 }}>
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
          rowSpacing={{ xs: 4, sm: 6 }}
          columnSpacing={{ xs: 2, sm: 6 }}
          sx={{ mt: 2 }}
        >
          <Grid item xs={4} sm={4}>
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

          <Grid item xs={4} sm={4}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
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
          <Grid item xs={4} sm={4}>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: "1rem" }}
            >
              Website
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.2rem", fontWeight: 500 }}
              >
                {stock.fundamentals.address.website}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: "1rem" }}
          >
            {stock.fundamentals.about}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
