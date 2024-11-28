import type { Metadata } from "next";
import { Box, Grid } from "@mui/material";

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
import Banner from "@/components/homepage/Banner";

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
    `${process.env.BACKEND_URL}/api/prices/topFinancials?setlimit=14`,
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

export const metadata: Metadata = {
  title: "Stocksupporter - Stock Analysis Tool for DSE",
  description:
    "Get financial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
  keywords: [
    "DSE",
    "DSEX",
    "DS30",
    "DSES",
    "Dhaka Stock Exchange",
    "Stocksupporter",
    "Stock supporter",
    "Bangladesh stock market",
  ],
};

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
    <Box component="main" sx={{ bgcolor: "homepageBackground" }}>
      <Box sx={{ maxWidth: "1250px", mx: "auto", pt: { xs: 0, sm: 2 } }}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={7.5}>
            <IndexChart indexData={indexData} />
          </Grid>

          <Grid item xs={12} sm={4.5}>
            <MarketMoverChart
              data={indexData.latest}
              rsi={indexData.rsi}
              sectorData={sectorData[0]}
            />
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
          <Grid item xs={12} sm={7}>
            <BlockTr data={blockTrData} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Ipo data={ipo} />
          </Grid>
        </Grid>
      </Box>
      <Banner />
    </Box>
  );
}
