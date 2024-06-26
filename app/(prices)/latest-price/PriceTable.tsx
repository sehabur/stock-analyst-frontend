import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { sectorList } from "@/data/dse";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import styles from "./Pricetable.module.css";

import { alpha, styled } from "@mui/material/styles";

const ODD_OPACITY = 0.2;

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
    field: "category",
    headerName: "CATEGORY",
    align: "left",
    headerAlign: "left",
    width: 90,
  },
  { field: "ltp", headerName: "LTP", align: "right", headerAlign: "right" },
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
    headerName: "VALUE(MN)",
    align: "right",
    headerAlign: "right",
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
            // ".MuiDataGrid-columnHeader": {
            //   color: "text.primary",
            //   textAlign: "right",
            // },
            // ".MuiDataGrid-cell": {
            //   fontWeight: 500,
            //   fontFamily: "'Nunito Sans', sans-serif",
            // },
          }}
        />
      </Box>

      {/* <Paper sx={{ width: '100%', overflow: 'hidden' }} variant="outlined">
        <Box
          sx={{
            pb: 1,
            pt: 2,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: grey[50],
          }}
        >
          <TextField
            select
            label="Category"
            name="category"
            value={formInputs.category}
            onChange={handleFormChange}
            size="small"
            sx={{ mr: 2, width: 100 }}
          >
            <MenuItem key="all" value="all">
              All
            </MenuItem>
            {categoryList.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Change"
            name="change"
            value={formInputs.change}
            onChange={handleFormChange}
            size="small"
            sx={{ mr: 2, width: 130 }}
          >
            <MenuItem key="all" value="all">
              All
            </MenuItem>
            <MenuItem key={1} value={1}>
              Positive
            </MenuItem>
            <MenuItem key={-1} value={-1}>
              Negative
            </MenuItem>
            <MenuItem key={0} value={0}>
              Neutral
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="success"
            onClick={handleFormSubmit}
          >
            Filter
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ height: 45 }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: grey[50],
                      fontSize: '1rem',
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {shares
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataItems: any) => {
                  return (
                    <TableRow
                      hover
                      key={dataItems.tradingCode}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: grey[50],
                        },
                      }}
                    >
                      {columns.map((column) => {
                        const value = dataItems[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              fontSize: '.5rem',
                              color:
                                dataItems.change == 0
                                  ? blue[800]
                                  : dataItems.change < 0
                                  ? red[900]
                                  : green[900],
                            }}
                          >
                            {column.id === 'button' && (
                              <>
                                <IconButton
                                  sx={{
                                    py: 0,
                                    ':hover': { bgcolor: 'transparent' },
                                  }}
                                >
                                  <AlarmAddIcon
                                    color="primary"
                                    sx={{
                                      fontSize: '1.2rem',
                                      ':hover': {
                                        color: 'secondary.main',
                                      },
                                    }}
                                  />
                                </IconButton>
                                <IconButton
                                  sx={{
                                    py: 0,
                                    ':hover': {
                                      bgcolor: 'transparent',
                                    },
                                  }}
                                >
                                  <FavoriteBorderIcon
                                    color="primary"
                                    sx={{
                                      fontSize: '1.2rem',
                                      ':hover': {
                                        color: 'secondary.main',
                                      },
                                    }}
                                  />
                                </IconButton>
                              </>
                            )}
                            {column.id === 'tradingCode' ? (
                              <Typography
                                sx={{
                                  ':hover': { textDecoration: 'underline' },
                                }}
                                component={Link}
                                href={`/stock-details/${dataItems.tradingCode}`}
                              >
                                {value}
                              </Typography>
                            ) : (
                              <Typography>{value}</Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100, 200]}
          component="div"
          count={shares.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper> */}
    </Box>
  );
}
