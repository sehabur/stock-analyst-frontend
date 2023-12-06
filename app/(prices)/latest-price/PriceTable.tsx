import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { sectorList } from '@/data/dse';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './Pricetable.module.css';

const columns: GridColDef[] = [
  {
    field: 'tradingCode',
    headerName: 'TRADING CODE',
    width: 130,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => {
      return (
        <Link href={`/stock-details/${params.value}`}>{params.value}</Link>
      );
    },
    cellClassName: styles.tradingCodeCell,
  },
  {
    field: 'category',
    headerName: 'CATEGORY',
    align: 'center',
    headerAlign: 'center',
    width: 90,
  },
  { field: 'ltp', headerName: 'LTP', align: 'right', headerAlign: 'right' },
  { field: 'ycp', headerName: 'OPEN', align: 'right', headerAlign: 'right' },
  { field: 'high', headerName: 'HIGH', align: 'right', headerAlign: 'right' },
  { field: 'low', headerName: 'LOW', align: 'right', headerAlign: 'right' },
  { field: 'close', headerName: 'CLOSE', align: 'right', headerAlign: 'right' },
  {
    field: 'change',
    headerName: 'CHANGE',
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
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'percentChange',
    headerName: 'CHANGE(%)',
    align: 'right',
    headerAlign: 'right',
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
      return params.value + '%';
    },
  },
  { field: 'trade', headerName: 'TRADE', align: 'right', headerAlign: 'right' },
  {
    field: 'value',
    headerName: 'VALUE(MN)',
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'volume',
    headerName: 'VOLUME',
    align: 'right',
    headerAlign: 'right',
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
        (share: any) => share.sector.split(' ')[0].toLowerCase() === sector
      );
    } else {
      shareData = data;
    }
    return shareData;
  };

  const [shares, setShares] = React.useState(filterInitialShares(sector));

  const [sectorFormInputs, setSectorFormInputs] = React.useState(
    sector || 'all'
  );

  const handleFormChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    let newData = [];
    if (value !== 'all') {
      newData = data.filter(
        (share: any) => share.sector.split(' ')[0].toLowerCase() === value
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
        {sectorList.map((option) => (
          <MenuItem key={option.tag} value={option.tag}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <DataGrid
        rows={shares}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{
          // border: 'none',
          '.MuiDataGrid-columnHeader': {
            color: 'text.secondary',
            fontSize: '.8rem',
            textAlign: 'right',
          },
          '.MuiDataGrid-cell': {
            fontWeight: 500,
            fontFamily: "'Nunito Sans', sans-serif",
          },
        }}
      />

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
