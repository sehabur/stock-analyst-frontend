'use client';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AreaChart from '@/components/charts/AreaChart';
import { DateTime } from 'luxon';
import { grey } from '@mui/material/colors';

const dseMap = [
  {
    tag: 'dsex',
    title: 'DSEX',
  },
  {
    tag: 'dses',
    title: 'DSES',
  },
  {
    tag: 'dse30',
    title: 'DSE30',
  },
];

const formatChartData = (data: any) => {
  let dsex = [];
  let dses = [];
  let dse30 = [];

  for (let item of data) {
    const plotTime = DateTime.fromISO(item.time)
      .plus({ hours: 6 })
      .toUnixInteger();

    item.dsex.index !== 0 &&
      dsex.push({
        time: plotTime,
        value: item.dsex.index,
      });
    item.dses.index !== 0 &&
      dses.push({
        time: plotTime,
        value: item.dses.index,
      });
    item.dse30.index !== 0 &&
      dse30.push({
        time: plotTime,
        value: item.dse30.index,
      });
  }
  return { dsex, dses, dse30 };
};

export default function IndexChart({ indexData }: any) {
  const [alignment, setAlignment] = React.useState('dsex');

  const data = { change: 0 };

  const chartColor =
    indexData?.latest[alignment].change === 0
      ? '#5381ff'
      : indexData?.latest[alignment].change < 0
      ? '#f45e6a'
      : '#00A25B';

  const textColor =
    indexData?.latest[alignment].change === 0
      ? '#2962ff'
      : indexData?.latest[alignment].change < 0
      ? '#f23645'
      : '#00A25B';

  const changeLabel = () => {
    const data = indexData?.latest[alignment].change.toFixed(2);
    const sign = data > 0 ? '+' : '';
    return sign + data;
  };

  const percenChangeLabel = () => {
    const data = indexData?.latest[alignment].percentChange.toFixed(2);
    const sign = data > 0 ? '+' : '';
    return sign + data + '%';
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const chartData: any = formatChartData(indexData.minute);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ mx: 'auto' }}
        >
          {dseMap.map((item) => (
            <ToggleButton value={item.tag} key={item.tag} sx={{ px: 2 }}>
              {item.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography color="text.primary" sx={{ fontSize: '1rem', mt: 2 }}>
            {dseMap.find((item) => item.tag === alignment)?.title} Index
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography
              sx={{
                fontSize: '2.4rem',
                color: textColor,
                fontWeight: 700,
              }}
            >
              {indexData?.latest[alignment].index.toFixed(2)}
            </Typography>
            <Chip
              label={changeLabel()}
              size="small"
              sx={{
                borderRadius: 1,
                ml: 2,
                mt: 0.3,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 700,
                color: textColor,
              }}
            />
            <Chip
              label={percenChangeLabel()}
              size="small"
              sx={{
                borderRadius: 1,
                mt: 0.3,
                ml: 1,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 700,
                color: textColor,
              }}
            />
          </Stack>
        </Box>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 2 }}>
          <Paper
            elevation={4}
            // variant="outlined"
            sx={{
              textAlign: 'right',
              px: 2,
              py: 1,
              bgcolor: 'inherent',
              borderRadius: 0,
            }}
          >
            <Typography color="text.primary">Volume (Cr)</Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: '1.4rem', fontWeight: 700 }}
            >
              {(indexData?.latest.totalVolume / 10000000)?.toFixed(2)}
            </Typography>
          </Paper>
          <Paper
            elevation={4}
            // variant="outlined"
            sx={{
              textAlign: 'right',
              px: 2,
              py: 1,
              bgcolor: 'inherent',
              borderRadius: 0,
            }}
          >
            <Typography color="text.primary">Value (Cr)</Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: '1.4rem', fontWeight: 700 }}
            >
              {(indexData?.latest.totalValue / 10)?.toFixed(2)}
            </Typography>
          </Paper>
          <Paper
            elevation={4}
            sx={{
              textAlign: 'right',
              px: 2,
              py: 1,
              bgcolor: 'inherent',
              borderRadius: 0,
            }}
          >
            <Typography color="text.primary">Trade</Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: '1.4rem', fontWeight: 700 }}
            >
              {indexData?.latest.totalTrade?.toFixed(0)}
            </Typography>
          </Paper>
        </Stack>
      </Box>
      <Box sx={{ mt: 3 }}>
        <AreaChart
          data={chartData[alignment]}
          color={chartColor}
          height={280}
          tooltipTitle={`${
            dseMap.find((item) => item.tag === alignment)?.title
          } Index`}
          chartWidthValue={645}
        />
      </Box>
    </Box>
  );
}
