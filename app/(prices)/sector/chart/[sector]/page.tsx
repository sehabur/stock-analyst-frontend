import { Box } from '@mui/material';
import SectorChart from './SectorChart';

async function getData(sectorTag: string) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/dailySectorPrice/${sectorTag}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Sector(props: any) {
  const sectorTag = props.params.sector;

  const data = await getData(sectorTag);

  return (
    <Box component="main" sx={{ bgcolor: 'background.default' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 1200,
          mx: 'auto',
          py: 2,
        }}
      >
        <SectorChart data={data} />
      </Box>
    </Box>
  );
}
