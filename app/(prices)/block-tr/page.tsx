import { Box, Typography } from '@mui/material';
import BlockTransection from './BlockTransection';

const getBlockTr = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/blockTr/all?limit=300`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function BlockTr() {
  const data = await getBlockTr();
  return (
    <Box component="main" sx={{ bgcolor: 'background.default' }}>
      <Box
        sx={{
          maxWidth: { sm: '1280px' },
          mx: 'auto',
          py: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: '1.8rem',
            fontWeight: 500,
            textAlign: 'center',
            mt: 2,
          }}
        >
          Block Transections
        </Typography>
        <BlockTransection data={data} />
      </Box>
    </Box>
  );
}
