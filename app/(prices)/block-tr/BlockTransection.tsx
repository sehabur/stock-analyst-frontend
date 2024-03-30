"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  Divider,
} from "@mui/material";
import { DateTime } from "luxon";

import Link from "next/link";

export default function BlockTransection({ data }: any) {
  return (
    <Box
      sx={{ maxWidth: "1020px", mx: "auto", py: 4, px: 2, overflow: "hidden" }}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ border: "none" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  fontSize: "1.1rem",
                  fontWeight: 700,
                },
              }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Trading Code</TableCell>
              <TableCell align="right">Trades</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Value(Crore)</TableCell>
              <TableCell align="right">Max Price</TableCell>
              <TableCell align="right">Min Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row._id}
                hover={true}
                sx={{
                  ".MuiTableCell": {
                    fontSize: "1rem",
                    fontWeight: 700,
                  },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "financePageBgcolor",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {DateTime.fromISO(row.date).toFormat("dd MMM")}
                </TableCell>
                <TableCell align="left">
                  <Typography
                    component={Link}
                    href={`/stock-details/${row.tradingCode}`}
                    sx={{
                      color: "primary.main",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    {row.tradingCode}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.trades}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.maxPrice}</TableCell>
                <TableCell align="right">{row.minPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
