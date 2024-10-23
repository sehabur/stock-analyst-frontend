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
import { Box, Typography, Paper, Divider } from "@mui/material";
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
                  fontWeight: 600,
                  pb: 1.5,
                },
              }}
            >
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Trading Code</TableCell>
              <TableCell align="center">Value (Mn)</TableCell>
              <TableCell align="center">Volume</TableCell>
              <TableCell align="center">Trades</TableCell>
              <TableCell align="center">Max Price</TableCell>
              <TableCell align="center">Min Price</TableCell>
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
                <TableCell
                  align="left"
                  component="th"
                  scope="row"
                  sx={{ minWidth: 90 }}
                >
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
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.trades}</TableCell>
                <TableCell align="center">{row.maxPrice}</TableCell>
                <TableCell align="center">{row.minPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
