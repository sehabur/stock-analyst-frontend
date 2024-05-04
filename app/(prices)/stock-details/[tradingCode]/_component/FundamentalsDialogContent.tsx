"use client";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

import { fundamentalsTooltip } from "@/data/info";
import FundamentalInfoCard from "./FundamentalInfoCard";
import YearlyStackedColumnChart from "@/components/charts/YearlyStackedColumnChart";
import QuarterlyColumnChart from "@/components/charts/QuarterlyColumnChart";
import YearlyColumnChart from "@/components/charts/YearlyColumnChart";
import LineColumnChart from "@/components/charts/LineColumnChart";

export default function FundamentalsDialogContent(props: any) {
  const {
    title,
    overview,
    quarterly,
    yearly,
    yearlyStacked,
    yearlyLineColumn,
    overviewText,
    quarterlyData,
    yearlyData,
    yearlyStackedData,
    yearlyLineColumnData,
    info,
    infoText,
    infoLink,
  } = props;

  console.log(yearlyData);

  return (
    <>
      <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>{title}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ maxWidth: "700px", mx: "auto", py: 2 }}>
          {overview && (
            <Box sx={{ mx: 2, mb: 4 }}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                Overview
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                {overviewText || "No data available"}
              </Typography>
            </Box>
          )}
          {quarterly && (
            <>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  ml: 2,
                }}
              >
                Quarterly
              </Typography>
              {quarterlyData && (
                <Box>
                  <QuarterlyColumnChart data={quarterlyData} />
                </Box>
              )}
            </>
          )}
          {yearly && (
            <>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  ml: 2,
                }}
              >
                Yearly
              </Typography>
              {yearlyData && (
                <Box>
                  <YearlyColumnChart data={yearlyData} />
                </Box>
              )}
            </>
          )}
          {yearlyStacked && (
            <>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  ml: 2,
                }}
              >
                Yearly
              </Typography>
              {yearlyStackedData && (
                <Box>
                  <YearlyStackedColumnChart data={yearlyStackedData} />
                </Box>
              )}
            </>
          )}
          {yearlyLineColumn && (
            <>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  ml: 2,
                }}
              >
                Yearly
              </Typography>
              {yearlyLineColumnData && (
                <Box>
                  <LineColumnChart data={yearlyLineColumnData} />
                </Box>
              )}
            </>
          )}
          {info && (
            <Box sx={{ mt: 2 }}>
              <FundamentalInfoCard text={infoText} href={infoLink} />
            </Box>
          )}
        </Box>
      </DialogContent>
    </>
  );
}
