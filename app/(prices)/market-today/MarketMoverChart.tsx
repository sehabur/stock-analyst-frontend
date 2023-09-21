import PieChart from '@/components/charts/PieChart';
import { Box } from '@mui/material';
import { Paper, Grid, Typography, Stack, Button, Chip } from '@mui/material';
import Link from 'next/link';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function MarketMoverChart() {
  const data = [31, 44, 56];
  const colors = ['#f23645', '#2962ff', '#089981'];
  const labels = ['a', 'b', 'c'];
  return (
    <Box>
      <Stack direction="row" alignItems="center" sx={{ mt: 1, mb: 2 }}>
        <KeyboardDoubleArrowUpIcon
          sx={{ color: 'success.main', fontSize: '1.3rem' }}
        />
        <Typography sx={{ color: 'success.main', mr: 3, fontSize: '1.3rem' }}>
          data.uptrend
        </Typography>
        <PauseCircleOutlineIcon
          sx={{ color: 'primary.main', mr: 0.5, fontSize: '1.3rem' }}
        />
        <Typography sx={{ color: 'primary.main', mr: 3, fontSize: '1.3rem' }}>
          data.neutral
        </Typography>
        <KeyboardDoubleArrowDownIcon
          sx={{ color: 'error.main', fontSize: '1.3rem' }}
        />
        <Typography sx={{ color: 'error.main', fontSize: '1.3rem' }}>
          data.downtred
        </Typography>
      </Stack>
      <PieChart data={data} colors={colors} labels={labels} />
    </Box>
  );
}
