import { Box, Typography } from "@mui/material";
import News from "./News";
import { Metadata } from "next";

const getNews = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/news/all?limit=2500`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const metadata: Metadata = {
  title: "Latest News | Dhaka Stock Exchange (DSE) - Stocksupporter",
  description:
    "Get finacial data and prepared analytics for Dhaka Stock Exchange (DSE) stocks helping you find the perfect trade.",
};

export default async function LatestNews() {
  const data = await getNews();
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { sm: "1280px" },
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.7rem" },
            fontWeight: 500,
            textAlign: "center",
            mt: 2,
          }}
        >
          Latest share market news
        </Typography>
        <News data={data} />
      </Box>
    </Box>
  );
}
