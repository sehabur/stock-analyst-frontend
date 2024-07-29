"use client";
import React from "react";
import { Box, useTheme, Button, useMediaQuery } from "@mui/material";
import Link from "next/link";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

export default function SeeMoreButton({ href }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        mt: 1,
        mr: { xs: 1, sm: 0 },
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        component={Link}
        href={href}
        color="primary"
        endIcon={<EastRoundedIcon />}
        sx={{
          fontSize: "1rem",
          py: 1,
          ":hover": {
            bgcolor: "transparent",
          },
        }}
      >
        See more
      </Button>
    </Box>
  );
}
