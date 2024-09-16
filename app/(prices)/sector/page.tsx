import { Metadata } from "next";
import SectorSummaryCard from "./sectorCard";
import { Box } from "@mui/material";

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/sectorLatestPrice`,
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
  title: "Top Sectors | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
};

export default async function Sector() {
  const data = await getData();

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1200,
          mx: "auto",
          py: 2,
        }}
      >
        {data.map((item: { _id: string }) => (
          <SectorSummaryCard data={item} key={item._id} />
        ))}
      </Box>
    </Box>
  );
}
