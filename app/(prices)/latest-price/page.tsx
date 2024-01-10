import { Box } from '@mui/material';
import SharePrice from './SharePrice';

async function getData() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/latestPrice`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <Box component="main" sx={{ bgcolor: 'background.default' }}>
      <Box
        sx={{
          maxWidth: { xs: '100vw', sm: '1290px' },
          mx: 'auto',
          py: 2,
          px: 2,
        }}
      >
        <SharePrice data={data} />
      </Box>
    </Box>
  );
}
