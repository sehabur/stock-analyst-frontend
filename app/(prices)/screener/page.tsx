import { Box } from "@mui/material";
import Main from "./Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screen stocks | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Best screener for filtering stocks of Dhaka Stock Exchange (DSE) helping you find the perfect trade.",
};

export default async function Screener() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Main />
    </Box>
  );
}
