import Banner from "./_components/homepage/Banner";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

import Divider from "@mui/material/Divider/Divider";
import Hero from "./_components/homepage/Hero";
import Highlights from "./_components/homepage/Highlights";
import Pricing from "./_components/homepage/Pricing";
import FAQ from "./(misc)/faq/FAQ";

import IndexChart from "@/components/homepage/IndexChart";
import MarketMoverChart from "@/components/homepage/MarketMoverChart";
import SectorStatus from "@/components/homepage/SectorStatus";
import GainerLoser from "@/components/homepage/GainerLoser";
import BlockTr from "@/components/homepage/BlockTr";
import News from "@/components/homepage/News";
import TopFinancials from "@/components/homepage/TopFinancials";
import Ipo from "@/components/homepage/Ipo";
import Beta from "@/components/homepage/Beta";
import IndexMover from "@/components/homepage/IndexMover";

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
    `${process.env.BACKEND_URL}/api/prices/topGainerLoser`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getIpo() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/ipo`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getSectorData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/sectorGainValueSummary`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const getBlockTr = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/blockTr/lastday`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getNews = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/news/all?limit=500`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const getTopFinancials = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/topFinancials?setlimit=12`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

async function getBeta() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/allStockBeta?type=top&count=8`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getIndexMover() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/indexMover?type=top&count=8`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const [
    indexData,
    gainerLoserData,
    sectorData,
    blockTrData,
    newsData,
    topFinancialsData,
    ipo,
    beta,
    indexMover,
  ] = await Promise.all([
    getIndexData(),
    getGainerLoserData(),
    getSectorData(),
    getBlockTr(),
    getNews(),
    getTopFinancials(),
    getIpo(),
    getBeta(),
    getIndexMover(),
  ]);

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      {/* <Hero />
      <Divider />
      <Highlights />
      <Divider />
      <Pricing />
      <Divider />
      <FAQ /> */}

      <Box sx={{ maxWidth: "1250px", mx: "auto", pt: { xs: 2, sm: 4 } }}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={7.5}>
            <Box sx={{ bgcolor: "background.default" }}>
              <IndexChart indexData={indexData} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={4.5}>
            <Box
              sx={{
                bgcolor: "background.default",
                pl: { xs: 2, sm: 6 },
                pr: 2,
              }}
            >
              <MarketMoverChart
                data={indexData.latest}
                sectorData={sectorData[0]}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: { xs: 4, sm: 4 } }}>
              <GainerLoser data={gainerLoserData} />
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

          <Grid item xs={12} sm={6}>
            <News data={newsData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <TopFinancials data={topFinancialsData} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <IndexMover data={indexMover} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Beta data={beta} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Ipo data={ipo} />
          </Grid>

          <Grid item xs={12} sm={7}>
            <BlockTr data={blockTrData} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ py: 4 }}>
        <Typography
          sx={{ fontSize: ".9rem", textAlign: "center" }}
          color="text.secondary"
        >
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
      <Banner />
    </Box>
  );
}
