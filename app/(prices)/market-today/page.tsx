import { Box, Grid, Paper } from '@mui/material';
import IndexChart from './IndexChart';
import PieApexChart from '../../_components/charts/PieChart';
import MarketMoverChart from './MarketMoverChart';
import AreaChart from '@/components/charts/AreaChart';
import CandlestickChart from '@/components/charts/CandlestickChart';
import GainerLoser from './GainerLoser';
import { alpha } from '@mui/system';
import HorizontalStackedBarChart from '@/components/charts/HorizontalStackedBarChart';
import SectorStatus from './SectorStatus';
import { grey } from '@mui/material/colors';

async function getIndexData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/indexMinuteData`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getGainerLoserData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/allGainerLoser`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getSectorData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/sectorWiseLatestPrice`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function MarketToday() {
  const [indexData, gainerLoserData, sectorData] = await Promise.all([
    getIndexData(),
    getGainerLoserData(),
    getSectorData(),
  ]);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'secondaryBackground',
        pt: 2,
        pb: 6,
      }}
    >
      <Box sx={{ maxWidth: '1250px', mx: 'auto' }}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={7.5}>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ bgcolor: 'background.default', minHeight: '475px' }}
            >
              <IndexChart indexData={indexData} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4.5}>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{ bgcolor: 'background.default', minHeight: '475px' }}
            >
              <MarketMoverChart data={indexData.latest} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: 'transparent',
              }}
            >
              <SectorStatus sectorData={sectorData} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <GainerLoser data={gainerLoserData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
