'use client';
import { Box, Chip, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CandlestickChart from '@/components/charts/CandlestickChart';
import CandlestickVolumeChart from '@/components/charts/CandlestickVolumeChart';
import AreaChart from '@/components/charts/AreaChart';

export default function IndexChart({ minuteIndexdata }: any) {
  const [alignment, setAlignment] = React.useState('dsex');

  const data = { change: 0 };

  const chartColor =
    data.change === 0 ? '#5381ff' : data.change < 0 ? '#f45e6a' : '#39ad9a';

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ mx: 'auto' }}
        >
          <ToggleButton value="dsex" sx={{ px: 2 }}>
            DSEX
          </ToggleButton>
          <ToggleButton value="dses" sx={{ px: 2 }}>
            DSES
          </ToggleButton>
          <ToggleButton value="ds30" sx={{ px: 2 }}>
            DS30
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography color="text.secondary" sx={{ ml: 0.4, mt: 2 }}>
        DSEX index
      </Typography>
      <Stack direction="row" alignItems="center">
        <Typography
          sx={{
            fontSize: '2rem',
            color:
              data.change == 0
                ? 'primary.main'
                : data.change < 0
                ? 'error.main'
                : 'success.main',
          }}
        >
          6302.124
        </Typography>
        <Chip
          label="-2.87"
          size="small"
          sx={{
            borderRadius: 1,
            ml: 2,
            mt: 0.3,
            p: 0,
            fontSize: '.8rem',
            color:
              data.change === 0
                ? 'primary.main'
                : data.change < 0
                ? 'error.main'
                : 'success.main',
          }}
        />
        <Chip
          label="-2.87%"
          size="small"
          sx={{
            borderRadius: 1,
            mt: 0.3,
            ml: 1,
            fontSize: '.7rem',
            color:
              data.change === 0
                ? 'primary.main'
                : data.change < 0
                ? 'error.main'
                : 'success.main',
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={8} sx={{ my: 2 }}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography color="text.primary" sx={{ fontSize: '1.3rem', my: 0 }}>
            566563
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '.8rem' }}>
            Volume
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography color="text.primary" sx={{ fontSize: '1.3rem' }}>
            163345
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '.8rem' }}>
            Value
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography color="text.primary" sx={{ fontSize: '1.3rem' }}>
            1453463
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '.8rem' }}>
            Trade
          </Typography>
        </Box>
      </Stack>
      <AreaChart data={minuteIndexdata} color={chartColor} />
    </Box>
  );
}
