'use client';
import { sectorList } from '@/data/dse';
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
      open: item.ycp,
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

export default function SectorChart({ data }: any) {
  const [alignment, setAlignment] = React.useState('daily');

  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAlignment = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  //   const minuteChartData: any = data.minute
  //     .sort((a: any, b: any) => a.time - b.time)
  //     // .filter((item: any) => item.ltp !== 0 || item.close !== 0)
  //     .map((item: { time: string; ltp: number; ycp: number }) => {
  //       return {
  //         time: DateTime.fromISO(item.time).plus({ hours: 6 }).toUnixInteger(),
  //         time2: item.time,
  //         value: item.ltp !== 0 ? item.ltp : item.ycp,
  //       };
  //     });

  //   console.log(minuteChartData);

  //   const latestMinuteData = data.minute[data.minute.length - 1].change;

  //   const chartColor =
  //     latestMinuteData === 0
  //       ? '#2962ff'
  //       : latestMinuteData < 0
  //       ? '#f45e6a'
  //       : '#00A25B';

  const dailyCandleData = formatCandleChartData(data.daily);
  const weeklyCandleData = formatCandleChartData(data.weekly);
  const monthlyCandleData = formatCandleChartData(data.monthly);

  return (
    <Box>
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
        {/* {alignment === 'minute' && (
          <Box>
            <AreaChart
              data={minuteChartData}
              color={chartColor}
              fullWidth={true}
              height={420}
            />
          </Box>
        )} */}
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
      </Box>

      {/* <TextField
        select
        name="sector"
        value={sectorFormInputs}
        onChange={handleFormChange}
        size="small"
        variant="outlined"
        sx={{ width: 300, mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Sector:</InputAdornment>
          ),
        }}
      >
        <MenuItem key="all" value="all">
          All
        </MenuItem>
        {sectorList.map((option) => (
          <MenuItem key={option.tag} value={option.tag}>
            {option.name}
          </MenuItem>
        ))}
      </TextField> */}
    </Box>
  );
}
