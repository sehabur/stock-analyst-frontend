"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./Dashboard.module.css";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const variants: any = {
  gainer: {
    pageTitle: "Positive Beta",
    pageSubtitle: "Stocks with positive beta value",
  },
  loser: {
    pageTitle: "Negative Beta",
    pageSubtitle: "Stocks with negative beta value",
  },
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButtonSuccess = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
    marginRight: "12px",
    border: `1px solid #4caf50 !important`,
    paddingLeft: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "24px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.success.main,
    },
  },
  color: theme.palette.success.main,
}));

const StyledToggleButtonError = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
    marginRight: "12px",
    border: `1px solid #d32f2f !important`,
    paddingLeft: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "24px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.error.main,
    },
  },
  color: theme.palette.error.main,
}));

export default function Dashboard({ data }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [typeAlignment, setTypeAlignment] = React.useState("gainer");

  const columns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: matchesSmUp ? 250 : 140,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography
            component={Link}
            href={`/stock-details/${params.value}`}
            sx={{
              color: "primary.main",
              ":hover": { textDecoration: "underline" },
            }}
          >
            {params.value}
          </Typography>
        );
      },
      cellClassName: styles.tradingCodeCell,
    },
    {
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "left",
      headerAlign: "left",
      width: matchesSmUp ? 200 : 100,
      disableColumnMenu: true,
    },
    {
      field: "beta",
      headerName: "BETA (1 YEAR)",
      align: "left",
      headerAlign: "left",
      width: matchesSmUp ? 170 : 120,
      disableColumnMenu: true,
    },
  ];

  const handleTypeAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTypeAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 2 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={typeAlignment}
          exclusive
          onChange={handleTypeAlignmentChange}
          aria-label="Platform"
        >
          <StyledToggleButtonSuccess
            value="gainer"
            sx={{ px: { xs: 1.4, sm: 4, fontSize: ".9rem" } }}
          >
            + Beta
          </StyledToggleButtonSuccess>
          <StyledToggleButtonError
            value="loser"
            sx={{ px: { xs: 1.4, sm: 4, fontSize: ".9rem" } }}
          >
            - Beta
          </StyledToggleButtonError>
        </StyledToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "1.3rem", sm: "1.4rem" } }}
          color="text.primary"
          gutterBottom
        >
          {variants[typeAlignment].pageTitle}
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", textAlign: "center" }}
          color="text.secondary"
        >
          {variants[typeAlignment].pageSubtitle}
        </Typography>
      </Box>
      <Box sx={{ mx: "auto" }}>
        <DataGrid
          rows={data[typeAlignment]}
          columns={columns}
          hideFooter={true}
          sx={{
            ".MuiDataGrid-columnHeader": {
              color: "text.secondary",
              fontSize: { xs: ".8rem", sm: ".9rem" },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
            border: "none",
            width: matchesSmUp ? 600 : "90vw",
            mx: "auto",
            mb: 6,
            fontSize: ".9rem",
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
}
