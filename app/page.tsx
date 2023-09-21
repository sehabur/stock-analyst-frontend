import Banner from './_components/Banner';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default' }}>
      <Banner />
    </Box>
  );
}
