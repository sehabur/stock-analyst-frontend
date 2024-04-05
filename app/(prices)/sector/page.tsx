import SectorSummaryCard from "./sectorCard";
import { Box } from "@mui/material";

async function getData() {
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
