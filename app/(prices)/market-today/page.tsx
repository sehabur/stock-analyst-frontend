import { Box, Grid, Paper, Typography } from "@mui/material";
import IndexChart from "./IndexChart";
import PieApexChart from "../../_components/charts/PieChart";
import MarketMoverChart from "./MarketMoverChart";
import AreaChart from "@/components/charts/AreaChart";
import CandlestickChart from "@/components/charts/CandlestickChart";
import GainerLoser from "./GainerLoser";
import { alpha } from "@mui/system";
import HorizontalStackedBarChart from "@/components/charts/HorizontalStackedBarChart";
import SectorStatus from "./SectorStatus";
import { grey } from "@mui/material/colors";
import Link from "next/link";

async function getIndexData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/indexMinuteData`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getGainerLoserData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/allGainerLoser`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getSectorData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/sectorWiseLatestPrice`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function MarketToday() {
  const [indexData, gainerLoserData, sectorData] = await Promise.all([
    getIndexData(),
    getGainerLoserData(),
    getSectorData(),
  ]);

  return (
    <Box
      component="main"
      sx={{
        // bgcolor: 'secondaryBackground',
        pt: 2,
        pb: 6,
      }}
    >
      <Box sx={{ maxWidth: "1250px", mx: "auto" }}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={7.5}>
            <Box sx={{ bgcolor: "background.default" }}>
              <IndexChart indexData={indexData} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={4.5}>
            <Box sx={{ bgcolor: "background.default", pl: { xs: 2, sm: 6 } }}>
              <MarketMoverChart data={indexData.latest} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "transparent",
                my: 2,
              }}
            >
              <SectorStatus sectorData={sectorData} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <GainerLoser data={gainerLoserData} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography sx={{ fontSize: ".9rem", textAlign: "center" }}>
          Charts are powered by{" "}
          <Typography
            component={Link}
            href="https://www.tradingview.com/"
            target="_blank"
            sx={{ color: "primary.main" }}
          >
            TradingView
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
