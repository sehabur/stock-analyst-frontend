'use client';
import AreaChart from '@/components/charts/AreaChart';
import CandlestickVolumeChart from '@/components/charts/CandlestickVolumeChart';
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
} from '@mui/material';
import { DateTime } from 'luxon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';
import { grey } from '@mui/material/colors';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import YearlyColumnChart from '@/components/charts/YearlyColumnChart';
import QuarterlyColumnChart from '@/components/charts/QuarterlyColumnChart';
import CloseIcon from '@mui/icons-material/Close';
import PieChart from '@/components/charts/PieChart';
import LineColumnChart from '@/components/charts/LineColumnChart';
import { yearEndMap } from '@/data/dse';
import LineChart from '@/components/charts/ShareholdingBarChart';
import ShareholdingBarChart from '@/components/charts/ShareholdingBarChart';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import MultipleLineChart from '@/components/charts/MultipleLineChart';
import FinancialCard from '@/components/cards/FinancialCard';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import { fundamentalsTooltip } from '@/data/info';
import FundamentalInfoCard from '@/components/cards/FundamentalInfoCard';

const Heading = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 700,
  marginLeft: '16px',
});

// const formatPeData = (value: number, sectorRatio: any) => {
//   const changeText =
//     value === sectorRatio.median
//       ? 'Lies at median of sector '
//       : value > sectorRatio.median
//       ? 'Above median value of sector'
//       : 'Below than median value of sector';

//   const changeTextColor =
//     value === sectorRatio.median
//       ? 'primary.main'
//       : value > sectorRatio.median
//       ? 'error.main'
//       : 'success.main';

//   return {
//     current: value,
//     changeText,
//     changeTextColor,
//     position: sectorRatio.position,
//     totalshares: sectorRatio.items,
//     sectorRatio,
//   };
// };

const formatYearlyData = (data: any, divideFactor = 1) => {
  data.sort((a: { year: number }, b: { year: number }) => a.year - b.year);

  let datapoint = [];
  let categories = [];

  for (let item of data) {
    datapoint.push(Number((item.value / divideFactor).toFixed(3)));
    categories.push(item.year);
  }

  // const lastYearData = datapoint[datapoint.length - 2];
  // const thisYearData = datapoint[datapoint.length - 1];

  // const percentChange = ((thisYearData - lastYearData) / lastYearData) * 100;

  // const changeText =
  //   percentChange === 0
  //     ? 'No change since last year'
  //     : percentChange.toFixed(2) +
  //       '% ' +
  //       (percentChange > 0 ? 'incr over' : 'decr from') +
  //       ' last year';

  // const changeTextColor =
  //   percentChange === 0
  //     ? 'primary.main'
  //     : percentChange < 0
  //     ? 'error.main'
  //     : 'success.main';

  return {
    // current: thisYearData,
    // changeText,
    // changeTextColor,
    categories,
    dataSeries: [
      {
        name: 'Value',
        data: datapoint,
      },
    ],
  };
};

const quarterMonthsGetter = (
  yearEnd: string,
  currentYear: number,
  lastYear: number
) => {
  const yearEndData: any = yearEndMap.find((item) => item.yearEnd === yearEnd);

  let currentYearValue, lastYearValue;

  console.log(yearEndData, yearEnd);

  if (yearEnd === '31-Dec') {
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

  // let currentValue, lastValue;
  // if (thisYearData?.q4) {
  //   currentValue = thisYearData.q4;
  //   lastValue = thisYearData.q3;
  // } else if (thisYearData?.q3) {
  //   currentValue = thisYearData.q3;
  //   lastValue = thisYearData.q2;
  // } else if (thisYearData?.q2) {
  //   currentValue = thisYearData.q2;
  //   lastValue = thisYearData.q1;
  // } else if (thisYearData?.q1) {
  //   currentValue = thisYearData.q1;
  //   lastValue = lastYearData.q4;
  // } else {
  //   currentValue = 0;
  //   lastValue = 0;
  // }

  // const percentChange = ((currentValue - lastValue) / lastValue) * 100;

  // const changeText =
  //   percentChange === 0
  //     ? 'No change since last quarter'
  //     : percentChange.toFixed(2) +
  //       '% ' +
  //       (percentChange > 0 ? 'increased over' : 'decreased from') +
  //       ' last quarter';

  // const changeTextColor =
  //   percentChange === 0
  //     ? 'primary.main'
  //     : percentChange < 0
  //     ? 'error.main'
  //     : 'success.main';

  return {
    // current: currentValue,
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

const formatQuarterlyEpsData = (data: any, yearEnd: string) => {
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

  // let currentValue, lastValue;

  // if (thisYearData.q4) {
  //   currentValue = thisYearData.q4;
  //   lastValue = thisYearData.q3;
  //   lastValue = thisYearData.q3;
  // } else if (thisYearData.q3) {
  //   currentValue = thisYearData.q3;
  //   lastValue = thisYearData.q2;
  // } else if (thisYearData.q2) {
  //   currentValue = thisYearData.q2;
  //   lastValue = thisYearData.q1;
  // } else if (thisYearData.q1) {
  //   currentValue = thisYearData.q1;
  //   lastValue = lastYearData.q4 ? lastYearData.q4 : lastYearData.q3;
  // } else {
  //   currentValue = 0;
  //   lastValue = 0;
  // }

  // const percentChange = ((currentValue - lastValue) / lastValue) * 100;

  // const changeText =
  //   percentChange === 0
  //     ? 'No change since last quarter'
  //     : percentChange.toFixed(2) +
  //       '% ' +
  //       (percentChange > 0 ? 'increased over' : 'decreased from') +
  //       ' last quarter';

  // const changeTextColor =
  //   percentChange === 0
  //     ? 'primary.main'
  //     : percentChange < 0
  //     ? 'error.main'
  //     : 'success.main';

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

const formatShareholdingData = (data: any) => {
  const createChangeText = (series: any, name: string) => {
    const len = series.length;
    const lastItem = series[len - 1];
    const secondLastItem = series[len - 2];
    const change = ((lastItem - secondLastItem) * 100) / secondLastItem;

    let changeText = '';
    let changeTextColor = '';

    if (lastItem > secondLastItem) {
      changeText = `${name} shareholding increased by ${change.toFixed(2)}%`;
      changeTextColor = 'success.main';
    } else if (lastItem < secondLastItem) {
      changeText = `${name} shareholding decreased by ${Math.abs(
        change
      ).toFixed(2)}%`;
      changeTextColor = 'error.main';
    } else {
      changeText = `${name} shareholding remains same`;
      changeTextColor = 'primary.main';
    }
    return { text: changeText, color: changeTextColor };
  };

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
      labels: ['Director', 'Institute', 'Public', 'Government', 'Foreign'],
      colors: ['#4dd0e1', '#b388ff', '#448aff', '#42bda8', '#f57f17'],
    },
    changeText: [
      createChangeText(director, 'Director'),
      createChangeText(institute, 'Institute'),
      createChangeText(publicShare, 'Public'),
    ],
    series: [
      {
        name: 'Director',
        data: director,
      },
      {
        name: 'Institute',
        data: institute,
      },
      {
        name: 'Public',
        data: publicShare,
      },
      {
        name: 'Government',
        data: govt,
      },

      {
        name: 'Foreign',
        data: foreign,
      },
    ],
    categories,
  };
};

const formatDividendData = (cashDiv: any, divYield: any) => {
  cashDiv.sort((a: { year: number }, b: { year: number }) => a.year - b.year);
  divYield.sort((a: { year: number }, b: { year: number }) => a.year - b.year);

  let cashDivSeries = [];
  let divYieldSeries: any = [];
  let categories = [];

  for (let item of cashDiv) {
    cashDivSeries.push(item.value);
    categories.push(item.year);
  }

  categories.map((category: any) => {
    const yieldVal = divYield.find((item: any) => item.year === category);
    divYieldSeries.push(yieldVal?.value || null);
  });

  return {
    categories,
    dataSeries: [
      {
        name: 'Cash dividend (%)',
        type: 'column',
        data: cashDivSeries,
      },
      {
        name: 'Dividend yield (%)',
        type: 'line',
        data: divYieldSeries,
      },
    ],
  };
};

const formatProfitData = (profitMargin: any, profit: any, revenue: any) => {
  profitMargin.sort(
    (a: { year: number }, b: { year: number }) => a.year - b.year
  );
  profit.sort((a: { year: number }, b: { year: number }) => a.year - b.year);
  // revenue.sort((a: { year: number }, b: { year: number }) => a.year - b.year);

  let profitMarginDataSeries = [];
  let profitDataSeries: any = [];
  // let revenueDataSeries: any = [];
  let categories = [];

  for (let item of profitMargin) {
    profitMarginDataSeries.push(item.value);
    categories.push(item.year);
  }

  categories.map((category: any) => {
    const profitVal = profit.find((item: any) => item.year === category);
    const revenueVal = revenue.find((item: any) => item.year === category);
    profitDataSeries.push((profitVal?.value / 10).toFixed(3) || null);
    // revenueDataSeries.push((revenueVal?.value / 10000000).toFixed(3) || null);
  });

  const lastYearData =
    profitMarginDataSeries[profitMarginDataSeries.length - 2];
  const thisYearData =
    profitMarginDataSeries[profitMarginDataSeries.length - 1];

  const percentChange = ((thisYearData - lastYearData) / lastYearData) * 100;

  const changeText =
    percentChange === 0
      ? 'No change since last year'
      : percentChange.toFixed(2) +
        '% ' +
        (percentChange > 0 ? 'increased over' : 'decreased from') +
        ' last year';

  const changeTextColor =
    percentChange === 0
      ? 'primary.main'
      : percentChange < 0
      ? 'error.main'
      : 'success.main';

  return {
    current: thisYearData,
    changeText,
    changeTextColor,
    categories,
    dataSeries: [
      // {
      //   name: 'Revenue (Cr)',
      //   type: 'column',
      //   data: revenueDataSeries,
      // },
      {
        name: 'Net income (crore)',
        type: 'column',
        data: profitDataSeries,
      },
      {
        name: 'Profit margin',
        type: 'line',
        data: profitMarginDataSeries,
      },
    ],
  };
};

export default function Financials({ data }: any) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

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

  // const pe = formatPeData(data.peRatio, data.sectorPeRatio);
  // const priceToBookValueRatio = formatPeData(
  //   data.priceToBookValueRatio,
  //   data.sectorPbvRatio
  // );
  const epsYearly = formatYearlyData(data.epsYearly);
  const navYearly = formatYearlyData(data.navYearly);
  const roe = formatYearlyData(data.roe);
  const roce = formatYearlyData(data.roce);
  const de = formatYearlyData(data.de);
  const currentRatio = formatYearlyData(data.currentRatio);
  const netIncome = formatYearlyData(data.netIncome, 10000000);
  const netIncomeRatio = formatYearlyData(data.netIncomeRatio);
  const nocfpsYearly = formatYearlyData(data.nocfpsYearly);
  const profitMargin = formatYearlyData(data.profitMargin);
  const revenue = formatYearlyData(data.revenue, 10000000);
  const operatingProfit = formatYearlyData(data.operatingProfit, 10000000);
  const totalAsset = formatYearlyData(data.totalAsset, 10000000);
  const divPayoutRatio = formatYearlyData(
    data.screener.dividendPayoutRatio.data
  );
  const dividendYield = formatYearlyData(data.dividendYield);

  const epsQuarterly = formatQuarterlyEpsData(data.epsQuaterly, data.yearEnd);
  const navQuarterly = formatQuarterlyData(data.navQuaterly, data.yearEnd);
  const nocfpsQuarterly = formatQuarterlyData(
    data.nocfpsQuaterly,
    data.yearEnd
  );
  // const shareholdings = formatShareholdingData(data.shareHoldingPercentage);

  // const cashdividend = formatDividendData(
  //   data.cashDividend,
  //   data.dividendYield
  // );
  // const bonusdividend = formatYearlyData(data.cashDividend);

  return (
    <Box sx={{ bgcolor: 'financePageBgcolor' }}>
      <Box sx={{ maxWidth: '1250px', mx: 'auto', py: 2, px: 2 }}>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="md"
          fullScreen={!matchesSmUp}
        >
          {dialogContent === 'nav' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
                Net Asset Value (NAV) of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', pb: 2, pt: 1 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.nav?.definition}
                  />
                  <Box sx={{ mx: 2 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.navQuarterly.overview}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      ml: 2,
                      mt: 4,
                    }}
                  >
                    Quarterly
                  </Typography>
                  <Box>
                    <QuarterlyColumnChart data={navQuarterly} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      ml: 2,
                    }}
                  >
                    Yearly
                  </Typography>
                  <Box>
                    <YearlyColumnChart data={navYearly} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'eps' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Earning per share (EPS) of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', pb: 2, pt: 1 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.eps?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.navQuarterly.overview}
                    </Typography>
                  </Box>

                  <Box>
                    <Heading>Quarterly</Heading>
                    <QuarterlyColumnChart data={epsQuarterly} />
                  </Box>

                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={epsYearly} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'roe' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Return on equity (ROE) of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.roe?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.roe.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={roe} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'roce' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Return on capital employed (ROCE) of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.roce?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.roce.overview}
                    </Typography>
                  </Box>

                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={roce} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'pe' && (
            <>
              <DialogTitle>
                Price-to-EPS (P/E) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.pe?.definition}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: 10,
                      textAlign: 'center',
                      color: data.pe.color,
                    }}
                  >
                    {data.pe.overview}
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
                        color="error"
                        sx={{ fontSize: '1rem', fontWeight: 700 }}
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
                          '& .MuiSlider-thumb': {
                            height: 28,
                            width: 28,
                            bgcolor: '#fff',
                            border: '6px solid currentcolor',
                          },
                          '& .MuiSlider-mark': {
                            opacity: 0,
                          },
                          '& .MuiSlider-valueLabel': {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          '& .MuiSlider-track': {
                            color: 'transparent',
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'success.main',
                          fontWeight: 700,
                        }}
                      >
                        Highest P/E of sector
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'de' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Debt-to-Equity (D/E) ratio of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.de?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.de.overview}
                    </Typography>
                  </Box>

                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={de} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}

          {dialogContent === 'pbv' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Price-to-Bookvalue (P/BV) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.pbv?.definition}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: 10,
                      textAlign: 'center',
                      color: data.pbv.color,
                    }}
                  >
                    {data.pbv.overview}
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
                        color="error"
                        sx={{ fontSize: '1rem', fontWeight: 700 }}
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
                          '& .MuiSlider-thumb': {
                            height: 28,
                            width: 28,
                            bgcolor: '#fff',
                            border: '6px solid currentcolor',
                          },
                          '& .MuiSlider-mark': {
                            opacity: 0,
                          },
                          '& .MuiSlider-valueLabel': {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          '& .MuiSlider-track': {
                            color: 'transparent',
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'success.main',
                          fontWeight: 700,
                        }}
                      >
                        Highest P/Bv of sector
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'ps' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Price-to-Sales (P/S) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.pe?.definition}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: 10,
                      textAlign: 'center',
                      color: data.screener.ps.color,
                    }}
                  >
                    {data.screener.ps.overview}
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
                        color="error"
                        sx={{ fontSize: '1rem', fontWeight: 700 }}
                      >
                        Lowest P/S of sector
                      </Typography>

                      <Slider
                        value={data.screener.ps.value}
                        aria-label="Disabled slider"
                        valueLabelDisplay="on"
                        valueLabelFormat={() => {
                          return `P/BV: ${data.screener.ps.value}`;
                        }}
                        min={data.screener.ps.min}
                        max={data.screener.ps.max}
                        marks={[
                          {
                            value: data.screener.ps.min,
                            label: data.screener.ps.min,
                          },
                          {
                            value: data.screener.ps.max,
                            label: data.screener.ps.max,
                          },
                        ]}
                        sx={{
                          color: data.screener.ps.color,
                          height: 10,
                          '& .MuiSlider-thumb': {
                            height: 28,
                            width: 28,
                            bgcolor: '#fff',
                            border: '6px solid currentcolor',
                          },
                          '& .MuiSlider-mark': {
                            opacity: 0,
                          },
                          '& .MuiSlider-valueLabel': {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          '& .MuiSlider-track': {
                            color: 'transparent',
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'success.main',
                          fontWeight: 700,
                        }}
                      >
                        Highest P/S of sector
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </DialogContent>
            </>
          )}

          {dialogContent === 'profitMargin' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Profit Margin of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.profitMargin?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.profitMargin.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={profitMargin} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}

          {dialogContent === 'currentRatio' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Current Ratio of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.currentRatio?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.currentRatio.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={currentRatio} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'netIncomeRatio' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Net Income Ratio of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.netIncomeRatio?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.netIncomeRatio.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={netIncomeRatio} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'dividendYield' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Dividend Yield of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.dividendYield?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.dividendYield.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={dividendYield} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'revenue' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Revenue of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.revenue?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.revenue.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={revenue} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'netIncome' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Net Income of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.netIncome?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.netIncome.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={netIncome} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'totalAsset' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Total Asset of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.totalAsset?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.totalAsset.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={totalAsset} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'operatingProfit' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Operating Profit of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', py: 2 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.operatingProfit?.definition}
                  />
                  <Box sx={{ mx: 2, mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.operatingProfit.overview}
                    </Typography>
                  </Box>
                  <Box>
                    <Heading>Yearly</Heading>
                    <YearlyColumnChart data={operatingProfit} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}
          {dialogContent === 'nocfps' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
                NOCFPS of {data.tradingCode}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ maxWidth: '700px', mx: 'auto', pb: 2, pt: 1 }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.nocfps?.definition}
                  />
                  <Box sx={{ mx: 2 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {data.screener.nocfpsQuarterly.overview}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      ml: 2,
                      mt: 4,
                    }}
                  >
                    Quarterly
                  </Typography>
                  <Box>
                    <QuarterlyColumnChart data={nocfpsQuarterly} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      ml: 2,
                    }}
                  >
                    Yearly
                  </Typography>
                  <Box>
                    <YearlyColumnChart data={nocfpsYearly} />
                  </Box>
                </Box>
              </DialogContent>
            </>
          )}

          {dialogContent === 'pcf' && (
            <>
              <DialogTitle sx={{ fontWeight: 700, fontSize: '1.4rem' }}>
                Price-to-Cashflow (P/Cf) Ratio of {data.tradingCode}
              </DialogTitle>

              <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 6, mx: { xs: 0, sm: 12 } }}>
                  <FundamentalInfoCard
                    text={fundamentalsTooltip.pcf?.definition}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      mt: 4,
                      mb: 6,
                      mx: 10,
                      textAlign: 'center',
                      color: data.pcf.color,
                    }}
                  >
                    {data.pcf.overview}
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
                        color="error"
                        sx={{ fontSize: '1rem', fontWeight: 700 }}
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
                          '& .MuiSlider-thumb': {
                            height: 28,
                            width: 28,
                            bgcolor: '#fff',
                            border: '6px solid currentcolor',
                          },
                          '& .MuiSlider-mark': {
                            opacity: 0,
                          },
                          '& .MuiSlider-valueLabel': {
                            fontSize: 18,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            opacity: 0.9,
                          },
                          '& .MuiSlider-track': {
                            color: 'transparent',
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'success.main',
                          fontWeight: 700,
                        }}
                      >
                        Highest P/Cf of sector
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </DialogContent>
            </>
          )}
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon sx={{ fontSize: '1.6rem' }} />
          </IconButton>
        </Dialog>

        <Typography
          sx={{
            color: 'text.primary',
            fontSize: '1.6rem',
            fontWeight: 500,
            mt: 2,
            mb: 4,
          }}
        >
          Fundamentals
        </Typography>

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          rowSpacing={{ xs: 3, sm: 6 }}
          columnSpacing={{ xs: 2, sm: 4 }}
        >
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="EPS"
              title="Earning Per Share (EPS)"
              data={data.screener.epsQuarterly}
              dialogtype="eps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              title="Net Asset Value (NAV)"
              titleShort="NAV"
              data={data.screener.navQuarterly}
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
              data={data.screener.roe}
              dialogtype="roe"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="ROCE"
              title="Return of Capital Employed"
              unit="%"
              divideFactor={0.01}
              data={data.screener.roce}
              dialogtype="roce"
              handleItemClick={handleItemClick}
            />
          </Grid>
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
              unit="%"
              divideFactor={0.01}
              data={data.screener.de}
              dialogtype="de"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="P/S Ratio"
              title="Price/Sales Ratio"
              data={data.screener.ps}
              dialogtype="ps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Price/Bookvalue Ratio"
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
              data={data.screener.currentRatio}
              dialogtype="currentRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Net Income Ratio"
              title="Net Income Ratio"
              data={data.screener.netIncomeRatio}
              dialogtype="netIncomeRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="NOCFPS"
              title="NOCFPS"
              data={data.screener.nocfpsQuarterly}
              dialogtype="nocfps"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Price/Cashflow Ratio"
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
              // unit="%"
              // divideFactor={0.01}
              data={data.screener.profitMargin}
              dialogtype="profitMargin"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Dividend Yield"
              title="Divident Yield"
              unit="%"
              data={data.screener.dividendYield}
              dialogtype="dividendYield"
              handleItemClick={handleItemClick}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Dividend Payout Ratio"
              title="Dividend Payout Ratio"
              data={data.screener.dividendPayoutRatio}
              dialogtype="divPayoutRatio"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FinancialCard
              titleShort="Revenue"
              title="Revenue"
              unit="Crore"
              divideFactor={10000000}
              data={data.screener.revenue}
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
              data={data.screener.netIncome}
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
              data={data.screener.totalAsset}
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
              data={data.screener.operatingProfit}
              dialogtype="operatingProfit"
              handleItemClick={handleItemClick}
            />
          </Grid>

          {/* 
          
          
        
          


          
          <Grid item xs={6} sm={2.4}>
            <FinancialCard
              titleShort="Total Assets (Crore)"
              title="Total Assets (Crore)"
              data={totalAsset}
              dialogtype="totalAsset"
              handleItemClick={handleItemClick}
            />
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <FinancialCard
              titleShort="Total Liabilities (Crore)"
              title="Total Liabilities (Crore)"
              data={totalLiabilities}
              dialogtype="totalLiabilities"
              handleItemClick={handleItemClick}
            />
          </Grid>
         
          <Grid item xs={6} sm={2.4}>
            <FinancialCard
              titleShort="Profit (Crore)"
              title="Profit (Crore)"
              data={profit}
              dialogtype="profit"
              handleItemClick={handleItemClick}
            />
          </Grid>
          */}

          {/* <Grid item xs={6} sm={3}>
            <Box sx={{ p: 2 }}>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Market capitalization (Crore)
              </Typography>

              <Typography
                color="text.primary"
                sx={{ fontSize: '1.4rem', fontWeight: 500 }}
              >
                {data.marketCap}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Box sx={{ p: 2 }}>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Total shares (Crore)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.4rem', fontWeight: 500 }}
              >
                {(data.totalShares / 10000000).toFixed(3)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ p: 2 }}>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Face value (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.4rem', fontWeight: 500 }}
              >
                {data.faceValue}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ p: 2 }}>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Year end
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.4rem', fontWeight: 500 }}
              >
                {data.yearEnd}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography
              color="text.primary"
              sx={{ fontSize: '1.2rem', fontWeight: 700, ml: 2, my: 4 }}
            >
              Share holdings
            </Typography>

            <Grid container>
              <Grid item xs={12} sm={7}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ my: 2 }}
                >
                  <SquareRoundedIcon
                    sx={{ color: '#4dd0e1', fontSize: '1rem' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
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
                    sx={{ color: '#b388ff', fontSize: '1rem' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
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
                    sx={{ color: '#448aff', fontSize: '1rem' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: shareholdings.changeText[2].color,
                    }}
                  >
                    {shareholdings.changeText[2].text}
                  </Typography>
                </Stack>

                <Button
                  onClick={() => handleItemClick('shareholdings')}
                  variant="outlined"
                  sx={{ borderRadius: 8, px: 4, mt: 1 }}
                  color="warning"
                >
                  View change history
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1rem', fontWeight: 700, mt: 4, mb: 2 }}
              >
                Dividend history
              </Typography>
              <Box>
                <LineColumnChart data={cashdividend} />
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
