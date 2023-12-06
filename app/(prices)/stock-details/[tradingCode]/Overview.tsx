'use client';
import AreaChart from '@/components/charts/AreaChart';
import CandlestickVolumeChart from '@/components/charts/CandlestickVolumeChart';
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import { DateTime } from 'luxon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { grey } from '@mui/material/colors';

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
        data[i].volume > data[i - 1]?.volume
          ? '#67cab9'
          : data[i].volume < data[i - 1]?.volume
          ? '#fb998e'
          : '#4481ff',
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
    text: (change === 0 ? change : change.toFixed(2)) + '%',
    color: change === 0 ? '#2962ff' : change < 0 ? '#f45e6a' : '#00A25B',
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
  const [alignment, setAlignment] = React.useState('minute');

  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const chartColor =
    stock.latest.change === 0
      ? '#2962ff'
      : stock.latest.change < 0
      ? '#f45e6a'
      : '#00A25B';

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
    <Box sx={{ maxWidth: '1250px', mx: 'auto', py: { xs: 2, sm: 4 }, px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          // size="small"
          value={alignment}
          color="success"
          exclusive
          onChange={handleAlignment}
          sx={{
            '& .MuiToggleButtonGroup-grouped': {
              px: { xs: 1.5, sm: 2.5 },
            },
          }}
        >
          <ToggleButton value="minute">
            {matchesSmDown ? 'Minute' : 'Minute chart'}
          </ToggleButton>
          <ToggleButton value="daily">
            {matchesSmDown ? 'Daily' : 'Daily chart'}
          </ToggleButton>
          <ToggleButton value="weekly">
            {matchesSmDown ? 'Weekly' : 'Weekly chart'}
          </ToggleButton>
          <ToggleButton value="monthly">
            {matchesSmDown ? 'Monthly' : 'Monthly chart'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ mb: 4 }}>
        {alignment === 'minute' && (
          <Box>
            <AreaChart
              data={minuteChartData}
              color={chartColor}
              fullWidth={true}
              height={420}
            />
          </Box>
        )}
        {alignment === 'daily' && (
          <Box>
            <CandlestickVolumeChart
              candledata={dailyCandleData.candle}
              volumedata={dailyCandleData.volume}
            />
          </Box>
        )}
        {alignment === 'weekly' && (
          <Box>
            <CandlestickVolumeChart
              candledata={weeklyCandleData.candle}
              volumedata={weeklyCandleData.volume}
            />
          </Box>
        )}
        {alignment === 'monthly' && (
          <Box>
            <CandlestickVolumeChart
              candledata={monthlyCandleData.candle}
              volumedata={monthlyCandleData.volume}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            my: 6,
          }}
        >
          <Box sx={{ mx: { xs: 1, sm: 4 }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              Today
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: percentChangeData.today.color,
              }}
            >
              {percentChangeData.today.text}
            </Typography>
          </Box>
          <Box sx={{ mx: { xs: 1, sm: 8 }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              1 Week
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: percentChangeData.oneWeek.color,
              }}
            >
              {percentChangeData.oneWeek.text}
            </Typography>
          </Box>
          <Box sx={{ mx: { xs: 1, sm: 8 }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              1 Month
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: percentChangeData.oneMonth.color,
              }}
            >
              {percentChangeData.oneMonth.text}
            </Typography>
          </Box>
          <Box sx={{ mx: { xs: 1, sm: 8 }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              6 Month
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: percentChangeData.sixMonth.color,
              }}
            >
              {percentChangeData.sixMonth.text}
            </Typography>
          </Box>
          <Box sx={{ mx: { xs: 1, sm: 8 }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              1 Year
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: percentChangeData.oneYear.color,
              }}
            >
              {percentChangeData.oneYear.text}
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          alignItems="center"
          justifyContent="left"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Day range (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.latest.high} - {stock.latest.low}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Value (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {(stock.latest.value / 10).toFixed(3)} Crore
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Volume
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.latest.volume}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Trade
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.latest.trade}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Open / Close price (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.latest.ycp} / {stock.latest.close}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Floor price (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.fundamentals.floorPrice}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                Circuit Up / Low (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.fundamentals.circuitUp} / {stock.fundamentals.circuitLow}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Box>
              <Typography
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem', fontWeight: 700 }}
              >
                52W High / Low price (BDT)
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: '1.6rem', fontWeight: 500 }}
              >
                {stock.lastDay.oneYearHigh} / {stock.lastDay.oneYearLow}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.6rem',
              fontWeight: 500,
              mt: 6,
              mb: 2,
            }}
          >
            About the company
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.1rem',
              fontWeight: 500,
              my: 0.5,
            }}
          >
            Listing year: {stock.fundamentals.listingYear}
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.1rem',
              fontWeight: 500,
              my: 0.5,
            }}
          >
            Contact No: {stock.fundamentals.address.contact}
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.1rem',
              fontWeight: 500,
              my: 0.5,
            }}
          >
            E-mail: {stock.fundamentals.address.email}
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.1rem',
              fontWeight: 500,
              my: 0.5,
            }}
          >
            Website:{' '}
            <Link href={stock.fundamentals.address.website} target="_blank">
              {stock.fundamentals.address.website}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
