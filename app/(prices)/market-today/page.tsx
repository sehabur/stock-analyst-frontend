import { Box, Grid } from '@mui/material';
import TopGainerLooser from './TopGainerLooser';
import IndexChart from './IndexChart';
import PieApexChart from '../../_components/charts/PieChart';
import MarketMoverChart from './MarketMoverChart';
import AreaChart from '@/components/charts/AreaChart';
import CandlestickChart from '@/components/charts/CandlestickChart';
import GainerLooser from './GainerLooser';

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/topGainerLooser`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const initialData = [
  {
    volume: 12356,
    open: 10,
    high: 10.63,
    low: 9.49,
    close: 9.55,
    time: 1642427876,
  },
  {
    volume: 12356,
    open: 9.55,
    high: 10.3,
    low: 9.42,
    close: 9.94,
    time: 1642514276,
  },
  {
    volume: 12560,
    open: 9.94,
    high: 10.17,
    low: 9.92,
    close: 9.78,
    time: 1642600676,
  },
  {
    volume: 12356,
    open: 9.78,
    high: 10.59,
    low: 9.18,
    close: 9.51,
    time: 1642687076,
  },
  {
    volume: 1236,
    open: 9.51,
    high: 10.46,
    low: 9.1,
    close: 10.17,
    time: 1642773476,
  },
  {
    volume: 12356,
    open: 10.17,
    high: 10.96,
    low: 10.16,
    close: 10.47,
    time: 1642859876,
  },
  {
    volume: 1356,
    open: 10.47,
    high: 11.39,
    low: 10.4,
    close: 10.81,
    time: 1642946276,
  },
  {
    volume: 35600,
    open: 10.81,
    high: 11.6,
    low: 10.3,
    close: 10.75,
    time: 1643032676,
  },
  {
    volume: 1236,
    open: 10.75,
    high: 11.6,
    low: 10.49,
    close: 10.93,
    time: 1643119076,
  },
  {
    volume: 2356,
    open: 10.93,
    high: 11.53,
    low: 10.76,
    close: 10.96,
    time: 1643205476,
  },
];

const initialData2 = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

export default async function MarketToday() {
  const data = await getData();

  // console.log(data);
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <IndexChart minuteIndexdata={initialData2} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MarketMoverChart />
          </Grid>

          <Grid item xs={12}>
            <GainerLooser />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
