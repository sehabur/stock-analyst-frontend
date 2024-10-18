import { Box } from "@mui/material";

import SharePrice from "./SharePrice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Prices | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) shares helping you find the perfect trade.",
};

export default async function Page() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { xs: "100vw", sm: "1475px" },
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <SharePrice />
      </Box>
    </Box>
  );
}
