"use client";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const calcPercentChange = (current: any, previous: any) => {
  if (!previous) {
    return {
      text: "-",
      color: "",
    };
  }
  const stockchanged = current === 0 ? false : true;
  const change = stockchanged ? ((current - previous) / previous) * 100 : 0;

  return {
    text: (change === 0 ? change : change.toFixed(2)) + "%",
    color: change === 0 ? "#2962ff" : change < 0 ? "#f45e6a" : "#00A25B",
  };
};

const formatPercentChangeData = (latestdata: any, lastdaydata: any) => {
  return {
    today: calcPercentChange(latestdata?.ltp, latestdata?.ycp),
    oneWeek: calcPercentChange(latestdata?.ltp, lastdaydata?.oneWeekBeforeData),
    oneMonth: calcPercentChange(
      latestdata?.ltp,
      lastdaydata?.oneMonthBeforeData
    ),
    sixMonth: calcPercentChange(
      latestdata?.ltp,
      lastdaydata?.sixMonthBeforeData
    ),
    oneYear: calcPercentChange(latestdata?.ltp, lastdaydata?.oneYearBeforeData),
    fiveYear: calcPercentChange(
      latestdata?.ltp,
      lastdaydata?.fiveYearBeforeData
    ),
  };
};

export default function Overview({ data }: any) {
  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const percentChangeData = formatPercentChangeData(
    data?.latest,
    data?.lastDay
  );

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          my: 6,
          mx: { xs: 0, sm: 4 },
          py: { xs: 1.5, sm: 3 },
          px: 2,
          borderRadius: 2,
          bgcolor: "secondaryBackground",
        }}
        elevation={0}
        // variant="outlined"
      >
        <Box
          sx={{
            mx: { xs: 2, sm: 4 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            Today
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.today.color,
            }}
          >
            {percentChangeData.today.text}
          </Typography>
        </Box>
        {!matchesSmDown && (
          <Divider orientation="vertical" flexItem variant="middle" />
        )}
        <Box
          sx={{
            mx: { xs: 2, sm: 6 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            1 Week
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.oneWeek.color,
            }}
          >
            {percentChangeData.oneWeek.text}
          </Typography>
        </Box>
        {!matchesSmDown && (
          <Divider orientation="vertical" flexItem variant="middle" />
        )}
        <Box
          sx={{
            mx: { xs: 2, sm: 6 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            1 Month
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.oneMonth.color,
            }}
          >
            {percentChangeData.oneMonth.text}
          </Typography>
        </Box>
        {!matchesSmDown && (
          <Divider orientation="vertical" flexItem variant="middle" />
        )}
        <Box
          sx={{
            mx: { xs: 2, sm: 6 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            6 Month
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.sixMonth.color,
            }}
          >
            {percentChangeData.sixMonth.text}
          </Typography>
        </Box>
        {!matchesSmDown && (
          <Divider orientation="vertical" flexItem variant="middle" />
        )}
        <Box
          sx={{
            mx: { xs: 2, sm: 6 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            1 Year
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.oneYear.color,
            }}
          >
            {percentChangeData.oneYear.text}
          </Typography>
        </Box>
        {!matchesSmDown && (
          <Divider orientation="vertical" flexItem variant="middle" />
        )}
        <Box
          sx={{
            mx: { xs: 2, sm: 6 },
            my: { xs: 1, sm: 0 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            5 Year
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: percentChangeData.fiveYear.color,
            }}
          >
            {percentChangeData.fiveYear.text}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
