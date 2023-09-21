import { Paper, Grid, Typography, Stack, Button, Chip } from '@mui/material';
import Link from 'next/link';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function SectorSummaryCard({ data }: { data: any }) {
  const sectorTag = data._id.split(' ')[0].toLowerCase();

  return (
    <Paper
      sx={{ width: 360, my: { xs: 1, sm: 2 }, p: 2, mx: { xs: 0, sm: 1 } }}
      variant="outlined"
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={9.5}>
          <Typography sx={{ fontSize: '1.15rem', fontWeight: 'medium' }}>
            {data._id}
          </Typography>
          <Stack direction="row" alignItems="center" sx={{ mt: 1, mb: 2 }}>
            <KeyboardDoubleArrowUpIcon
              sx={{ color: 'success.main', fontSize: '1.3rem' }}
            />
            <Typography
              sx={{ color: 'success.main', mr: 3, fontSize: '1.3rem' }}
            >
              {data.uptrend}
            </Typography>
            <PauseCircleOutlineIcon
              sx={{ color: 'primary.main', mr: 0.5, fontSize: '1.3rem' }}
            />
            <Typography
              sx={{ color: 'primary.main', mr: 3, fontSize: '1.3rem' }}
            >
              {data.neutral}
            </Typography>
            <KeyboardDoubleArrowDownIcon
              sx={{ color: 'error.main', fontSize: '1.3rem' }}
            />
            <Typography sx={{ color: 'error.main', fontSize: '1.3rem' }}>
              {data.downtrend}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={2.5}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              color:
                data.change == 0
                  ? 'primary.main'
                  : data.change < 0
                  ? 'error.main'
                  : 'success.main',
            }}
          >
            {data.ltp}
          </Typography>
          {data.change !== 0 && (
            <Chip
              label={data.change}
              size="small"
              sx={{
                borderRadius: 1,
                mr: 1,
                mb: 1,
                fontSize: '.7rem',
                color:
                  data.change === 0
                    ? 'primary.main'
                    : data.change < 0
                    ? 'error.main'
                    : 'success.main',
              }}
            />
          )}

          <Chip
            label={`${data.change}%`}
            size="small"
            sx={{
              borderRadius: 1,
              color:
                data.change === 0
                  ? 'primary.main'
                  : data.change < 0
                  ? 'error.main'
                  : 'success.main',
            }}
          />
        </Grid>
      </Grid>
      <Button
        component={Link}
        href="/sector/sector-chart"
        variant="outlined"
        size="small"
        color="info"
        sx={{ fontSize: '.9rem', mr: 2 }}
      >
        See chart
      </Button>
      <Button
        component={Link}
        href={`/latest-price?sector=${sectorTag}`}
        variant="outlined"
        size="small"
        color="info"
        sx={{ fontSize: '.9rem', mr: 2 }}
      >
        Stock lists
      </Button>
    </Paper>
  );
}
