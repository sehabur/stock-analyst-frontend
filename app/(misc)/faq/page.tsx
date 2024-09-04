import { Box, Typography } from "@mui/material";
import FAQ from "./FAQ";

export default async function FaqPage() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { sm: "1080px" },
          mx: "auto",
          py: 2,
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h1"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: "1.6rem",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Frequently asked questions
          </Typography>
        </Box>
        <Box>
          <FAQ />
        </Box>
      </Box>
    </Box>
  );
}
