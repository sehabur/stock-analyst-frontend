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
import { grey } from "@mui/material/colors";

export default function BlockTransections({ blocktr }: any) {
  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", py: 4, px: { xs: 0, sm: 2 } }}>
      <TableContainer
        component={Paper}
        sx={{ border: "none", borderRadius: 0 }}
        variant="outlined"
      >
        <Table sx={{ minWidth: 560 }} size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  // fontSize: "1rem",
                  fontWeight: 700,
                  // py: 1,
                },
              }}
            >
              <TableCell>DATE</TableCell>
              <TableCell align="right">TRADES</TableCell>
              <TableCell align="right">VOLUME</TableCell>
              <TableCell align="right">VALUE (CRORE)</TableCell>
              <TableCell align="right">MAX PRICE</TableCell>
              <TableCell align="right">MIN PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocktr.map((row: any) => (
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
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell sx={{ minWidth: 80 }}>
                  {DateTime.fromISO(row.date).toFormat("dd MMM")}
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
