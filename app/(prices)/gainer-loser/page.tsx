import { Box } from "@mui/material";
import Dashboard from "./Dashboard";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Top Shares | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Get top shares by gain, value, volume, trade etc of Dhaka Stock Exchange (DSE) helping you find the perfect trade.",
};

export default async function GainerLooser() {
  const data = await getData();

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Dashboard initialdata={data} />
    </Box>
  );
}
