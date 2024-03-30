import { Box, Grid } from "@mui/material";
import Gainers from "./Gainers";
import TradingviewChart from "./TradingviewChart";

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

export default async function Page() {
  const gainerLoserData = await getGainerLoserData();
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",

        display: "flex",
        height: "90vh",
      }}
    >
      <TradingviewChart />
      <Box sx={{ width: 260 }}>
        <Gainers data={gainerLoserData} />
      </Box>
    </Box>
  );
}
