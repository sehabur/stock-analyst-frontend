import CandlestickChart from '@/components/charts/CandlestickChart';
import { Box, Grid, Typography, Chip, Stack, Tab, Tabs } from '@mui/material';
import TabView from './TabView';

const getStockDetails = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/stock/${tradingCode}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const getDailyPrice = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/dailyPrice?code=${tradingCode}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function StockDetails({
  params: { tradingCode },
}: {
  params: { tradingCode: string };
}) {
  const [stock, dailyPriceData] = await Promise.all([
    getStockDetails(tradingCode),
    getDailyPrice(tradingCode),
  ]);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.default',
          maxWidth: 1050,
          mx: 'auto',
          p: 2,
          // display: 'flex',
          // direction: 'column',
          // justifyContent: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 1,
            color: 'text.primary',
            fontSize: '2.2rem',
            fontWeight: 500,
          }}
        >
          Grameenphone Ltd.
        </Typography>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
            {stock.price.tradingCode}
          </Typography>

          <Chip label="Category A" sx={{ borderRadius: 1, mx: 2 }} />
          <Chip label="Telecommunication" sx={{ borderRadius: 1 }} />
        </Stack>

        <Stack direction="row" alignItems="baseline" sx={{ mt: 1 }}>
          <Typography
            sx={{ color: 'text.primary', fontSize: '2.5rem', fontWeight: 500 }}
          >
            {stock.price.ltp}
          </Typography>

          <Typography sx={{ color: 'text.secondary', ml: 0.7 }}>BDT</Typography>

          <Typography
            sx={{
              color:
                stock.price.change === 0
                  ? 'primary.main'
                  : stock.price.change < 0
                  ? 'error.main'
                  : 'success.main',
              fontSize: '1.5rem',
              ml: 3,
              mr: 1.5,
            }}
          >
            {stock.price.change}
          </Typography>

          <Typography
            sx={{
              color:
                stock.price.change === 0
                  ? 'primary.main'
                  : stock.price.change < 0
                  ? 'error.main'
                  : 'success.main',
              fontSize: '1.5rem',
            }}
          >
            {stock.price.change}%
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Last updated at {stock.price.time}
        </Typography>
      </Box>

      <Box>
        <TabView />
      </Box>

      <Box sx={{ maxWidth: 500, minWidth: 400, pl: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.ycp}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Open
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.high}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              High
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.low}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Low
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.ycp}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              YCP
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.volume}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Volume
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.value}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Value(mn)
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.trade}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Trade
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.totalNumSec}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Total Share
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.ltp}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              52W High
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.ltp}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              52W Low
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.price.ltp}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Floor
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.marketCap}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Circuit up
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.marketCap}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              P/E ratio
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.marketCap}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              EPS
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.marketCap}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              NAV
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.1rem' }} color="primary.dark">
              {stock.fundamentals.marketCap}
            </Typography>
            <Typography sx={{ fontSize: '.8rem' }} color="text.secondary">
              Div-2022
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <Box>
        <CandlestickChart data={dailyPriceData.dailyPrice} />
      </Box> */}
    </Box>
  );
}
