"use client";
import * as React from "react";

import Link from "next/link";
import AreaChart from "@/components/charts/AreaChart";
import { DateTime } from "luxon";

import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
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
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    marginRight: "14px",
    marginLeft: "14px",
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "4px !important",
    marginRight: "10px",
    marginLeft: "10px",
    border: `1px solid #2962ff !important`,
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "3px",
    paddingBottom: "3px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.primary.main,
    },
  },
  fontSize: ".875rem",
  color: theme.palette.primary.main,
}));

const dseMap = [
  {
    tag: "dsex",
    title: "DSEX",
    tradingCode: "00DSEX",
  },
  {
    tag: "dses",
    title: "DSES",
    tradingCode: "00DSES",
  },
  {
    tag: "dse30",
    title: "DS30",
    tradingCode: "00DS30",
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

  const [currentIndex, setCurrentIndex] = React.useState({
    tag: "dsex",
    title: "DSEX",
    tradingCode: "00DSEX",
  });

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
      const current: any = dseMap.find(
        (item: any) => item.tag === newAlignment
      );
      setCurrentIndex(current);
    }
  };

  const chartData: any = formatChartData(indexData.minute);

  return (
    <Paper
      elevation={0}
      // variant="outlined"
      sx={{
        px: 2,
        pt: 1,
        pb: 1,
        bgcolor: "background.default",
        borderRadius: 3,
      }}
    >
      <Button
        component={Link}
        href={`/index-details/${currentIndex.tradingCode}`}
        color="primary"
        endIcon={<ChevronRightRoundedIcon />}
        sx={{
          fontSize: "1.2rem",
          fontWeight: 700,
          ":hover": {
            bgcolor: "transparent",
            color: "primary.main",
            textDecoration: "underline",
          },
          mt: 0.5,
          ml: { xs: -1, sm: 1.5 },
        }}
      >
        {currentIndex.title} Index
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
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
        sx={{ maxWidth: 730 }}
      >
        <Grid item xs={12} sm={6}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              ml: { xs: 0, sm: 2.5 },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem" },
                color: textColor,
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
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
                py: 1.8,
                fontSize: "1rem",
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 800,
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
                fontWeight: 800,
                fontFamily: "'Nunito Sans', sans-serif",
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
              title={`Market is ${indexData.marketOpenStatus.toLowerCase()} now`}
              enterTouchDelay={10}
              arrow
            >
              <Chip
                label={indexData.marketOpenStatus}
                // variant="outlined"
                size={matchesSmUp ? "medium" : "small"}
                icon={
                  indexData.marketOpenStatus == "Open" ? (
                    <RadioButtonCheckedRoundedIcon color="success" />
                  ) : indexData.marketOpenStatus == "Closed" ? (
                    <DoDisturbOnRoundedIcon color="error" />
                  ) : (
                    <DoDisturbOnRoundedIcon color="warning" />
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
          chartWidthValue={645}
        />
      </Box>
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          pt: 2,
          pb: 1.5,
          px: 2,
          mx: { xs: 0, sm: 3 },
          mt: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: "marketVolumeCard",
          maxWidth: 640,
        }}
      >
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".875rem" }}>
            VOLUME
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.7rem" },
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {(indexData?.latest.totalVolume / 10000000)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 1, fontSize: ".875rem" }}
            >
              {matchesSmUp ? "CRORE" : "CR"}
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
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.7rem" },
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {(indexData?.latest.totalValue / 10)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 1, fontSize: ".875rem" }}
            >
              {matchesSmUp ? "CRORE" : "CR"}
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
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.7rem" },
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {indexData?.latest.totalTrade?.toFixed(0)}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
}
