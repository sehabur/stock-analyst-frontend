"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Box, Typography, Chip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import styles from "./Pricetable.module.css";
import { isWithinPreviousTwoDays } from "_helper/getter";

const StripedDataGrid = styled(DataGrid)(({ theme }: any) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.stipedTableEvenRow,
  },
}));

const columns: GridColDef[] = [
  {
    field: "tradingCode",
    headerName: "TRADING CODE",
    width: 140,
    align: "left",
    headerAlign: "left",
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
    // cellClassName: styles.tradingCodeCell,
  },
  {
    field: "sector",
    headerName: "SECTOR",
    align: "left",
    headerAlign: "left",
    width: 150,
  },
  {
    field: "category",
    headerName: "CATEGORY",
    align: "center",
    headerAlign: "left",
    width: 85,
  },
  {
    field: "close",
    headerName: "Price",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "haltStatus",
    headerName: "",
    align: "left",
    headerAlign: "left",
    width: 65,
    renderCell: (params) => {
      return (
        <>
          {params.value == "buy" ||
          params.value == "sell" ||
          params.value == "spot" ? (
            <Chip
              label={params.value == "spot" ? "Spot" : "Halt"}
              size="small"
              variant="outlined"
              color={
                params.value == "spot"
                  ? "warning"
                  : params.value === "buy"
                  ? "success"
                  : "error"
              }
              sx={{
                "& .MuiChip-label": {
                  px: 0.8,
                },
              }}
            />
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  { field: "ycp", headerName: "OPEN", align: "center", headerAlign: "center" },
  {
    field: "high",
    headerName: "HIGH",
    align: "center",
    headerAlign: "center",
  },
  { field: "low", headerName: "LOW", align: "center", headerAlign: "center" },
  {
    field: "close",
    headerName: "CLOSE",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "change",
    headerName: "CHANGE",
    cellClassName: (params: any) => {
      let cellClass;
      if (params.value < 0) {
        cellClass = styles.downTrend;
      } else if (params.value > 0) {
        cellClass = styles.upTrend;
      } else {
        cellClass = styles.neutral;
      }
      return cellClass;
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "percentChange",
    headerName: "CHANGE(%)",
    align: "center",
    headerAlign: "center",
    cellClassName: (params: any) => {
      let cellClass;
      if (params.value < 0) {
        cellClass = styles.downTrend;
      } else if (params.value > 0) {
        cellClass = styles.upTrend;
      } else {
        cellClass = styles.neutral;
      }
      return cellClass;
    },
    valueFormatter: (params) => {
      return params.value + "%";
    },
  },
  {
    field: "volume",
    headerName: "VOLUME",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "value",
    headerName: "VALUE(CR)",
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) => {
      return (params.value / 10).toFixed(2);
    },
  },
  {
    field: "trade",
    headerName: "TRADE",
    align: "center",
    headerAlign: "center",
  },
];

export default function PriceTable(props: any) {
  let { data } = props;

  let shares = data?.map((item: any, index: number) => {
    return {
      ...item,
      id: index,
      haltStatus: isWithinPreviousTwoDays(item.recordDate)
        ? "spot"
        : item.haltStatus,
    };
  });

  console.log(shares);

  return (
    <Box>
      <Box sx={{ height: "80vh" }}>
        <StripedDataGrid
          rows={shares}
          columns={columns}
          autoPageSize={true}
          initialState={{
            // pagination: {
            //   paginationModel: { page: 0, pageSize: 10 },
            // },
            columns: {
              columnVisibilityModel: {
                // low: false,
                open: true,
              },
            },
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rowHeight={40}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          // pageSizeOptions={[10, 25, 50, 100]}
          sx={{
            border: "none",
            ".MuiDataGrid-columnHeader": {
              color: "text.primary",
              fontSize: ".85rem",
            },
            ".MuiDataGrid-cell": {
              fontWeight: 500,
            },
          }}
        />
      </Box>
    </Box>
  );
}
