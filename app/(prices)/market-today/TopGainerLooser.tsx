'use client';
import { Box, Grid, useTheme } from '@mui/material';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';

export default function TopGainerLooser({ data }: any) {
  const theme = useTheme();

  const topGainerLooserFormatter = (data: any) => {
    let dataPoints = [];
    let categories = [];
    for (let item of data) {
      categories.push(item.tradingCode);
      dataPoints.push(item.change);
    }
    return { dataPoints, categories };
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <HorizontalBarChart
          textColor={theme.palette.text.primary}
          barColor="#009966"
          data={topGainerLooserFormatter(data.topGainer)}
        />
      </Grid>
      {/* <Grid item xs={12} sm={12}>
          <SingleBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.main}
            data={topGainerLooserFormatter(data.topLooser)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <SingleBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.main}
            data={topGainerLooserFormatter(data.topLooser)}
          />
        </Grid> */}
    </Grid>
  );
}
