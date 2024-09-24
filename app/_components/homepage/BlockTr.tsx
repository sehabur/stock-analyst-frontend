"use client";
import React from "react";
import { DateTime } from "luxon";
import Link from "next/link";

import { Box, Typography, useTheme, Paper, Button, Chip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function BlockTr({ data }: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box
      sx={{
        mx: { xs: 2, sm: 0 },
        my: { xs: 4, sm: 6 },
      }}
    >
      <TableContainer
        component={Paper}
        elevation={4}
        variant="outlined"
        sx={{ borderRadius: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 1,
            mt: 1,
          }}
        >
          <Button
            component={Link}
            href="/block-tr"
            color="primary"
            endIcon={<ArrowForwardIosRoundedIcon />}
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              fontWeight: 700,
              my: 0.5,
              ":hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Block Transections
          </Button>
          <Chip
            label={DateTime.fromISO(data[0].date).toFormat("dd MMMM, yyyy")}
            sx={{
              mr: 2,
              px: 1,
              fontSize: { xs: ".9rem", sm: "1rem" },
              mb: { xs: 2, sm: 0 },
            }}
          />
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  // fontSize: "1rem",
                  fontWeight: 500,
                  color: "text.secondary",
                },
              }}
            >
              <TableCell>TRADING CODE</TableCell>
              <TableCell align="right">VALUE (MN)</TableCell>
              <TableCell align="right">VOLUME</TableCell>
              <TableCell align="right">TRADE</TableCell>
              <TableCell align="right">MAX PRICE</TableCell>
              <TableCell align="right">MIN PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow
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
                  key={row._id}
                >
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
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.trades}</TableCell>
                  <TableCell align="right">{row.maxPrice}</TableCell>
                  <TableCell align="right">{row.minPrice}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
