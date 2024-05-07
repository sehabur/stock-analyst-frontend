import { terms } from "@/data/info";
import { Box, Typography } from "@mui/material";

export default async function Terms() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: { sm: "1080px" },
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
          Terms of services
        </Typography>

        <Box
          sx={{
            bgcolor: "gainerCardMobileView",
            color: "text.primary",
            py: 3,
            px: 2,
            mx: 2,
            my: 2,
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
            {terms}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
