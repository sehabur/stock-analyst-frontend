import { Box, Typography } from "@mui/material";
import News from "./News";

const getNews = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/news/all?limit=500`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
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
            fontSize: "1.7rem",
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
