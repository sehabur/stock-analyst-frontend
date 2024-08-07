"use client";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Paper,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import GainerCard from "@/components/cards/GainerCard";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

import SeeMoreButton from "../buttons/SeeMoreButton";

const dataFormatter = (inputdata: any) => {
  const data = inputdata.slice(0, 6);
  return data;
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function GainerLoser({ data }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [alignmentGainer, setAlignmentGainer] = useState("gainer");
  const [alignmentLoser, setAlignmentLoser] = useState("loser");

  const handleGainerChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignmentGainer(newAlignment);
    }
  };
  const handleLoserChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignmentLoser(newAlignment);
    }
  };

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={{ xs: 6, sm: 12 }}
      >
        <Grid item xs={12} sm={6}>
          <Box sx={{ mx: { xs: 1, sm: 0 } }}>
            <Button
              component={Link}
              href="/gainer-loser?type=gainer&variant=1d"
              color="primary"
              endIcon={<ArrowForwardIosRoundedIcon />}
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                ":hover": {
                  bgcolor: "transparent",
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
            >
              Stock Gainer
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 1,
                mb: 3,
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={alignmentGainer}
                exclusive
                onChange={handleGainerChange}
                aria-label="Platform"
                sx={{ mx: 1 }}
              >
                <StyledToggleButton value="gainer" sx={{ px: 2 }}>
                  Gainer
                </StyledToggleButton>
                <StyledToggleButton value="topVolume" sx={{ px: 2 }}>
                  Volume
                </StyledToggleButton>
                <StyledToggleButton value="topValue" sx={{ px: 2 }}>
                  Value
                </StyledToggleButton>
                <StyledToggleButton value="topTrade" sx={{ px: 2 }}>
                  Trade
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </Box>
          </Box>
          {dataFormatter(data[alignmentGainer]).map((item: any) => (
            <GainerCard item={item} key={item.id} />
          ))}
          <SeeMoreButton href="/gainer-loser?type=gainer&variant=1d" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mx: { xs: 1, sm: 0 } }}>
            <Button
              component={Link}
              href="/gainer-loser?type=loser&variant=1d"
              color="primary"
              endIcon={<ArrowForwardIosRoundedIcon />}
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                ":hover": {
                  bgcolor: "transparent",
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
            >
              Stock Loser
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 1,
                mb: 3,
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={alignmentLoser}
                exclusive
                onChange={handleLoserChange}
                aria-label="Platform"
                sx={{ mx: 1 }}
              >
                <StyledToggleButton value="loser" sx={{ px: 2 }}>
                  Loser
                </StyledToggleButton>
                <StyledToggleButton value="bottomVolume" sx={{ px: 2 }}>
                  Volume
                </StyledToggleButton>
                <StyledToggleButton value="bottomValue" sx={{ px: 2 }}>
                  Value
                </StyledToggleButton>
                <StyledToggleButton value="bottomTrade" sx={{ px: 2 }}>
                  Trade
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </Box>
          </Box>
          {dataFormatter(data[alignmentLoser]).map((item: any) => (
            <GainerCard item={item} key={item.id} />
          ))}
          <SeeMoreButton href="/gainer-loser?type=loser&variant=1d" />
        </Grid>
      </Grid>
    </Box>
  );
}
