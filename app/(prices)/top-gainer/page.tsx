import SingleBarChart from '@/components/charts/HorizontalBarChart';
import { Grid } from '@mui/material';

export default function TopGainer() {
  const data = { dataPoints: [2, 3, 5], categories: ['a', 'c', 'd'] };
  return (
    <div>
      <Grid container>
        <Grid item>
          <SingleBarChart textColor="#ddd" barColor="#009966" data={data} />
        </Grid>
        <Grid item>
          <SingleBarChart textColor="#ddd" barColor="#009966" data={data} />
        </Grid>
      </Grid>
    </div>
  );
}
