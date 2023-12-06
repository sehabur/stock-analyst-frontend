'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
} from '@mui/material';
import { DateTime } from 'luxon';

export default function BlockTransection({ data }: any) {
  return (
    <Box
      sx={{ maxWidth: '880px', mx: 'auto', py: 4, px: 2, overflow: 'hidden' }}
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ border: 'none' }}
      >
        <Table sx={{ minWidth: 560 }} size="small" stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                '.MuiTableCell-head': { fontSize: '1rem', fontWeight: 700 },
              }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Trading Code</TableCell>
              <TableCell align="right">Trades</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Value(Cr)</TableCell>
              <TableCell align="right">Max price</TableCell>
              <TableCell align="right">Min price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {DateTime.fromISO(row.date).toFormat('dd MMM')}
                </TableCell>
                <TableCell align="left">{row.tradingCode}</TableCell>
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
