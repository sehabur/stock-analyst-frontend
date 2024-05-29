"use client";
import {
  calculateEma,
  calculateSma,
  calculateSmaLastValue,
  calculateEmaLastValue,
  calculateRsiLastValue,
  calculateRsi,
  calculateStochasticK,
  calculateAdx,
  calculateMacd,
  calculateWilliamsPercentR,
  calculateMoneyFlowIndex,
  calculateStochasticKLastValue,
  calculateAdxLastValue,
  calculateWilliamsPercentRLastValue,
  calculateMoneyFlowIndexLastValue,
  calculateMacdLastValue,
  calculatePivotPoints,
} from "_library/movingAvgCalc";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CandlestickChartTwoToneIcon from "@mui/icons-material/CandlestickChartTwoTone";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import PollRoundedIcon from "@mui/icons-material/PollRounded";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import { Box, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ScatterPlotRoundedIcon from "@mui/icons-material/ScatterPlotRounded";
import Spinner from "@/components/shared/Spinner";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { styled, alpha } from "@mui/material/styles";
import { DateTime } from "luxon";
export default function Technical(props: any) {
  const { technicals, tradingCode } = props;

  const theme: any = useTheme();

  const [data, setData] = useState<any>({});

  const [isLoading, setIsLoading] = useState(false);

  console.log(data);

  const {
    sma10,
    sma20,
    sma30,
    sma50,
    sma100,
    sma200,
    ema10,
    ema20,
    ema30,
    ema50,
    ema100,
    ema200,
    rsi,
    stoch,
    adx,
    williamR,
    mfi,
    macd,
    pivots,
  } = data;

  const getStockTechnicals = async (tradingCode: string) => {
    setIsLoading(true);

    const res: any = await fetch(`/api/technicals?code=${tradingCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const techData = await res.json();

    setIsLoading(false);
    return setData(techData);
  };

  useEffect(() => {
    getStockTechnicals(tradingCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const prices = data.map((item: any) => item.ltp);
  // const lows = data.map((item: any) => item.low);
  // const highs = data.map((item: any) => item.high);
  // const volumes = data.map((item: any) => item.volume);

  // const sma10 = calculateSmaLastValue(prices, 10);
  // const sma20 = calculateSmaLastValue(prices, 20);
  // const sma30 = calculateSmaLastValue(prices, 30);
  // const sma50 = calculateSmaLastValue(prices, 50);
  // const sma100 = calculateSmaLastValue(prices, 100);
  // const sma200 = calculateSmaLastValue(prices, 200);

  // const ema10 = calculateEmaLastValue(prices, 10);
  // const ema20 = calculateEmaLastValue(prices, 20);
  // const ema30 = calculateEmaLastValue(prices, 30);
  // const ema50 = calculateEmaLastValue(prices, 50);
  // const ema100 = calculateEmaLastValue(prices, 100);
  // const ema200 = calculateEmaLastValue(prices, 200);

  // const rsi = calculateRsiLastValue(prices);
  // const stoch = calculateStochasticKLastValue(prices);
  // const adx = calculateAdxLastValue(highs, lows, prices);
  // const williamR = calculateWilliamsPercentRLastValue(highs, lows, prices);
  // const mfi = calculateMoneyFlowIndexLastValue(highs, lows, prices, volumes);
  // const macd = calculateMacdLastValue(prices);
  // const lastPrice = data.slice(-1)[0];

  // const pivots = calculatePivotPoints(
  //   lastPrice.high,
  //   lastPrice.low,
  //   lastPrice.ltp
  // );

  // const rsi = calculateRsi(prices.slice(0, 30));
  // const stoch = calculateStochasticK(prices);
  // const adx = calculateAdx(highs, lows, prices);
  // const williamR = calculateWilliamsPercentR(highs, lows, prices);
  // const mfi = calculateMoneyFlowIndex(highs, lows, prices, volumes);
  // const macd = calculateMacd(prices);

  // console.log(prices, rsi, stoch, adx, williamR, mfi, macd, lastPrice, pivots);

  return (
    <Box
      sx={{
        maxWidth: "1250px",
        mx: "auto",
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 12 },
        px: 2,
      }}
    >
      <Grid
        container
        rowSpacing={8}
        columnSpacing={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={6}>
          <Box sx={{ px: { xs: 2, sm: 0 } }}>
            <CandlestickChartRoundedIcon
              color="primary"
              sx={{
                fontSize: "2.4rem",
                borderRadius: 3,
                border: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                padding: 0.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                mb: 1,
              }}
            />
            <Box>
              <Typography sx={{ fontSize: "1.3rem", color: "text.primary" }}>
                Candlestick Pattern
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "text.secondary",
                  mb: 1.5,
                  ml: 0.3,
                }}
              >
                Last 7 days
              </Typography>
            </Box>

            <Box sx={{ maxWidth: 350 }}>
              {technicals?.candlestick.length > 0 ? (
                technicals?.candlestick
                  .sort((a: any, b: any) => {
                    const date2: any = new Date(b.date);
                    const date1: any = new Date(a.date);
                    return date2 - date1;
                  })
                  .map((item: any) => (
                    <>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <InsightsRoundedIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.value}
                          secondary={DateTime.fromISO(item.date).toFormat(
                            "dd MMM, yyyy"
                          )}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              color: "text.primary",
                            },
                          }}
                        />
                      </ListItem>
                      <Divider light variant="middle" />
                    </>
                  ))
              ) : (
                <Box sx={{ mt: 3 }}>
                  <Typography color="warning.main">No patterns</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ px: { xs: 2, sm: 0 } }}>
            <SsidChartRoundedIcon
              color="primary"
              sx={{
                fontSize: "2.4rem",
                borderRadius: 3,
                border: `1.2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                padding: 0.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                mb: 1,
              }}
            />
            <Box>
              <Typography sx={{ fontSize: "1.3rem", color: "text.primary" }}>
                Chart Pattern
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "text.secondary",
                  mb: 1.5,
                  ml: 0.3,
                }}
              >
                Last 1 year
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 350 }}>
              {technicals?.patterns.length > 0 ? (
                technicals?.patterns.map((item: any) => (
                  <>
                    <ListItem sx={{ py: 0.8 }}>
                      <ListItemAvatar sx={{ mt: 1 }}>
                        <TroubleshootRoundedIcon color="success" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: "1rem",
                            color: "text.primary",
                          },
                        }}
                      />
                    </ListItem>
                    <Divider light variant="middle" />
                  </>
                ))
              ) : (
                <Box sx={{ mt: 3 }}>
                  <Typography color="warning.main">No patterns</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "1.3rem", color: "text.primary", mb: 1 }}>
            Simple Moving Averages
          </Typography>
          <TableContainer sx={{ maxWidth: 450 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      color: "text.secondary",
                      pb: 1,
                    },
                  }}
                >
                  <TableCell>NAME</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell align="left">Simple moving average (10)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma10}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Simple moving average (20)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma20}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Simple moving average (30)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma30}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Simple moving average (50)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma50}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Simple moving average (100)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma100}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Simple moving average (200)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {sma200}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "1.3rem", color: "text.primary", mb: 1 }}>
            Exponential Moving Averages
          </Typography>
          <TableContainer sx={{ maxWidth: 450 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      color: "text.secondary",
                      pb: 1,
                    },
                  }}
                >
                  <TableCell>NAME</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (10)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema10}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (20)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema20}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (30)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema30}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (50)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema50}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (100)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema100}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Exponential moving average (200)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {ema200}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "1.3rem", color: "text.primary", mb: 1 }}>
            Oscillators
          </Typography>
          <TableContainer sx={{ maxWidth: 450 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      color: "text.secondary",
                      pb: 1,
                    },
                  }}
                >
                  <TableCell>NAME</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Relative Strength Index (14)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {rsi || "--"}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Average Directional Index (14)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {adx || "--"}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Stochastic %K (14, 3, 3)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {stoch || "--"}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Money Flow Index (10)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {mfi || "--"}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">MACD Level (12, 26)</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {macd || "--"}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">
                    Williams Percent Range (14)
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {williamR || "--"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: "1.3rem", color: "text.primary", mb: 1 }}>
            Pivots
          </Typography>
          <TableContainer sx={{ maxWidth: 450 }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      color: "text.secondary",
                      pb: 1,
                    },
                  }}
                >
                  <TableCell>NAME</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell align="left">Support 3</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.S3}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Support 2</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.S2}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Support 1</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.S1}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Pivot point</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.P}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Resistance 1</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.R1}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Resistance 2</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.R2}
                  </TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell align="left">Resistance 3</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {pivots?.R3}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
