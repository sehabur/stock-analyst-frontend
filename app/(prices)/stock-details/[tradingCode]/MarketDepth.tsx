"use client";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { DateTime } from "luxon";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { grey } from "@mui/material/colors";
import ReactTimeAgo from "react-time-ago";

const colors = ["#00A25B", "#2962ff", "#f23645"];

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
        value: Number((item.value - prevItem.value).toFixed(2)),
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

  console.log(lastTrade);

  return {
    rows,
    totalBuy,
    totalSell,
    lastTrade,
  };
};

export default function Trades(props: any) {
  const { data } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { rows, totalBuy, totalSell, lastTrade } = formatData(data);

  console.log(rows);

  const handleClick = () => {
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ pt: 1, pb: 6 }}>
      <Box sx={{ maxWidth: "650px", mx: "auto", py: 2 }}>
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
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">VOLUME</TableCell>
                <TableCell align="right">VALUE (mn)</TableCell>
                <TableCell align="right">TRADE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
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
                  <TableCell align="right">{row.ltp}</TableCell>
                  <TableCell align="right">{row.volume}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.trade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
