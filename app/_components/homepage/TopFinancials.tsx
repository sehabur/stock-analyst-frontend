"use client";
import React, { useState } from "react";

import Link from "next/link";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const options: any = [
  {
    header: "PE Ratio",
    button: "PE Ratio",
    tag: "pe",
  },
  {
    header: "EPS",
    button: "EPS",
    tag: "eps",
  },
  {
    header: "NAV",
    button: "NAV",
    tag: "nav",
  },
  {
    header: "NOCFPS",
    button: "NOCFPS",
    tag: "nocfps",
  },
  {
    header: "Market Cap (Crore)",
    button: "Market Cap",
    tag: "marketCap",
  },
  {
    header: "Dividend",
    button: "Cash dividend",
    tag: "dividend",
  },
  {
    header: "Revenue (Crore)",
    button: "Revenue",
    tag: "revenue",
  },
  {
    header: "Reserve & Surplus (Cr)",
    button: "Reserve",
    tag: "reserve",
  },
  {
    header: "Total Asset (Crore)",
    button: "Total Asset",
    tag: "totalAsset",
  },
  {
    header: "ROA",
    button: "ROA",
    tag: "roa",
  },
  {
    header: "ROE",
    button: "ROE",
    tag: "roe",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 0,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "5px !important",
    marginBottom: "10px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "12px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "12px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function TopFinancials(props: any) {
  const { data } = props;

  const theme: any = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [alignment, setAlignment] = useState("pe");

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const getColumnHead = (alignment: string) => {
    return options.find((item: any) => item.tag === alignment).header;
  };

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 2 },
        ml: { xs: 2, sm: 4 },
        mr: 2,
      }}
    >
      <Box>
        <Button
          component={Link}
          href="/screener"
          color="primary"
          endIcon={<ArrowForwardIosRoundedIcon />}
          sx={{
            fontSize: "1.6rem",
            fontWeight: 700,
            mb: 1,
            pl: 0.3,
            ":hover": {
              bgcolor: "transparent",
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
        >
          Top Fundamentals
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 0.2, minWidth: 125 }}>
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            orientation="vertical"
            onChange={handleAlignmentChange}
            aria-label="Platform"
          >
            {options.map((item: any, index: number) => (
              <StyledToggleButton value={item.tag} sx={{ px: 2 }} key={index}>
                {item.button}
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Box>
        <Box sx={{ ml: 2 }}>
          <TableContainer
            component={Paper}
            // elevation={0}
            variant="outlined"
            sx={{ borderRadius: 2, minWidth: { xs: "100%", sm: 445 } }}
          >
            <Table size="small">
              <TableHead sx={{ height: 65 }}>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontSize: "1rem",
                      fontWeight: 500,
                      // bgcolor: "financeCardTitlecolor",
                      color: "text.primary",
                    },
                  }}
                >
                  <TableCell>Trading Code</TableCell>
                  <TableCell align="right">
                    {getColumnHead(alignment)}
                  </TableCell>
                  {matchesSmUp && (
                    <>
                      <TableCell align="right">LTP</TableCell>
                      <TableCell align="right">Change (%)</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data[alignment]?.map((row: any) => (
                  <TableRow
                    hover={true}
                    sx={{
                      ".MuiTableCell": {
                        fontSize: "1rem",
                        fontWeight: 500,
                      },
                      //   "&:nth-of-type(odd)": {
                      //     backgroundColor: "financePageBgcolor",
                      //   },
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
                    <TableCell align="right" sx={{ fontSize: ".9rem" }}>
                      {alignment === "dividend"
                        ? row.value
                        : row.value.toFixed(2)}
                    </TableCell>
                    {matchesSmUp && (
                      <>
                        <TableCell align="right">{row.close}</TableCell>
                        <TableCell align="right">{row.percentChange}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
