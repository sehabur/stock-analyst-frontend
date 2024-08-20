import React from "react";
import Link from "next/link";

import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import { sectorList } from "@/data/dse";
import styles from "./Pricetable.module.css";

const StripedDataGrid = styled(DataGrid)(({ theme }: any) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.stipedTableEvenRow,
  },
}));

const columns: GridColDef[] = [
  {
    field: "tradingCode",
    headerName: "TRADING CODE",
    width: 150,
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
    width: 140,
  },
  {
    field: "category",
    headerName: "CATEGORY",
    align: "center",
    headerAlign: "left",
    width: 85,
  },
  { field: "ltp", headerName: "LTP", align: "right", headerAlign: "right" },
  {
    field: "haltStatus",
    headerName: "",
    align: "left",
    headerAlign: "left",
    width: 62,
    renderCell: (params) => {
      return (
        <>
          {params.value !== "none" ? (
            <Chip
              label="Halt"
              size="small"
              // variant="outlined"
              color={params.value === "buy" ? "success" : "error"}
              sx={{
                ml: 1,
                fontSize: ".8rem",
              }}
            />
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  { field: "ycp", headerName: "OPEN", align: "right", headerAlign: "right" },
  {
    field: "high",
    headerName: "HIGH",
    align: "right",
    headerAlign: "right",
  },
  { field: "low", headerName: "LOW", align: "right", headerAlign: "right" },
  { field: "close", headerName: "CLOSE", align: "right", headerAlign: "right" },
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
    align: "right",
    headerAlign: "right",
  },
  {
    field: "percentChange",
    headerName: "CHANGE(%)",
    align: "right",
    headerAlign: "right",
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
  { field: "trade", headerName: "TRADE", align: "right", headerAlign: "right" },
  {
    field: "value",
    headerName: "VALUE(CR)",
    align: "right",
    headerAlign: "right",
    valueFormatter: (params) => {
      return (params.value / 10).toFixed(2);
    },
  },
  {
    field: "volume",
    headerName: "VOLUME",
    align: "right",
    headerAlign: "right",
  },
];

export default function PriceTable(props: { data: Array<{}>; sector: any }) {
  let { data, sector } = props;

  data = data.map((item, index) => {
    return { ...item, id: index };
  });

  const filterInitialShares = (sector: string) => {
    let shareData = [];
    if (sector) {
      shareData = data.filter(
        (share: any) => share.sector.split(" ")[0].toLowerCase() === sector
      );
    } else {
      shareData = data;
    }
    return shareData;
  };

  const [shares, setShares] = React.useState(filterInitialShares(sector));

  const [sectorFormInputs, setSectorFormInputs] = React.useState(
    sector || "all"
  );

  const handleFormChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    let newData = [];
    if (value !== "all") {
      newData = data.filter(
        (share: any) => share.sector.split(" ")[0].toLowerCase() === value
      );
    } else {
      newData = data;
    }
    setSectorFormInputs(value);
    setShares(newData);
  };

  return (
    <Box>
      <TextField
        select
        name="sector"
        value={sectorFormInputs}
        onChange={handleFormChange}
        size="small"
        variant="outlined"
        sx={{ width: 300, mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Sector:</InputAdornment>
          ),
        }}
      >
        <MenuItem key="all" value="all">
          All
        </MenuItem>
        {sectorList.map((option: any) => (
          <MenuItem key={option.tag} value={option.tag}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

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
