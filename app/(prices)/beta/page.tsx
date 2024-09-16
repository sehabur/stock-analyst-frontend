import { Box } from "@mui/material";
import Dashboard from "./Dashboard";
import { Metadata } from "next";

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/allStockBeta?type=all`,
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
  title: "Beta Analysis of DSE Shares - Stocksupporter",
  description:
    "Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
};

export default async function IndexMover() {
  const data = await getData();

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Dashboard data={data} />
    </Box>
  );
}
