"use client";

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

// import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Link from "next/link";
import { useState } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(1),
  },
  fontSize: ".9rem",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const addPlusSign = (value: number) => {
  let result;
  if (value > 0) {
    result = "+" + value.toFixed(2);
  } else if (value < 0) {
    result = value.toFixed(2);
  } else {
    result = value;
  }
  return result;
};

const setColor = (value: number) => {
  const textColor =
    value === 0 ? "primary.main" : value < 0 ? "error.main" : "success.main";
  return textColor;
};

export default function Gainers(props: any) {
  const { data } = props;

  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary>Top Gainer</AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">SYMBOL</TableCell>
                  <TableCell align="right">LTP</TableCell>
                  <TableCell align="right">CH(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.gainerDaily.slice(0, 10).map((row: any) => (
                  <TableRow
                    key={row.id}
                    hover={true}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "gainerCard",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      ".MuiTableCell-root": {
                        fontSize: ".8rem",
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        color: "primary.main",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/supercharts?symbol=${row.tradingCode}`}>
                        {row.tradingCode}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: setColor(row.percentChange),
                      }}
                    >
                      {row.ltp}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {addPlusSign(row.percentChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary>Top Loser</AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 500,
                    },
                  }}
                >
                  <TableCell align="left">SYMBOL</TableCell>
                  <TableCell align="right">LTP</TableCell>
                  <TableCell align="right">CH(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.loserDaily.slice(0, 10).map((row: any) => (
                  <TableRow
                    key={row.id}
                    hover={true}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      ".MuiTableCell-root": {
                        fontSize: ".8rem",
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        color: "primary.main",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/supercharts?symbol=${row.tradingCode}`}>
                        {row.tradingCode}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {row.ltp}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {addPlusSign(row.percentChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary>Top Volume</AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 500,
                    },
                  }}
                >
                  <TableCell align="left">SYMBOL</TableCell>
                  <TableCell align="right">LTP</TableCell>
                  <TableCell align="right">CH(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.gainerVolume.slice(0, 10).map((row: any) => (
                  <TableRow
                    key={row.id}
                    hover={true}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      ".MuiTableCell-root": {
                        fontSize: ".8rem",
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        color: "primary.main",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/supercharts?symbol=${row.tradingCode}`}>
                        {row.tradingCode}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {row.ltp}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {addPlusSign(row.percentChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary>Top Value</AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 500,
                    },
                  }}
                >
                  <TableCell align="left">SYMBOL</TableCell>
                  <TableCell align="right">LTP</TableCell>
                  <TableCell align="right">CH(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.gainerValue.slice(0, 10).map((row: any) => (
                  <TableRow
                    key={row.id}
                    hover={true}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      ".MuiTableCell-root": {
                        fontSize: ".8rem",
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        color: "primary.main",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/supercharts?symbol=${row.tradingCode}`}>
                        {row.tradingCode}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {row.ltp}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {addPlusSign(row.percentChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary>Top Trade</AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 500,
                    },
                  }}
                >
                  <TableCell align="left">SYMBOL</TableCell>
                  <TableCell align="right">LTP</TableCell>
                  <TableCell align="right">CH(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.gainerTrade.slice(0, 10).map((row: any) => (
                  <TableRow
                    key={row.id}
                    hover={true}
                    sx={{
                      ".MuiTableCell-root": {
                        fontSize: ".8rem",
                      },
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        color: "primary.main",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      <Link href={`/supercharts?symbol=${row.tradingCode}`}>
                        {row.tradingCode}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {row.ltp}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: setColor(row.percentChange) }}
                    >
                      {addPlusSign(row.percentChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
