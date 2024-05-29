import { Box } from "@mui/material";
import Dashboard from "./Dashboard";

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
