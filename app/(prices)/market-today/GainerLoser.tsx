"use client";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GainerCard from "@/components/cards/GainerCard";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";

import { grey, blueGrey } from "@mui/material/colors";

// const dataFormatter = (inputdata: any, dataPointKey: string, type: string) => {
//   const data = inputdata.slice(0, 10);
//   let dataPoints: number[] = [];
//   let categories: string[] = [];
//   for (let item of data) {
//     categories.push(item.tradingCode);
//     dataPoints.push(item[dataPointKey]);
//   }
//   return { dataPoints, categories, type };
// };

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
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function GainerLoser({ data }: any) {
  const theme = useTheme();

  const [alignmentGainer, setAlignmentGainer] = useState("gainerDaily");
  const [alignmentLoser, setAlignmentLoser] = useState("loserDaily");

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
    <Box sx={{ px: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={{ xs: 6, sm: 12 }}
      >
        <Grid item xs={12} sm={6}>
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
              mt: 2,
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
              <StyledToggleButton value="gainerDaily" sx={{ px: 2 }}>
                Gainer
              </StyledToggleButton>
              <StyledToggleButton value="gainerVolume" sx={{ px: 2 }}>
                Volume
              </StyledToggleButton>
              <StyledToggleButton value="gainerValue" sx={{ px: 2 }}>
                Value
              </StyledToggleButton>
              <StyledToggleButton value="gainerTrade" sx={{ px: 2 }}>
                Trade
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
          {dataFormatter(data[alignmentGainer]).map((item: any) => (
            <GainerCard item={item} key={item.id} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
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
            Stock Loser
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
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
              <StyledToggleButton value="loserDaily" sx={{ px: 2 }}>
                Loser
              </StyledToggleButton>
              <StyledToggleButton value="loserVolume" sx={{ px: 2 }}>
                Volume
              </StyledToggleButton>
              <StyledToggleButton value="loserValue" sx={{ px: 2 }}>
                Value
              </StyledToggleButton>
              <StyledToggleButton value="loserTrade" sx={{ px: 2 }}>
                Trade
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
          {dataFormatter(data[alignmentLoser]).map((item: any) => (
            <GainerCard item={item} key={item.id} />
          ))}
        </Grid>

        {/* <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              Daily top gainer
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=gainer&variant=1d"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.success.main}
            data={dataFormatter(data.gainerDaily, "percentChange", "Daily")}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              Yearly top gainer
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=gainer&variant=1y"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.success.main}
            data={dataFormatter(
              data.gainerOneYear,
              "oneYearPercentChange",
              "Yearly"
            )}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              All time top gainer
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              Daily top loser
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=loser&variant=1d"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>

          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.main}
            data={dataFormatter(data.loserDaily, "percentChange", "Daily")}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              Yearly top loser
            </Typography>
            <Button
              component={Link}
              endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
              href="gainer-loser?type=loser&variant=1y"
              sx={{ borderRadius: 6, px: 2 }}
            >
              Explore all
            </Button>
          </Box>
          <HorizontalBarChart
            textColor={theme.palette.text.primary}
            barColor={theme.palette.error.main}
            data={dataFormatter(
              data.loserOneYear,
              "oneYearPercentChange",
              "Yearly"
            )}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{ bgcolor: "background.default", pl: 1, px: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography
              sx={{ pl: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              color="text.secondary"
            >
              All time top loser
            </Typography>
          </Box>
        </Paper>
      </Grid> */}
      </Grid>
    </Box>
  );
}
