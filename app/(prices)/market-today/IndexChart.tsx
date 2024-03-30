"use client";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import AreaChart from "@/components/charts/AreaChart";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";

import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    marginRight: "24px",
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "16px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "20px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "20px",
  },
  // color: theme.palette.primary.main,
  fontSize: ".9rem",
  textTransform: "none",
}));

const dseMap = [
  {
    tag: "dsex",
    title: "DSEX",
  },
  {
    tag: "dses",
    title: "DSES",
  },
  {
    tag: "dse30",
    title: "DSE30",
  },
];

const formatChartData = (data: any) => {
  let dsex = [];
  let dses = [];
  let dse30 = [];

  for (let item of data) {
    const plotTime = DateTime.fromISO(item.time)
      .plus({ hours: 6 })
      .toUnixInteger();

    item.dsex.index !== 0 &&
      dsex.push({
        time: plotTime,
        value: item.dsex.index,
      });
    item.dses.index !== 0 &&
      dses.push({
        time: plotTime,
        value: item.dses.index,
      });
    item.dse30.index !== 0 &&
      dse30.push({
        time: plotTime,
        value: item.dse30.index,
      });
  }
  return { dsex, dses, dse30 };
};

export default function IndexChart({ indexData }: any) {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [alignment, setAlignment] = React.useState("dsex");

  const data = { change: 0 };

  const chartColor =
    indexData?.latest[alignment].change === 0
      ? "#5381ff"
      : indexData?.latest[alignment].change < 0
      ? "#f45e6a"
      : "#00A25B";

  const textColor =
    indexData?.latest[alignment].change === 0
      ? "#2962ff"
      : indexData?.latest[alignment].change < 0
      ? "#f23645"
      : "#00A25B";

  const changeLabel = () => {
    const data = indexData?.latest[alignment].change.toFixed(2);
    const sign = data > 0 ? "+" : "";
    return sign + data;
  };

  const percenChangeLabel = () => {
    const data = indexData?.latest[alignment].percentChange.toFixed(2);
    const sign = data > 0 ? "+" : "";
    return sign + data + "%";
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const chartData: any = formatChartData(indexData.minute);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          {dseMap.map((item) => (
            <StyledToggleButton value={item.tag} key={item.tag} sx={{ px: 2 }}>
              {item.title}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Box>

      <Grid
        container
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
        sx={{
          // display: "flex",
          // flexDirection: "row",
          // flexWrap: "wrap",
          // alignItems: "center",
          // justifyContent: "space-around",
          mt: { xs: 1, sm: 2 },
        }}
      >
        <Grid item xs={12} sm={6}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.4rem" },
                color: textColor,
                fontWeight: 700,
              }}
            >
              {indexData?.latest[alignment].index.toFixed(2)}
            </Typography>
            <Chip
              label={changeLabel()}
              size="small"
              sx={{
                borderRadius: 1,
                mx: { xs: 1, sm: 2 },
                mt: 0.3,
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 700,
                color: textColor,
              }}
            />
            <Chip
              label={percenChangeLabel()}
              size="small"
              sx={{
                borderRadius: 1,
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 700,
                color: textColor,
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ mt: { xs: 0.5, sm: 0 } }}
          >
            <Box
              sx={{
                display: { xs: "flex", sm: "block" },
                alignItems: "baseline",
              }}
            >
              <Typography color="text.secondary">Last update</Typography>
              <Typography color="text.primary" sx={{ ml: { xs: 1, sm: 0 } }}>
                {DateTime.fromISO(indexData.latest.time).toFormat(
                  "dd MMM, HH:mm"
                )}
              </Typography>
            </Box>
            <Tooltip
              title={
                indexData.isMarketOpen
                  ? "Market is open now"
                  : "Market is close now"
              }
            >
              <Chip
                label={indexData.isMarketOpen ? "Open" : "Closed"}
                variant="outlined"
                size={matchesSmUp ? "medium" : "small"}
                icon={
                  indexData.isMarketOpen ? (
                    <RadioButtonCheckedRoundedIcon color="success" />
                  ) : (
                    <DoDisturbOnRoundedIcon color="error" />
                  )
                }
                sx={{ fontSize: ".9rem" }}
              />
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <AreaChart
          data={chartData[alignment]}
          color={chartColor}
          height={280}
          tooltipTitle={`${
            dseMap.find((item) => item.tag === alignment)?.title
          } Index`}
          chartWidthValue={645}
        />
      </Box>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          py: 1.5,
          px: 2,
          mx: { xs: 0, sm: 2 },
          mt: 3,
          borderRadius: 2,
          bgcolor: "financePageBgcolor",
        }}
      >
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".875rem" }}>
            VOLUME
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.7rem" }, fontWeight: 700 }}
            >
              {(indexData?.latest.totalVolume / 10000000)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 1, fontSize: ".875rem" }}
            >
              Crore
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".875rem" }}>
            VALUE
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.7rem" }, fontWeight: 700 }}
            >
              {(indexData?.latest.totalValue / 10)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 1, fontSize: ".875rem" }}
            >
              Crore
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".875rem" }}>
            TRADE
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.7rem" }, fontWeight: 700 }}
            >
              {indexData?.latest.totalTrade?.toFixed(0)}
            </Typography>
            {/* <Typography color="text.secondary" sx={{ ml: 1, fontSize: ".875rem" }}>
              Crore
            </Typography> */}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
