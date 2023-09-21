'use client';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';
import { Box, Grid, useTheme } from '@mui/material';

export default function GainerLooser({ data }: any) {
  const theme = useTheme();

  const dataFormatter = (data: any) => {
    // let dataPoints = [];
    // let categories = [];
    // for (let item of data) {
    //   categories.push(item.tradingCode);
    //   dataPoints.push(item.change);
    // }
    // return { dataPoints, categories };
    return { dataPoints: [9.7, 8.3, 5.6], categories: ['a', 'b', 'd'] };
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor="#009966"
            data={dataFormatter(data)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor="#009966"
            data={dataFormatter(data)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor="#009966"
            data={dataFormatter(data)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
