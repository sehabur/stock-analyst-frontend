"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
  ToggleButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { filterOptions } from "./filters";
import styles from "./Main.module.css";

import CustomizedDividers from "@/components/buttons/ToggleButtonGroupCustom";
import { grey } from "@mui/material/colors";

const startingFields = ["category", "tradingCode", "sector"];

const endingFields = [
  "ltp",
  "pricePercentChange",
  "volume",
  "pe",
  "marketCap",
  "totalShares",
];

const StripedDataGrid = styled(DataGrid)(({ theme }: any) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.stipedTableEvenRow,
  },
}));

export default function Main() {
  const [formInputs, setFormInputs] = useState<any>({});

  const [screenerData, setScreenerData] = useState<any>([]);

  const [screenerDatafields, setscreenerDatafields] = useState<any>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({});

  const [filters, setFilters] = useState<any>(filterOptions);

  const [customRangeMenuContent, setCustomRangeMenuContent] = useState<any>({
    title: "",
    min: null,
    max: null,
    unit: "",
  });

  const [openCustomRangeMenu, setCustomRangeMenuOpen] =
    useState<boolean>(false);

  const columns: GridColDef[] = [...filterOptions]
    // .sort((a, b) => a.columnOrder - b.columnOrder)
    .map((item: any) => {
      const column: any = {
        field: item.name,
        headerName: item?.label,
        width: 120,
        // width: Math.max(1300 / screenerDatafields.length, 120),
        align: "left",
        headerAlign: "left",
      };

      if (item.name === "tradingCode") {
        column.renderCell = (params: any) => {
          return (
            <Link href={`/stock-details/${params.value}`}>{params.value}</Link>
          );
        };
        column.cellClassName = styles.tradingCodeCell;
      }
      if (item.suffix) {
        column.renderCell = (params: any) => {
          return params.value + item.suffix;
        };
      }

      return column;
    });

  const handleResetFilters = () => {
    setFormInputs({});
  };

  const handleMenuItemClick = (
    type: string,
    name: string,
    label: string,
    value: string,
    unit: string
  ) => {
    if (type === "custom") {
      const min = formInputs[name] ? formInputs[name].split(";")[0] : null;
      const max = formInputs[name] ? formInputs[name].split(";")[1] : null;
      setCustomRangeMenuOpen(true);
      setCustomRangeMenuContent({
        name,
        title: label,
        min,
        max,
        unit,
      });
    } else if (type === "default") {
      if (value === "any") {
        delete formInputs[name];
        setFormInputs({ ...formInputs });
      } else {
        setFormInputs({
          ...formInputs,
          [name]: value,
        });
      }
    }
  };

  const handleCustomRangeMenuClose = () => {
    setCustomRangeMenuOpen(false);
  };

  const handleCustomRangeMenuSubmit = (event: any) => {
    event.preventDefault();

    const name = event.target[0].value;
    const min = event.target[2].value !== "" ? event.target[2].value : "null";
    const max = event.target[4].value !== "" ? event.target[4].value : "null";

    setFormInputs({
      ...formInputs,
      [name]: min + ";" + max,
    });

    setFilters((prevState: any) => {
      const index = prevState.findIndex((item: any) => item.name === name);
      const lastIndex = prevState[index].options.length - 1;
      prevState[index].options[
        lastIndex
      ].text = `Custom (Min: ${min}, Max: ${max} ${prevState[index].unit})`;

      return prevState;
    });
    setCustomRangeMenuOpen(false);
  };

  const getScreenerData = async () => {
    const fieldSet: any = new Set([
      ...startingFields,
      ...Object.keys(formInputs),
      ...endingFields,
    ]);
    setscreenerDatafields([...fieldSet]);

    const res = await fetch(`/api/screener`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInputs),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    setScreenerData(data);

    // console.log('out', data);
  };

  // console.log(formInputs, screenerDatafields, columnVisibilityModel);

  useEffect(() => {
    getScreenerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInputs]);

  useEffect(() => {
    let column: any = {};

    for (let item of filterOptions) {
      column[item.name] =
        screenerDatafields.indexOf(item.name) === -1 ? false : true;
    }

    setColumnVisibilityModel(column);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenerDatafields]);

  const customFilterMenu = (
    <div>
      <Dialog
        disableEscapeKeyDown
        open={openCustomRangeMenu}
        onClose={handleCustomRangeMenuClose}
      >
        <Box
          component="form"
          onSubmit={handleCustomRangeMenuSubmit}
          sx={{ minWidth: 300 }}
        >
          <DialogTitle>
            Select range for {customRangeMenuContent.title}
          </DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                my: 1,
                width: 200,
                mx: "auto",
              }}
            >
              <TextField
                name="title"
                hidden
                value={customRangeMenuContent.name}
                sx={{ display: "none" }}
              />
              <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                Min Value:
              </Typography>
              <TextField
                type="number"
                name="minValue"
                defaultValue={customRangeMenuContent.min}
                sx={{ mr: 1, mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" variant="filled">
                      {customRangeMenuContent.unit}
                    </InputAdornment>
                  ),
                }}
              />
              <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                Max Value:
              </Typography>
              <TextField
                type="number"
                name="maxValue"
                defaultValue={customRangeMenuContent.max}
                sx={{ mr: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {customRangeMenuContent.unit}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ mx: 2, my: 1 }}>
            <Button
              onClick={() => handleCustomRangeMenuClose()}
              variant="outlined"
              color="warning"
              sx={{ mr: 1, px: 2.5 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ px: 2.5 }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderBottom: 1,
          borderColor: "divider",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Fundamental" />
            <Tab label="Technical" />
            <Tab label="All" />
          </Tabs>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>
            {Object.keys(formInputs).length} filter(s) selected
          </Typography>
          <Button sx={{ ml: 4 }} variant="text" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Box>
      </Box>
      <Box>
        {customFilterMenu}
        <Box
          sx={{
            bgcolor: "financePageBgcolor",
            // borderBottom: 1,
            // borderColor: "divider",
          }}
        >
          <Box
            sx={{
              maxWidth: 1720,
              mx: "auto",
              px: { xs: 2, sm: 4 },
              mt: 1.5,
              pb: 0.1,
              // pt: 2
            }}
          >
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 1.4 }}
              rowSpacing={1.4}
              sx={{ mb: 2 }}
            >
              {filters
                .filter((item: any) => item.visible === 1)
                .map((filter: any) => (
                  <Grid item xs={6} sm={1.714} key={filter.name}>
                    <TextField
                      variant="outlined"
                      select
                      label={filter.label}
                      name={filter.name}
                      fullWidth
                      size="small"
                      value={formInputs[filter?.name]}
                    >
                      <Typography
                        sx={{
                          px: 2,
                          pb: 0.7,
                          color: "primary.main",
                        }}
                      >
                        {filter.desc}
                      </Typography>
                      <Divider />
                      <MenuItem
                        dense
                        value="any"
                        onClick={() =>
                          handleMenuItemClick(
                            "default",
                            filter.name,
                            filter.desc,
                            "any",
                            ""
                          )
                        }
                      >
                        Any
                      </MenuItem>
                      {filter.options.map((option: any) => (
                        <MenuItem
                          dense
                          key={option.value}
                          value={option.value}
                          onClick={() =>
                            handleMenuItemClick(
                              option.type,
                              filter.name,
                              filter.desc,
                              option.value,
                              filter.unit
                            )
                          }
                        >
                          {option.text}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
        <Box sx={{ maxWidth: 1720, mx: "auto", px: { xs: 2, sm: 4 }, my: 2 }}>
          <Box sx={{ height: 565 }}>
            <StripedDataGrid
              rows={screenerData}
              columns={columns}
              autoPageSize={true}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
              initialState={{
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
              sx={{
                // border: 'none',
                "& .MuiDataGrid-columnHeaderTitle": {
                  whiteSpace: "normal",
                  lineHeight: "normal",
                },
                ".MuiDataGrid-columnHeader": {
                  // borderRight: '1px solid red',
                  // color: 'text.primary',
                  // fontSize: '.8rem',
                  // textAlign: 'right',
                },
                // '.MuiDataGrid-cell': {
                //   fontWeight: 500,
                //   // fontSize: '.9rem',
                //   fontFamily: "'Nunito Sans', sans-serif",
                // },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
