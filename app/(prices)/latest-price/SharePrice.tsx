'use client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PriceTable from './PriceTable';
import PriceCard from './PriceCard';
import { useSearchParams } from 'next/navigation';

export default function SharePrice({ data }: { data: Array<{}> }) {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const searchParams = useSearchParams();
  const sector = searchParams.get('sector');

  return (
    <>
      {matchesSmUp && <PriceTable data={data} sector={sector} />}
      {matchesSmDown && <PriceCard data={data} sector={sector} />}
    </>
  );
}
