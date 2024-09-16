"use client";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

import { Box, Paper, Chip, Typography, Stack, styled } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const colors = ["#00A25B", "#2962ff", "#f23645"];

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#f23645",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#00A25B",
  },
}));

const getType = (
  item: { ltp: number },
  prevItem: { ltp: number; type: string },
  lastType: string
) => {
  if (item.ltp > prevItem.ltp) {
    return {
      type: "Buy",
      color: colors[0],
    };
  } else if (item.ltp < prevItem.ltp) {
    return {
      type: "Sell",
      color: colors[2],
    };
  } else if (item.ltp === prevItem.ltp) {
    return {
      type: lastType,
      color: colors[1],
    };
  }
};

const formatData = (data: any) => {
  let rows = [];
  let lastType = "";
  let totalSell = 0;
  let totalBuy = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (i > 0) {
      const prevItem = data[i - 1];

      const typeValue: any = getType(item, prevItem, lastType);

      const value = {
        id: i,
        time: DateTime.fromISO(item.time).toFormat("HH:mm"),
        timeIso: DateTime.fromISO(item.time),
        ltp: item.ltp,
        value: Number((item.value - prevItem.value).toFixed(3)),
        volume: Number((item.volume - prevItem.volume).toFixed(2)),
        trade: Number((item.trade - prevItem.trade).toFixed(2)),
        type: typeValue.type,
        color: typeValue.color,
      };
      if (typeValue.type === "Buy") {
        totalBuy += value.volume;
      } else if (typeValue.type === "Sell") {
        totalSell += value.volume;
      }

      lastType = typeValue.type;
      rows.push(value);
    } else {
      const value = {
        id: i,
        time: DateTime.fromISO(item.time).toFormat("HH:mm"),
        ltp: item.ltp,
        value: item.value,
        volume: item.volume,
        trade: item.trade,
        type: "",
        color: colors[1],
      };
      lastType = "";
      rows.push(value);
    }
  }
  rows.sort((a, b) => b.id - a.id);

  const lastTrade: any = rows.filter((item) => item.volume !== 0)[0];

  return {
    rows,
    totalBuy,
    totalSell,
    lastTrade,
  };
};

export default function MarketDepth(props: any) {
  const { data, tradingCode, marketOpenStatus } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [marketDepthData, setMarketDepthData] = useState<any>();

  const { rows, totalBuy, totalSell, lastTrade } = formatData(data);

  const getData = async () => {
    try {
      if (marketOpenStatus === "Closed") {
        setMarketDepthData(null);
        return;
      }
      setIsLoading(true);

      const res = await fetch(`/api/market-depth?code=${tradingCode}`, {
        next: { revalidate: 0 },
      });
      const initdata = await res.json();

      setMarketDepthData(initdata);
      setIsLoading(false);
    } catch (error) {
      setMarketDepthData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        pt: 4,
        pb: 6,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1250px",
        mx: "auto",
      }}
    >
      <LoadingSpinner open={isLoading} />
      {marketOpenStatus !== "Closed" && (
        <Box sx={{ mb: 6, mr: { xs: 0, sm: 8 } }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ px: 1.2 }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  mb: 1,
                  color: "text.primary",
                }}
              >
                Buyer
              </Typography>
              <TableContainer
                component={Paper}
                elevation={8}
                sx={{ borderRadius: 1 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        ".MuiTableCell-head": {
                          fontSize: ".8rem",
                          bgcolor: "#00A25B",
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>PRICE</TableCell>
                      <TableCell>VOLUME</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketDepthData?.buy?.data.map(
                      (item: any, index: number) => (
                        <TableRow
                          hover={true}
                          sx={{
                            backgroundColor: "#00A25B0a",
                            ".MuiTableCell-root": {
                              color: "#00A25B",
                            },
                          }}
                          key={index}
                        >
                          <TableCell>{item[0].toFixed(1)}</TableCell>
                          <TableCell>{item[1]}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ px: 1.2 }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  mb: 1,
                  color: "text.primary",
                }}
              >
                Seller
              </Typography>
              <TableContainer
                component={Paper}
                elevation={8}
                sx={{ borderRadius: 1 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        ".MuiTableCell-head": {
                          fontSize: ".8rem",
                          bgcolor: "#f23645",
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>PRICE</TableCell>
                      <TableCell>VOLUME</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketDepthData?.sell?.data.map(
                      (item: any, index: number) => (
                        <TableRow
                          hover={true}
                          sx={{
                            backgroundColor: "#f236450a",
                            ".MuiTableCell-root": {
                              color: "#f23645",
                            },
                          }}
                          key={index}
                        >
                          <TableCell>{item[0]}</TableCell>
                          <TableCell>{item[1]}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box sx={{ width: "95%", mx: "auto", pt: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pb: 1,
              }}
            >
              <Box>
                <Typography color="text.primary">Total buyer:</Typography>
                <Typography color="text.primary">
                  {marketDepthData?.buy?.totalVolume} @ Avg{" "}
                  {marketDepthData?.buy?.avgPrice}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography color="text.primary">Total seller:</Typography>
                <Typography color="text.primary">
                  {marketDepthData?.sell?.totalVolume} @ Avg{" "}
                  {marketDepthData?.sell?.avgPrice}
                </Typography>
              </Box>
            </Box>
            <StyledLinearProgress
              variant="determinate"
              value={marketDepthData?.buyPercent}
              color="primary"
            />
          </Box>
        </Box>
      )}

      <Box sx={{ width: { xs: "90vw", sm: 600 } }}>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 3 }}
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Chip
            label={`Total Buy: ${totalBuy}`}
            icon={<TrendingUpRoundedIcon color="success" />}
            sx={{
              color: "success.main",
              borderRadius: 1,
              fontSize: "1rem",
              py: 2.5,
            }}
          />
          <Chip
            label={`Total Sell: ${totalSell}`}
            icon={<TrendingDownRoundedIcon color="error" />}
            sx={{
              color: "error.main",
              borderRadius: 1,
              fontSize: "1rem",
              py: 2.5,
            }}
          />
        </Stack>
        <TableContainer
          component={Paper}
          elevation={0}
          variant="outlined"
          sx={{ borderRadius: 1, maxHeight: { xs: 500, sm: 450 }, mx: 1 }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  ".MuiTableCell-head": {
                    py: 1,
                  },
                }}
              >
                <TableCell>TIME</TableCell>
                <TableCell>TYPE</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>VOLUME</TableCell>
                <TableCell>VALUE (MN)</TableCell>
                <TableCell>TRADE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row: any) => row.volume !== 0)
                .map((row: any) => (
                  <TableRow
                    hover={true}
                    sx={{
                      backgroundColor: row.color + "0a",
                      ".MuiTableCell-root": {
                        color: row.color,
                      },
                    }}
                    key={row.id}
                  >
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.ltp}</TableCell>
                    <TableCell>{row.volume}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.trade}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
