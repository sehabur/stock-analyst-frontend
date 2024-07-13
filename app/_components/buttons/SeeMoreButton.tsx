"use client";
import React from "react";
import { Box, useTheme, Button, useMediaQuery } from "@mui/material";
import Link from "next/link";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

export default function SeeMoreButton({ href }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ mx: 2, mt: 1.5 }}>
      <Button
        component={Link}
        href={href}
        variant={matchesSmUp ? "text" : "outlined"}
        color="warning"
        fullWidth
        endIcon={<EastRoundedIcon />}
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" },
          py: 1,
        }}
      >
        See more
      </Button>
    </Box>
  );
}
