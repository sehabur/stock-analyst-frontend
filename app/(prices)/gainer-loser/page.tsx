import SingleBarChart from "@/components/charts/HorizontalBarChart";
import { Grid, Box } from "@mui/material";
import Dashboard from "./Dashboard";

async function getData() {
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

export default async function GainerLooser() {
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
