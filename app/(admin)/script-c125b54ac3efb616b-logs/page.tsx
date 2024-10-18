import React from "react";

import { Box, Card, Paper, Typography } from "@mui/material";
import Logs from "./Logs";

const getNews = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/admin/check/66bb089882e8340979ccfdf9/script/log`,
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
  const data = await getNews();

  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh", px: 2, py: 1 }}
    >
      <Logs data={data} />
    </Box>
  );
}
