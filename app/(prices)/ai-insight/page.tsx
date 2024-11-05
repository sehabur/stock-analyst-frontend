import React from "react";

import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AiGeneratedInsight from "./AiGeneratedInsight";

const getStockList = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/getStocksList`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function Page() {
  const allStockList = await getStockList();

  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box sx={{ mx: { xs: 0, sm: "auto" }, maxWidth: 1250 }}>
        <AiGeneratedInsight allStockList={allStockList} />
      </Box>
    </Box>
  );
}
