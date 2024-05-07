import { aboutus } from "@/data/info";
import { Box, Typography } from "@mui/material";

export default async function Terms() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { sm: "750px" },
          mx: "auto",
          py: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          color="text.primary"
          gutterBottom
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            textAlign: "center",
            mt: 2,
          }}
        >
          About us
        </Typography>

        <Box
          sx={{
            bgcolor: "gainerCardMobileView",
            color: "text.primary",
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 4 },
            my: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontSize: "1rem",
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            {aboutus}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
