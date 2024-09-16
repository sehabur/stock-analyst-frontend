import { Box, Grid } from "@mui/material";
import Gainers from "./Gainers";
import TradingviewChart from "./TradingviewChart";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Supercharts | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Get finacial data and prepared analytics with help of advanced chart for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
};

export default async function Page() {
  const gainerLoserData = await getGainerLoserData();
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ height: { xs: 600, sm: "90vh" }, width: "100%" }}>
        <TradingviewChart />
      </Box>
      <Box
        sx={{
          width: { xs: "90vw", sm: 260 },
          mx: "auto",
          py: { xs: 2, sm: 0 },
        }}
      >
        <Gainers data={gainerLoserData} />
      </Box>
    </Box>
  );
}
