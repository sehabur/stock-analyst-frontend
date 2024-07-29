import React from "react";

import { Box, Button, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import View from "./View";
import Link from "next/link";

export default function Page({ searchParams }: any) {
  const { id } = searchParams;

  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "80vh" }}
    >
      <Box
        sx={{
          maxWidth: { sm: "550px" },
          mx: "auto",
          pt: 3,
          px: 2,
          pb: 6,
        }}
      >
        <Box>
          <Button
            variant="text"
            startIcon={<ArrowBackRoundedIcon />}
            component={Link}
            href="/portfolio"
          >
            Go back
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar>
            <ShoppingCartRoundedIcon />
          </Avatar>
          <Typography
            variant="h1"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: "1.5rem",
              fontWeight: 500,
              mt: 2,
              mb: 3,
            }}
          >
            Portfolio details
          </Typography>
        </Box>
        <Box sx={{ minWidth: { xs: "90vw", sm: 450 } }}>
          <View id={id} />
        </Box>
      </Box>
    </Box>
  );
}
