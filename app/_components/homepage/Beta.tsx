"use client";
import Link from "next/link";

import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SeeMoreButton from "../buttons/SeeMoreButton";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));
const StyledToggleButtonSuccess = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid #4caf50 !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.success.main,
    },
  },
  color: theme.palette.success.main,
}));

const StyledToggleButtonError = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid #d32f2f !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.error.main,
    },
  },
  color: theme.palette.error.main,
}));

export default function Beta({ data }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [typeAlignment, setTypeAlignment] = React.useState("gainer");

  const columns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: matchesSmUp ? 180 : 140,
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
    },
    {
      field: "close",
      headerName: "PRICE (BDT)",
      align: "right",
      headerAlign: "right",
      width: matchesSmUp ? 160 : 100,
      disableColumnMenu: true,
    },
    {
      field: "beta",
      headerName: "BETA (1 Year)",
      align: "right",
      headerAlign: "right",
      width: matchesSmUp ? 170 : 100,
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
    <Box sx={{ mx: 0 }}>
      <Paper
        elevation={0}
        sx={{ py: 2, px: { xs: 2, sm: 6 }, width: "100%", borderRadius: 3 }}
      >
        <Box>
          <Button
            component={Link}
            href="/beta"
            color="primary"
            endIcon={<ArrowForwardIosRoundedIcon />}
            sx={{
              mb: 1,
              fontSize: "1.5rem",
              fontWeight: 600,
              ":hover": {
                bgcolor: "transparent",
                color: "primary.main",
                textDecoration: "underline",
              },
            }}
          >
            Beta
          </Button>
        </Box>
        <Box
          sx={{
            mb: 1,
            ml: 0.8,
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
              sx={{ px: { xs: 1.4, sm: 4 } }}
            >
              + Beta
            </StyledToggleButtonSuccess>
            <StyledToggleButtonError
              value="loser"
              sx={{ px: { xs: 1.4, sm: 4 } }}
            >
              - Beta
            </StyledToggleButtonError>
          </StyledToggleButtonGroup>
        </Box>

        <Box>
          <DataGrid
            rows={data[typeAlignment]}
            columns={columns}
            hideFooter={true}
            rowHeight={41}
            sx={{
              ".MuiDataGrid-columnHeader": {
                color: "text.secondary",
                // fontSize: { xs: ".8rem", sm: ".8rem" },
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.43rem",
                whiteSpace: "normal",
              },
              border: "none",
              width: matchesSmUp ? "100%" : "90vw",
              fontSize: ".9rem",
              fontWeight: 500,
            }}
          />
        </Box>
        <SeeMoreButton href="/beta" />
      </Paper>
    </Box>
  );
}
