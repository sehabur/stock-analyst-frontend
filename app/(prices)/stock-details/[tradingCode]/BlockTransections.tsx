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
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", py: 4, px: { xs: 0, sm: 2 } }}>
      <TableContainer
        component={Paper}
        // sx={{ border: "none", borderRadius: 0 }}
        variant="outlined"
      >
        <Table sx={{ minWidth: 560 }} size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  fontSize: ".9rem",
                  color: "text.secondary",
                  fontWeight: 500,
                  py: { xs: 1, sm: 1.5 },
                },
              }}
            >
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">VALUE (MN)</TableCell>
              <TableCell align="center">VOLUME</TableCell>
              <TableCell align="center">TRADES</TableCell>
              <TableCell align="center">MAX PRICE</TableCell>
              <TableCell align="center">MIN PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocktr.map((row: any) => (
              <TableRow
                key={row._id}
                hover={true}
                sx={{
                  ".MuiTableCell-body": {
                    color: "text.primary",
                    fontSize: ".875rem",
                    fontWeight: 500,
                  },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "financePageBgcolor",
                  },
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  {DateTime.fromISO(row.date).toFormat("dd-MM-yy")}
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
