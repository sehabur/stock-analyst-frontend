import HorizontalSectorBarChart from "@/components/charts/HorizontalSectorBarChart";
import HorizontalStackedBarChart from "@/components/charts/HorizontalStackedBarChart";
import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";

const formatSectorTrendData = (sectorData: any) => {
  let categories = [];
  let uptrend = [];
  let downtrend = [];
  let neutral = [];

  for (let item of sectorData) {
    categories.push(item.sector);
    uptrend.push(item.uptrend);
    downtrend.push(item.downtrend);
    neutral.push(item.neutral);
  }
  return {
    categories,
    series: [
      {
        name: "Uptrend",
        data: uptrend,
      },
      {
        name: "Neutral",
        data: neutral,
      },
      {
        name: "Downtrend",
        data: downtrend,
      },
    ],
  };
};

const formatSectorValueData = (sectorData: any) => {
  sectorData.sort(
    (a: { valueTotal: number }, b: { valueTotal: number }) =>
      b.valueTotal - a.valueTotal
  );

  let categories = [];
  // let valueTotal = [];
  let valueCatA = [];
  let valueCatB = [];
  let valueCatN = [];
  let valueCatZ = [];

  for (let item of sectorData) {
    categories.push(item.sector);
    // valueTotal.push((item.valueTotal / 10).toFixed(2));
    valueCatA.push((item.valueCategoryA / 10).toFixed(2));
    valueCatB.push((item.valueCategoryB / 10).toFixed(2));
    valueCatN.push((item.valueCategoryN / 10).toFixed(2));
    valueCatZ.push((item.valueCategoryZ / 10).toFixed(2));
  }

  return {
    categories,
    series: [
      {
        name: "A",
        data: valueCatA,
      },
      {
        name: "B",
        data: valueCatB,
      },
      {
        name: "N",
        data: valueCatN,
      },
      {
        name: "Z",
        data: valueCatZ,
      },
    ],
  };
};

export default function SectorStatus(props: any) {
  const { sectorData } = props;

  const formattedSectorTrendData = formatSectorTrendData(sectorData);
  const formattedSectorValueData = formatSectorValueData(sectorData);

  return (
    <Grid container direction="row" justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={0}
          // variant="outlined"
          sx={{ bgcolor: "background.default", px: 1, pb: 1, pt: 3 }}
        >
          <Typography
            color="text.secondary"
            sx={{ fontSize: "1.4rem", mb: 2, textAlign: "center" }}
          >
            Tops sector by gain
          </Typography>
          <HorizontalStackedBarChart
            data={formattedSectorTrendData}
            colors={["#24b29b", "#448aff", "#ff4081"]}
            type="gain"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={0}
          // variant="outlined"
          sx={{ bgcolor: "background.default", px: 1, pb: 1, pt: 3 }}
        >
          <Typography
            color="text.secondary"
            sx={{ fontSize: "1.4rem", mb: 2, textAlign: "center" }}
          >
            Top sector by value
          </Typography>
          <HorizontalStackedBarChart
            data={formattedSectorValueData}
            colors={["#4dd0e1", "#b388ff", "#f57f17", "#fbc02d"]}
            type="value"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
