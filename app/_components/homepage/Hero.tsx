"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { visuallyHidden } from "@mui/utils";

export default function Hero() {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          pt: { xs: 5, sm: 2 },
          pb: { xs: 4, sm: 8 },
        }}
      >
        <Box
          id="image"
          sx={(theme) => ({
            mx: 2,
            my: 3,
            maxWidth: { xs: 400, sm: 600 },
            height: { xs: 220, sm: 350 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/images/homepage/hero-market-light.PNG")'
                : 'url("/images/homepage/hero-market-dark.PNG")',
            backgroundSize: "cover",
            borderRadius: "12px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? "hsla(220, 25%, 80%, 0.5)"
                : "hsla(210, 100%, 80%, 0.1)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 0 12px 8px hsla(220, 25%, 80%, 0.5)"
                : "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
          })}
        />
        <Box
          id="image"
          sx={(theme) => ({
            mx: 2,
            my: 3,
            maxWidth: { xs: 400, sm: 600 },
            height: { xs: 220, sm: 350 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/images/homepage/hero-stock-light.PNG")'
                : 'url("/images/homepage/hero-stock-dark.PNG")',
            backgroundSize: "cover",
            borderRadius: "12px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? "hsla(220, 25%, 80%, 0.5)"
                : "hsla(210, 100%, 80%, 0.1)",
            boxShadow:
              theme.palette.mode === "light"
                ? "0 0 12px 8px hsla(220, 25%, 80%, 0.5)"
                : "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
          })}
        />
      </Container>
    </Box>
  );
}
