"use client";
import * as React from "react";
import { DateTime } from "luxon";
import Link from "next/link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, Paper } from "@mui/material";
import SummaryCard from "./SummaryCard";

export default function BlockTransection({ data, summary, date }: any) {
  return (
    <Box
      sx={{
        maxWidth: "1020px",
        mx: "auto",
        py: 4,
      }}
    >
      <Box>
        <SummaryCard summary={summary} date={date} />
      </Box>
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
                  fontSize: "1rem",
                  fontWeight: 700,
                  pb: 1.5,
                },
              }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Trading Code</TableCell>
              <TableCell>Value (Mn)</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Trades</TableCell>
              <TableCell>Max Price</TableCell>
              <TableCell>Min Price</TableCell>
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
                <TableCell component="th" scope="row" sx={{ minWidth: 90 }}>
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
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.trades}</TableCell>
                <TableCell>{row.maxPrice}</TableCell>
                <TableCell>{row.minPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
