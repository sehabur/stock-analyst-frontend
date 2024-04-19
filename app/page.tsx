import Banner from "./_components/homepage/Banner";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider/Divider";
import Hero from "./_components/homepage/Hero";
import Highlights from "./_components/homepage/Highlights";
import Pricing from "./_components/homepage/Pricing";
import FAQ from "./_components/homepage/FAQ";

export default function Home() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Banner />
      <Hero />
      <Divider />
      <Highlights />
      <Divider />
      <Pricing />
      <Divider />
      <FAQ />
    </Box>
  );
}
