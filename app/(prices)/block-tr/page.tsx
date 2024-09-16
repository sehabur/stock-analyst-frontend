import { Box, Typography } from "@mui/material";
import BlockTransection from "./BlockTransection";
import { Metadata } from "next";

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

function getBlockTrSummary(data: any) {
  let quantity = 0;
  let value = 0;
  let trades = 0;
  let scripts = 0;
  for (let row of data) {
    quantity += row.quantity;
    value += row.value;
    trades += row.trades;
    scripts++;
  }
  return {
    quantity,
    value,
    trades,
    scripts,
  };
}

export const metadata: Metadata = {
  title: "Block Transections of DSE Shares - Stocksupporter",
  description:
    "Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
};

export default async function BlockTr() {
  const data = await getBlockTr();

  const summary = getBlockTrSummary(data);

  const date = data.length > 0 && data[0]?.date;

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { sm: "1280px" },
          mx: "auto",
          py: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            textAlign: "center",
            mt: 2,
          }}
        >
          Block Transections
        </Typography>
        <BlockTransection data={data} summary={summary} date={date} />
      </Box>
    </Box>
  );
}
