"use client";
import React from "react";

import dynamic from "next/dynamic";
import { Box, Stack, Typography, useTheme } from "@mui/material";

import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { grey } from "@mui/material/colors";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function GaugeChart({ rsi }: any) {
  const theme = useTheme();

  const colors =
    theme.palette.mode == "light"
      ? ["#E74C3C ", "#F39C12  ", "#2ECC71 "]
      : ["#C0392B  ", "#F1C40F   ", "#27AE60  "];

  const valueColor = {
    needle: theme.palette.mode == "light" ? grey[400] : grey[800],
    // text: theme.palette.mode == "light" ? grey[800] : grey[50],
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 0,
      }}
    >
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ my: 0.5 }}
        >
          <SquareRoundedIcon sx={{ color: colors[0], fontSize: ".75rem" }} />
          <Typography
            sx={{
              fontSize: ".75rem",
              color: "text.secondary",
            }}
          >
            Bear (0-40)
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ my: 0.5 }}
        >
          <SquareRoundedIcon sx={{ color: colors[1], fontSize: ".75rem" }} />
          <Typography
            sx={{
              fontSize: ".75rem",
              color: "text.secondary",
            }}
          >
            Neutral (40-60)
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ my: 0.5 }}
        >
          <SquareRoundedIcon sx={{ color: colors[2], fontSize: ".75rem" }} />
          <Typography
            sx={{
              fontSize: ".75rem",
              color: "text.secondary",
            }}
          >
            Bull (60-100)
          </Typography>
        </Stack>
      </Box>
      <GaugeComponent
        type="semicircle"
        pointer={{
          length: 0.7,
          width: 10,
          color: valueColor.needle,
        }}
        arc={{
          padding: 0.02,
          width: 0.12,
          subArcs: [
            {
              limit: 40,
              color: colors[0],
            },
            {
              limit: 60,
              color: colors[1],
            },
            {
              limit: 100,
              color: colors[2],
            },
          ],
        }}
        labels={{
          valueLabel: {
            matchColorWithArc: true,
            formatTextValue: (val) => val,
            style: {
              // fill: valueColor.text,
              fontSize: "45px",
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: "bold",
              textShadow: "none",
            },
          },
          tickLabels: {
            hideMinMax: true,
          },
        }}
        value={rsi}
      />
    </Box>
  );
}
