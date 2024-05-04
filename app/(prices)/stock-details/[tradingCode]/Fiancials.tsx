"use client";
import AreaChart from "@/components/charts/AreaChart";
import CandlestickVolumeChart from "@/components/charts/CandlestickVolumeChart";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  Slider,
  styled,
  Divider,
} from "@mui/material";
import { DateTime } from "luxon";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState } from "react";
import { grey } from "@mui/material/colors";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import YearlyColumnChart from "@/components/charts/YearlyColumnChart";
import QuarterlyColumnChart from "@/components/charts/QuarterlyColumnChart";
import CloseIcon from "@mui/icons-material/Close";
import PieChart from "@/components/charts/PieChart";
import LineColumnChart from "@/components/charts/LineColumnChart";
import { yearEndMap } from "@/data/dse";
import LineChart from "@/components/charts/ShareholdingBarChart";
import ShareholdingBarChart from "@/components/charts/ShareholdingBarChart";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import MultipleLineChart from "@/components/charts/MultipleLineChart";
import FinancialCard from "@/components/cards/FinancialCard";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { fundamentalsTooltip } from "@/data/info";
import FundamentalInfoCard from "./_component/FundamentalInfoCard";
import YearlyStackedColumnChart from "@/components/charts/YearlyStackedColumnChart";
import FundamentalsDialogContent from "./_component/FundamentalsDialogContent";

const formatYearlyData = (data: any, divideFactor = 1) => {
  if (!data) return;
  if (data.length < 1) return;

  data.sort((a: { year: any }, b: { year: any }) => a.year - b.year);
  let datapoint = [];
  let categories = [];

  for (let item of data) {
    datapoint.push(Number((item.value / divideFactor).toFixed(3)));
    categories.push(item.year);
  }

  return {
    categories,
    dataSeries: [
      {
        name: "Value",
        data: datapoint,
      },
    ],
  };
};

const formatYearlyDividendData = (initdata: any, yieldData: any) => {
  if (!initdata || !yieldData) return;
  if (initdata.length < 1 || yieldData.length < 1) return;

  const data = initdata
    .sort((a: { year: any }, b: { year: any }) => a.year - b.year)
    .slice(-8);

  let cashDatapoint = [];
  let stockDatapoint = [];
  let yieldDatapoint = [];
  let categories = [];

  for (let item of data) {
    cashDatapoint.push(Number(item.cash.toFixed(1)));
    stockDatapoint.push(Number(item.stock.toFixed(1)));

    const yeild = yieldData.find(
      (yieldItem: any) => yieldItem.year === item.year
    );
    yieldDatapoint.push(yeild ? yeild.value : null);

    categories.push(item.year);
  }

  return {
    categories,
    dataSeries: {
      dividend: [
        {
          name: "Cash Dividend",
          type: "column",
          data: cashDatapoint,
        },
        {
          name: "Stock Dividend",
          type: "column",
          data: stockDatapoint,
        },
      ],
      yield: [
        {
          name: "Cash Dividend",
          type: "column",
          data: cashDatapoint,
        },
        {
          name: "Dividend Yield",
          type: "line",
          data: yieldDatapoint,
        },
      ],
    },
  };
};

const quarterMonthsGetter = (
  yearEnd: string,
  currentYear: number,
  lastYear: number
) => {
  const yearEndData: any = yearEndMap.find((item) => item.yearEnd === yearEnd);

  let currentYearValue, lastYearValue;

  if (yearEnd === "31-Dec") {
    currentYearValue = currentYear;
    lastYearValue = lastYear;
  } else {
    currentYearValue = `${(Number(currentYear) - 1).toString()}-${currentYear}`;
    lastYearValue = `${(Number(lastYear) - 1).toString()}-${lastYear}`;
  }

  return {
    qMonths: [yearEndData.q1, yearEndData.q2, yearEndData.q3, yearEndData.q4],
    currentYearValue,
    lastYearValue,
  };
};

const formatQuarterlyData = (data: any, yearEnd: string) => {
  if (!data) return;
  if (data.length < 2) return;

  data.sort((a: { year: number }, b: { year: number }) => a.year - b.year);

  const lastYearData = data[data.length - 2];
  const thisYearData = data[data.length - 1];

  const { qMonths, currentYearValue, lastYearValue } = quarterMonthsGetter(
    yearEnd,
    thisYearData.year,
    lastYearData.year
  );

  const categories = qMonths;

  let datapointSeries1: any;
  if (lastYearData) {
    datapointSeries1 = [
      lastYearData?.q1 || null,
      lastYearData?.q2 || null,
      lastYearData?.q3 || null,
      lastYearData?.q4 || null,
    ];
  } else {
    datapointSeries1 = [];
  }

  const datapointSeries2 = [
    thisYearData?.q1 || null,
    thisYearData?.q2 || null,
    thisYearData?.q3 || null,
    thisYearData?.q4 || null,
  ];

  return {
    categories,
    dataSeries: [
      {
        name: lastYearValue,
        data: datapointSeries1,
      },
      {
        name: currentYearValue,
        data: datapointSeries2,
      },
    ],
  };
};

const formatQuarterlyEpsData = (data: any, yearEnd: string) => {
  if (!data) return;
  if (data.length < 2) return;

  data.sort((a: { year: number }, b: { year: number }) => a.year - b.year);

  const thisYearData = data[data.length - 1];
  const lastYearData = data[data.length - 2];

  const { qMonths, currentYearValue, lastYearValue } = quarterMonthsGetter(
    yearEnd,
    thisYearData.year,
    lastYearData.year
  );
  const categories = qMonths;
  const datapointSeries2 = [
    thisYearData?.q1 || null,
    thisYearData?.q2 || null,
    thisYearData?.q3 || null,
    thisYearData?.q4 || null,
  ];
  const datapointSeries1 = [
    lastYearData?.q1 || null,
    lastYearData?.q2 || null,
    lastYearData?.q3 || null,
    lastYearData?.q4 || null,
  ];

  return {
    // current: epsCurrent,
    // changeText,
    // changeTextColor,
    categories,
    dataSeries: [
      {
        name: lastYearValue,
        data: datapointSeries1,
      },
      {
        name: currentYearValue,
        data: datapointSeries2,
      },
    ],
  };
};

const formatReserveData = (data: any) => {
  if (!data) return;
  if (data.length < 1) return;

  let datapoint: any = [];
  let categories: any = [];

  for (let item of data) {
    datapoint.push((item.value / 10).toFixed(2));
    categories.push(item.date);
  }

  return {
    categories,
    dataSeries: [
      {
        name: "Value",
        data: datapoint,
      },
    ],
  };
};

const formatShareholdingData = (data: any) => {
  const createChangeText = (series: any, name: string) => {
    const len = series.length;
    const lastItem = series[len - 1];
    const secondLastItem = series[len - 2];
    const change = lastItem - secondLastItem;

    let changeText = "";
    let changeTextColor = "";

    if (lastItem > secondLastItem) {
      changeText = `${name} shareholding increased by ${change.toFixed(2)}%`;
      changeTextColor = "success.main";
    } else if (lastItem < secondLastItem) {
      changeText = `${name} shareholding decreased by ${Math.abs(
        change
      ).toFixed(2)}%`;
      changeTextColor = "error.main";
    } else {
      changeText = `${name} shareholding remains same`;
      changeTextColor = "primary.main";
    }
    return { text: changeText, color: changeTextColor };
  };

  if (!data) return;
  if (data.length < 1) return;

  let director: any = [];
  let govt: any = [];
  let institute: any = [];
  let foreign: any = [];
  let publicShare: any = [];
  let categories: any = [];

  for (let item of data) {
    director.push(item.director);
    govt.push(item.govt);
    institute.push(item.institute);
    foreign.push(item.foreign);
    publicShare.push(item.public);
    categories.push(item.date);
  }

  const currentData = data[data.length - 1];

  return {
    current: {
      values: [
        currentData.director,
        currentData.institute,
        currentData.public,
        currentData.govt,
        currentData.foreign,
      ],
      date: currentData.date,
      labels: ["Director", "Institute", "Public", "Government", "Foreign"],
      colors: ["#4dd0e1", "#b388ff", "#448aff", "#42bda8", "#f57f17"],
    },
    changeText: [
      createChangeText(director, "Director"),
      createChangeText(institute, "Institute"),
      createChangeText(publicShare, "Public"),
    ],
    series: [
      {
        name: "Director",
        data: director,
      },
      {
        name: "Institute",
        data: institute,
      },
      {
        name: "Public",
        data: publicShare,
      },
      {
        name: "Government",
        data: govt,
      },

      {
        name: "Foreign",
        data: foreign,
      },
    ],
    categories,
  };
};

export default function Financials({ data }: any) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleItemClick = (type: string) => {
    handleDialogOpen();
    setDialogContent(type);
  };

  const epsYearly = formatYearlyData(data.epsYearly);
  const navYearly = formatYearlyData(data.navYearly);
  const roe = formatYearlyData(data.roe);
  const roce = formatYearlyData(data.roce);
  const roa = formatYearlyData(data.roa);
  const de = formatYearlyData(data.de);
  const currentRatio = formatYearlyData(data.currentRatio);
  const netIncome = formatYearlyData(data.netIncome, 10000000);
  const netIncomeRatio = formatYearlyData(data.netIncomeRatio);
  const nocfpsYearly = formatYearlyData(data.nocfpsYearly);
  const profitMargin = formatYearlyData(data.profitMargin);
  const revenue = formatYearlyData(data.revenue, 10000000);
  const operatingProfit = formatYearlyData(data.operatingProfit, 10000000);
  const totalAsset = formatYearlyData(data.totalAsset, 10000000);
  const dividendPayoutRatio = formatYearlyData(
    data?.screener?.dividendPayoutRatio?.data
  );

  const dividend = formatYearlyDividendData(
    data?.screener?.dividend?.data,
    data.dividendYield
  );
  const epsQuarterly = formatQuarterlyEpsData(data.epsQuaterly, data.yearEnd);
  const navQuarterly = formatQuarterlyData(data.navQuaterly, data.yearEnd);
  const nocfpsQuarterly = formatQuarterlyData(
    data.nocfpsQuaterly,
    data.yearEnd
  );

  const shareholdings: any = formatShareholdingData(
    data.shareHoldingPercentage
  );

  const reserveSurplus = formatReserveData(data.reserveSurplus);

  return (
    <Box sx={{ bgcolor: "financePageBgcolor" }}>
      <Box sx={{ maxWidth: "1250px", mx: "auto", py: { xs: 0, sm: 2 }, px: 2 }}>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="md"
          fullScreen={!matchesSmUp}
        >
          {dialogContent === "nav" && (
            <FundamentalsDialogContent
              title={`Net Asset Value (NAV) of ${data.tradingCode}`}
              overview
              quarterly
              yearly
              overviewText={data?.screener?.navQuarterly?.overview}
              quarterlyData={navQuarterly}
              yearlyData={navYearly}
              info
              infoText={fundamentalsTooltip.nav.definition}
              infoLink={fundamentalsTooltip.nav.link}
            />
          )}
          {dialogContent === "eps" && (
            <FundamentalsDialogContent
              title={`Earning per share (EPS) of ${data.tradingCode}`}
              overview
              quarterly
              yearly
              overviewText={data?.screener?.epsQuarterly?.overview}
              quarterlyData={epsQuarterly}
              yearlyData={epsYearly}
              info
              infoText={fundamentalsTooltip.eps.definition}
              infoLink={fundamentalsTooltip.eps.link}
            />
          )}
          {dialogContent === "roa" && (
            <FundamentalsDialogContent
              title={`Return on assets (ROA) of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.roa?.overview}
              yearlyData={roa}
              info
              infoText={fundamentalsTooltip.roa.definition}
              infoLink={fundamentalsTooltip.roa.link}
            />
          )}
          {dialogContent === "roe" && (
            <FundamentalsDialogContent
              title={`Return on equity (ROE) of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.roe?.overview}
              yearlyData={roe}
              info
              infoText={fundamentalsTooltip.roe.definition}
              infoLink={fundamentalsTooltip.roe.link}
            />
          )}
          {/* {dialogContent === 'roce' && (
            <FundamentalsDialogContent
              title={`Return on capital employed (ROCE) of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.roce?.overview}
              yearlyData={roce}
              info
              infoText={fundamentalsTooltip.roce.definition}
              infoLink={fundamentalsTooltip.roce.link}
            />
          )} */}
          {dialogContent === "de" && (
            <FundamentalsDialogContent
              title={`Debt-to-Equity (D/E) ratio of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.de?.overview}
              yearlyData={de}
              info
              infoText={fundamentalsTooltip.de.definition}
              infoLink={fundamentalsTooltip.de.link}
            />
          )}
          {dialogContent === "pe" && (
            <>
              <DialogTitle>
                Price-to-EPS (P/E) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: { xs: 3, sm: 10 },
                      textAlign: "center",
                      color: data.pe.color,
                    }}
                  >
                    {data.pe?.overview}
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      mx: { xs: 0, sm: 2 },
                    }}
                  >
                    <Stack
                      spacing={{ xs: 4, sm: 8 }}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "success.main",
                        }}
                      >
                        Lowest P/E of sector
                      </Typography>
                      <Slider
                        value={data.pe.value}
                        aria-label="Disabled slider"
                        valueLabelDisplay="on"
                        valueLabelFormat={() => {
                          return `P/E: ${data.pe.value}`;
                        }}
                        min={data.pe.min}
                        max={data.pe.max}
                        marks={[
                          {
                            value: data.pe.min,
                            label: data.pe.min,
                          },
                          {
                            value: data.pe.max,
                            label: data.pe.max,
                          },
                        ]}
                        sx={{
                          color: data.pe.color,
                          height: 10,
                          "& .MuiSlider-thumb": {
                            height: 28,
                            width: 28,
                            bgcolor: "#fff",
                            border: "6px solid currentcolor",
                          },
                          "& .MuiSlider-mark": {
                            opacity: 0,
                          },
                          "& .MuiSlider-valueLabel": {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          "& .MuiSlider-track": {
                            color: "transparent",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "error.main",
                          fontWeight: 700,
                        }}
                      >
                        Highest P/E of sector
                      </Typography>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 6 }}>
                    <FundamentalInfoCard
                      text={fundamentalsTooltip.pe.definition}
                      href={fundamentalsTooltip.pe.link}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === "pbv" && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                Price-to-Bookvalue (P/BV) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: { xs: 3, sm: 10 },
                      textAlign: "center",
                      color: data.pbv.color,
                    }}
                  >
                    {data.pbv?.overview}
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      mx: { xs: 0, sm: 2 },
                    }}
                  >
                    <Stack
                      spacing={{ xs: 4, sm: 8 }}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "success.main",
                        }}
                      >
                        Lowest P/Bv of sector
                      </Typography>

                      <Slider
                        value={data.pbv.value}
                        aria-label="Disabled slider"
                        valueLabelDisplay="on"
                        valueLabelFormat={() => {
                          return `P/BV: ${data.pbv.value}`;
                        }}
                        min={data.pbv.min}
                        max={data.pbv.max}
                        marks={[
                          {
                            value: data.pbv.min,
                            label: data.pbv.min,
                          },
                          {
                            value: data.pbv.max,
                            label: data.pbv.max,
                          },
                        ]}
                        sx={{
                          color: data.pbv.color,
                          height: 10,
                          "& .MuiSlider-thumb": {
                            height: 28,
                            width: 28,
                            bgcolor: "#fff",
                            border: "6px solid currentcolor",
                          },
                          "& .MuiSlider-mark": {
                            opacity: 0,
                          },
                          "& .MuiSlider-valueLabel": {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          "& .MuiSlider-track": {
                            color: "transparent",
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "error.main",
                          fontWeight: 700,
                        }}
                      >
                        Highest P/Bv of sector
                      </Typography>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 6 }}>
                    <FundamentalInfoCard
                      text={fundamentalsTooltip.pbv.definition}
                      href={fundamentalsTooltip.pbv.link}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === "ps" && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                Price-to-Sales (P/S) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: { xs: 3, sm: 10 },
                      textAlign: "center",
                      color: data?.screener?.ps.color,
                    }}
                  >
                    {data?.screener?.ps?.overview}
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      mx: { xs: 0, sm: 2 },
                    }}
                  >
                    <Stack
                      spacing={{ xs: 4, sm: 8 }}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "success.main",
                        }}
                      >
                        Lowest P/S of sector
                      </Typography>

                      <Slider
                        value={data?.screener?.ps.value}
                        aria-label="Disabled slider"
                        valueLabelDisplay="on"
                        valueLabelFormat={() => {
                          return `P/BV: ${data?.screener?.ps.value}`;
                        }}
                        min={data?.screener?.ps.min}
                        max={data?.screener?.ps.max}
                        marks={[
                          {
                            value: data?.screener?.ps.min,
                            label: data?.screener?.ps.min,
                          },
                          {
                            value: data?.screener?.ps.max,
                            label: data?.screener?.ps.max,
                          },
                        ]}
                        sx={{
                          color: data?.screener?.ps.color,
                          height: 10,
                          "& .MuiSlider-thumb": {
                            height: 28,
                            width: 28,
                            bgcolor: "#fff",
                            border: "6px solid currentcolor",
                          },
                          "& .MuiSlider-mark": {
                            opacity: 0,
                          },
                          "& .MuiSlider-valueLabel": {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          "& .MuiSlider-track": {
                            color: "transparent",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "error.main",
                          fontWeight: 700,
                        }}
                      >
                        Highest P/S of sector
                      </Typography>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 6 }}>
                    <FundamentalInfoCard
                      text={fundamentalsTooltip.ps.definition}
                      href={fundamentalsTooltip.ps.link}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === "pcf" && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                Price-to-Cashflow (P/Cf) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: { xs: 3, sm: 10 },
                      textAlign: "center",
                      color: data.pcf.color,
                    }}
                  >
                    {data.pcf?.overview}
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      mx: { xs: 0, sm: 2 },
                    }}
                  >
                    <Stack
                      spacing={{ xs: 4, sm: 8 }}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "success.main",
                        }}
                      >
                        Lowest P/Cf of sector
                      </Typography>

                      <Slider
                        value={data.pcf.value}
                        aria-label="Disabled slider"
                        valueLabelDisplay="on"
                        valueLabelFormat={() => {
                          return `P/BV: ${data.pcf.value}`;
                        }}
                        min={data.pcf.min}
                        max={data.pcf.max}
                        marks={[
                          {
                            value: data.pcf.min,
                            label: data.pcf.min,
                          },
                          {
                            value: data.pcf.max,
                            label: data.pcf.max,
                          },
                        ]}
                        sx={{
                          color: data.pcf.color,
                          height: 10,
                          "& .MuiSlider-thumb": {
                            height: 28,
                            width: 28,
                            bgcolor: "#fff",
                            border: "6px solid currentcolor",
                          },
                          "& .MuiSlider-mark": {
                            opacity: 0,
                          },
                          "& .MuiSlider-valueLabel": {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          "& .MuiSlider-track": {
                            color: "transparent",
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "error.main",
                          fontWeight: 700,
                        }}
                      >
                        Highest P/Cf of sector
                      </Typography>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 6 }}>
                    <FundamentalInfoCard
                      text={fundamentalsTooltip.pcf.definition}
                      href={fundamentalsTooltip.pcf.link}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === "dividendPayoutRatio" && (
            <FundamentalsDialogContent
              title={`Dividend Payout Ratio of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.dividendPayoutRatio?.overview}
              yearlyData={dividendPayoutRatio}
              info
              infoText={fundamentalsTooltip.dividendPayoutRatio.definition}
              infoLink={fundamentalsTooltip.dividendPayoutRatio.link}
            />
          )}
          {dialogContent === "profitMargin" && (
            <FundamentalsDialogContent
              title={`Profit Margin of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.profitMargin?.overview}
              yearlyData={profitMargin}
              info
              infoText={fundamentalsTooltip.profitMargin.definition}
              infoLink={fundamentalsTooltip.profitMargin.link}
            />
          )}
          {dialogContent === "currentRatio" && (
            <FundamentalsDialogContent
              title={`Current Ratio of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.currentRatio?.overview}
              yearlyData={currentRatio}
              info
              infoText={fundamentalsTooltip.currentRatio.definition}
              infoLink={fundamentalsTooltip.currentRatio.link}
            />
          )}
          {dialogContent === "netIncomeRatio" && (
            <FundamentalsDialogContent
              title={`Net Income Ratio of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.netIncomeRatio?.overview}
              yearlyData={netIncomeRatio}
              info
              infoText={fundamentalsTooltip.netIncomeRatio.definition}
              infoLink={fundamentalsTooltip.netIncomeRatio.link}
            />
          )}
          {dialogContent === "dividendYield" && (
            <FundamentalsDialogContent
              title={` Dividend Yield of ${data.tradingCode}`}
              overview
              yearlyLineColumn
              overviewText={data?.screener?.dividendYield?.overview}
              yearlyLineColumnData={dividend}
              info
              infoText={fundamentalsTooltip.dividendYield.definition}
              infoLink={fundamentalsTooltip.dividendYield.link}
            />
          )}
          {dialogContent === "netIncome" && (
            <FundamentalsDialogContent
              title={`Revenue of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.netIncome?.overview}
              yearlyData={netIncome}
              info
              infoText={fundamentalsTooltip.netIncome.definition}
              infoLink={fundamentalsTooltip.netIncome.link}
            />
          )}
          {dialogContent === "revenue" && (
            <FundamentalsDialogContent
              title={`Net Income of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.revenue?.overview}
              yearlyData={revenue}
              info
              infoText={fundamentalsTooltip.revenue.definition}
              infoLink={fundamentalsTooltip.revenue.link}
            />
          )}
          {dialogContent === "totalAsset" && (
            <FundamentalsDialogContent
              title={`Total Asset of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.totalAsset?.overview}
              yearlyData={totalAsset}
              info
              infoText={fundamentalsTooltip.totalAsset.definition}
              infoLink={fundamentalsTooltip.totalAsset.link}
            />
          )}
          {dialogContent === "operatingProfit" && (
            <FundamentalsDialogContent
              title={`Operating Profit of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.operatingProfit?.overview}
              yearlyData={operatingProfit}
              info
              infoText={fundamentalsTooltip.operatingProfit.definition}
              infoLink={fundamentalsTooltip.operatingProfit.link}
            />
          )}
          {dialogContent === "reserveSurplus" && (
            <FundamentalsDialogContent
              title={`Reserve and Surplus of ${data.tradingCode}`}
              overview
              yearly
              overviewText={data?.screener?.reserveSurplus?.overview}
              yearlyData={reserveSurplus}
              info
              infoText={fundamentalsTooltip.reserveSurplus.definition}
              infoLink={fundamentalsTooltip.reserveSurplus.link}
            />
          )}
          {dialogContent === "nocfps" && (
            <FundamentalsDialogContent
              title={`NOCFPS of ${data.tradingCode}`}
              overview
              quarterly
              yearly
              overviewText={data?.screener?.nocfpsQuarterly?.overview}
              quarterlyData={nocfpsQuarterly}
              yearlyData={nocfpsYearly}
              info
              infoText={fundamentalsTooltip.nocfps.definition}
              infoLink={fundamentalsTooltip.nocfps.link}
            />
          )}
          {dialogContent === "shareholdings" && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                Shareholding percentage history of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: "600px", mx: "auto", pb: 2, pt: 1 }}>
                  <Box sx={{ my: 2 }}>
                    {/* <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        ml: 2,
                      }}
                    >
                      Shareholding percentage history
                    </Typography>
                    <MultipleLineChart
                      data={shareholdings.series}
                      categories={shareholdings.categories}
                      lineColors={[
                        "#4dd0e1",
                        "#b388ff",
                        "#448aff",
                        "#42bda8",
                        "#f57f17",
                      ]}
                    /> */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        Director (%)
                      </Typography>
                      <ShareholdingBarChart
                        data={[shareholdings.series[0]]}
                        categories={shareholdings.categories}
                        lineColors={["#448aff"]}
                      />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        Institute (%)
                      </Typography>
                      <ShareholdingBarChart
                        data={[shareholdings.series[1]]}
                        categories={shareholdings.categories}
                        lineColors={["#b388ff"]}
                      />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        Public (%)
                      </Typography>
                      <ShareholdingBarChart
                        data={[shareholdings.series[2]]}
                        categories={shareholdings.categories}
                        lineColors={["#42bda8"]}
                      />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        Government (%)
                      </Typography>
                      <ShareholdingBarChart
                        data={[shareholdings.series[3]]}
                        categories={shareholdings.categories}
                        lineColors={["#4dd0e1"]}
                      />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        sx={{ textAlign: "center", fontSize: "1rem" }}
                      >
                        Foreign (%)
                      </Typography>
                      <ShareholdingBarChart
                        data={[shareholdings.series[4]]}
                        categories={shareholdings.categories}
                        lineColors={["#f57f17"]}
                      />
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon sx={{ fontSize: "1.6rem" }} />
          </IconButton>
        </Dialog>

        {/* <Typography
          sx={{
            color: 'text.primary',
            fontSize: '1.5rem',
            fontWeight: 500,
            mt: 2,
            mb: 4,
            ml: 0.5,
          }}
        >
          Fundamentals
        </Typography> */}

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          rowSpacing={{ xs: 3, sm: 6 }}
          columnSpacing={{ xs: 1, sm: 4 }}
          sx={{ pt: 4 }}
        >
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="EPS"
              title="Earning Per Share (EPS)"
              data={data?.screener?.epsQuarterly}
              dialogtype="eps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              title="Net Asset Value (NAV)"
              titleShort="NAV"
              data={data?.screener?.navQuarterly}
              dialogtype="nav"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="ROE"
              title="Return of Equity (ROE)"
              unit="%"
              divideFactor={0.01}
              data={data?.screener?.roe}
              dialogtype="roe"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="ROA"
              title="Return of Assets (ROA)"
              unit="%"
              divideFactor={0.01}
              data={data?.screener?.roa}
              dialogtype="roa"
              handleItemClick={handleItemClick}
            />
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort='ROCE'
              title='Return of Capital Employed'
              unit='%'
              divideFactor={0.01}
              data={data?.screener?.roce}
              dialogtype='roce'
              handleItemClick={handleItemClick}
            />
          </Grid> */}
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="P/E Ratio"
              title="Profit-to-Earning (P/E) Ratio"
              data={data.pe}
              dialogtype="pe"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="D/E Ratio"
              title="Debt-to-Equity (D/E) Ratio"
              // unit="%"
              // divideFactor={0.01}
              data={data?.screener?.de}
              dialogtype="de"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="P/S Ratio"
              title="Price/Sales Ratio"
              data={data?.screener?.ps}
              dialogtype="ps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="P/BV Ratio"
              title="Price/Bookvalue Ratio"
              data={data.pbv}
              dialogtype="pbv"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Current Ratio"
              title="Current Ratio"
              data={data?.screener?.currentRatio}
              dialogtype="currentRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Net Income Ratio"
              title="Net Income Ratio"
              data={data?.screener?.netIncomeRatio}
              dialogtype="netIncomeRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="NOCFPS"
              title="NOCFPS"
              data={data?.screener?.nocfpsQuarterly}
              dialogtype="nocfps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="P/CF Ratio"
              title="Price/Cashflow Ratio"
              data={data.pcf}
              dialogtype="pcf"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Profit Margin"
              title="Profit Margin"
              unit="%"
              divideFactor={0.01}
              data={data?.screener?.profitMargin}
              dialogtype="profitMargin"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Dividend Yield"
              title="Divident Yield"
              unit="%"
              data={data?.screener?.dividendYield}
              dialogtype="dividendYield"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Div Payout Ratio"
              title="Dividend Payout Ratio"
              data={data?.screener?.dividendPayoutRatio}
              dialogtype="dividendPayoutRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Revenue"
              title="Revenue"
              unit="Crore"
              divideFactor={10000000}
              data={data?.screener?.revenue}
              dialogtype="revenue"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Net Income"
              title="Net Income"
              unit="Crore"
              divideFactor={10000000}
              data={data?.screener?.netIncome}
              dialogtype="netIncome"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Total Assets"
              title="Total Assets"
              unit="Crore"
              divideFactor={10000000}
              data={data?.screener?.totalAsset}
              dialogtype="totalAsset"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Operating Profit"
              title="Operating Profit"
              unit="Crore"
              divideFactor={10000000}
              data={data?.screener?.operatingProfit}
              dialogtype="operatingProfit"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Resrv & Surpl"
              title="Reserve & Surplus"
              unit="Crore"
              divideFactor={10}
              data={data?.screener?.reserveSurplus}
              dialogtype="reserveSurplus"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: 1,
                pb: 4,
              }}
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  px: 2,
                  py: 1.5,
                }}
              >
                Share holdings
              </Typography>
              <Divider light />
              <Grid container sx={{ mt: 3, px: 2 }}>
                <Grid item xs={12} sm={7}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <PieChart
                        data={shareholdings.current.values}
                        colors={shareholdings.current.colors}
                        labels={shareholdings.current.labels}
                        height={280}
                        width={500}
                        donutSize="65%"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={5} sx={{ mt: 4 }}>
                  <Box
                    sx={{
                      // bgcolor: "secondaryBackground",
                      display: "inline-block",
                      // px: 3,
                      // py: 0.8,
                      // borderRadius: 1,
                      // mb: 0.8,
                    }}
                  >
                    <Typography color="text.primary">
                      As of {shareholdings.current.date} :
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ my: 2 }}
                  >
                    <SquareRoundedIcon
                      sx={{ color: "#4dd0e1", fontSize: "1rem" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: shareholdings.changeText[0].color,
                      }}
                    >
                      {shareholdings.changeText[0].text}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ my: 2 }}
                  >
                    <SquareRoundedIcon
                      sx={{ color: "#b388ff", fontSize: "1rem" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: shareholdings.changeText[1].color,
                      }}
                    >
                      {shareholdings.changeText[1].text}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ my: 2 }}
                  >
                    <SquareRoundedIcon
                      sx={{ color: "#448aff", fontSize: "1rem" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: shareholdings.changeText[2].color,
                      }}
                    >
                      {shareholdings.changeText[2].text}
                    </Typography>
                  </Stack>

                  <Button
                    onClick={() => handleItemClick("shareholdings")}
                    variant="outlined"
                    sx={{ borderRadius: 8, px: 4, mt: 1 }}
                    color="warning"
                  >
                    View change history
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  px: 2,
                  py: 1.5,
                }}
              >
                Dividends
              </Typography>
              <Divider light />
              <Box sx={{ px: { xs: 2, sm: 12 }, pt: 3 }}>
                <Typography
                  color="text.primary"
                  gutterBottom
                  sx={{ fontSize: "1rem", fontWeight: 700, my: 0, py: 0 }}
                >
                  Overview
                </Typography>
                <Typography color="text.primary">
                  {data?.screener?.dividendYield?.overview ||
                    "No data available"}
                </Typography>
                <Typography
                  color="text.primary"
                  sx={{ fontSize: "1rem", fontWeight: 700, my: 0, mt: 3 }}
                >
                  History
                </Typography>

                {dividend ? (
                  <YearlyStackedColumnChart data={dividend} />
                ) : (
                  <Typography sx={{ pb: 2 }}>No history available</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
