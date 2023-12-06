import PieChart from '@/components/charts/PieChart';
import { Box } from '@mui/material';
import { Paper, Grid, Typography, Stack, Button, Chip } from '@mui/material';
import Link from 'next/link';

import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';

export default function MarketMoverChart({ data }: any) {
  const colors = ['#24b29b', '#448aff', '#ff4081'];
  const labels = ['Uptrend', 'Neutral', 'Downtrend'];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography
        color="text.primary"
        sx={{ fontSize: '1.4rem', ml: 1, mt: 1 }}
      >
        Market trend
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ mt: 1, mb: 2, ml: 1 }}>
        <KeyboardDoubleArrowUpRoundedIcon
          sx={{ color: colors[0], fontSize: '2rem', mr: 1 }}
        />
        <Typography
          sx={{
            color: colors[0],
            fontWeight: 700,
            mr: 5,
            fontSize: '2rem',
          }}
        >
          {data.issuesAdvanced}
        </Typography>
        <PauseCircleOutlineRoundedIcon
          sx={{ color: colors[1], mr: 1, fontSize: '1.8rem' }}
        />
        <Typography
          sx={{
            color: colors[1],
            mr: 5,
            fontSize: '2rem',
            fontWeight: 700,
          }}
        >
          {data.issuesUnchanged}
        </Typography>
        <KeyboardDoubleArrowDownRoundedIcon
          sx={{ color: colors[2], fontSize: '2rem', mr: 1 }}
        />
        <Typography
          sx={{ color: colors[2], fontSize: '2rem', fontWeight: 700 }}
        >
          {data.issuesDeclined}
        </Typography>
      </Stack>
      <Box>
        <PieChart
          data={[
            data.issuesAdvanced,
            data.issuesUnchanged,
            data.issuesDeclined,
          ]}
          colors={colors}
          labels={labels}
          height={320}
          width={500}
          donutSize="60%"
        />
      </Box>
    </Box>
  );
}
