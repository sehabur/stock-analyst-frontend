"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
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
import PremiumDialogContent from "@/components/shared/PremiumDialogContent";

const startingFields = [
  "tradingCode",
  "sector",
  "category",
  "close",
  "pricePercentChange",
  "volume",
  "pe",
  "marketCap",
  "totalShares",
  "rsi",
  "sma50",
  "ema50",
];

const StripedDataGrid = styled(DataGrid)(({ theme }: any) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.stipedTableEvenRow,
  },
}));

const initialTextFieldInput = {
  sector: "",
  category: "",
  close: "",
  volume: "",
  marketCap: "",
  paidUpCap: "",
  totalShares: "",
  epsCurrent: "",
  navCurrent: "",
  nocfpsCurrent: "",
  pe: "",
  de: "",
  ps: "",
  pbv: "",
  pcf: "",
  currentRatio: "",
  roe: "",
  roa: "",
  dividendYield: "",
  cashDividend: "",
  stockDividend: "",
  revenueGrowthOneYear: "",
  revenueGrowthFiveYear: "",
  epsGrowthOneYear: "",
  epsGrowthFiveYear: "",
  epsGrowthQuarter: "",
  navGrowthOneYear: "",
  navGrowthQuarter: "",
  nocfpsGrowthOneYear: "",
  nocfpsGrowthQuarter: "",
  totalAssetGrowthOneYear: "",
  totalAssetGrowthFiveYear: "",
  netIncomeGrowthOneYear: "",
  netIncomeGrowthFiveYear: "",
  totalLiabilitiesGrowthOneYear: "",
  operatingProfitGrowthOneYear: "",
  directorShareHolding: "",
  govtShareHolding: "",
  publicShareHolding: "",
  foreignShareHolding: "",
  instituteShareHolding: "",
  freeFloatShare: "",
  directorShareHoldingChange: "",
  instituteShareHoldingChange: "",
  reserve: "",
  pricePercentChange: "",
  pricePercentChangeOneWeek: "",
  pricePercentChangeOneMonth: "",
  pricePercentChangeSixMonth: "",
  pricePercentChangeOneYear: "",
  pricePercentChangeFiveYear: "",
  beta: "",
  sma20: "",
  sma50: "",
  sma200: "",
  ema20: "",
  ema50: "",
  ema200: "",
  rsi14: "",
  candlestick: "",
  patterns: "",
};

export default function Main() {
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state: any) => state.auth);

  const [formInputs, setFormInputs] = useState<any>({});

  const [textFieldInput, setTextFieldInput] = useState<any>(
    initialTextFieldInput
  );

  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);

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

  const [tabValue, setTabValue] = useState(0);

  const [resetKey, setresetKey] = useState(1);

  const [openCustomRangeMenu, setCustomRangeMenuOpen] =
    useState<boolean>(false);

  const columns: GridColDef[] = [...filterOptions]
    .sort((a: any, b: any) => a.columnOrder - b.columnOrder)
    .map((item: any) => {
      const column: any = {
        field: item.name,
        headerName: item?.label,
        width: 120,
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
          if (!params.value) {
            return params.value == 0 ? 0 + item.suffix : "--";
          }
          return params.value + item.suffix;
        };
      }
      return column;
    });

  const handlePremiumDialogOpen = () => {
    setOpenPremiumDialog(true);
  };

  const handlePremiumDialogClose = () => {
    setOpenPremiumDialog(false);
  };

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  const handleResetFilters = () => {
    setFormInputs({});
    setTextFieldInput(initialTextFieldInput);
    setresetKey((state) => state + 1);
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

        delete textFieldInput[name];
        setTextFieldInput({ ...textFieldInput });
      } else {
        setFormInputs({
          ...formInputs,
          [name]: value,
        });
        setTextFieldInput({
          ...textFieldInput,
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

    setTextFieldInput({
      ...textFieldInput,
      [name]: "null;null",
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

    setFormInputs({
      ...formInputs,
      [name]: min + ";" + max,
    });
  };

  const createFieldSetMap = (initField: any, inputField: any) => {
    const minStartingDisplayFieldLength = 1;
    const minDisplayFieldLength = 12;

    const inputFieldLength = inputField.length;

    const unmatchedStartingField = initField.filter(
      (item: any) => !inputField.includes(item)
    );

    const totalField = [...inputField, ...unmatchedStartingField].slice(
      0,
      Math.max(
        minDisplayFieldLength,
        inputFieldLength + minStartingDisplayFieldLength
      )
    );

    return totalField;
  };

  const getScreenerData = async () => {
    try {
      setLoading(true);
      setscreenerDatafields(
        createFieldSetMap(startingFields, Object.keys(formInputs))
      );

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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const customFilterMenu = (
    <>
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
              <Box sx={{ mb: 1 }}>
                <TextField
                  name="title"
                  hidden
                  value={customRangeMenuContent.name}
                  sx={{ display: "none" }}
                />
                <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                  Min value:
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
                  inputProps={{
                    step: 0.01,
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                  Max value:
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
                  inputProps={{
                    step: 0.01,
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mr: 2.5, my: 1 }}>
            <Button
              onClick={() => handleCustomRangeMenuClose()}
              variant="outlined"
              color="primary"
              sx={{ mr: 1, px: 2.3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ px: 3.5 }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );

  const technicalFilters = filters
    .filter((item: any) => item.visible === 1 && item.placement == "technical")
    .map((filter: any) => (
      <Grid item xs={6} sm={1.714} key={filter.name + resetKey.toString()}>
        <TextField
          variant="outlined"
          select
          label={filter.label}
          name={filter.name}
          fullWidth
          size="small"
          value={textFieldInput[filter.name]}
          color="success"
          focused={formInputs[filter.name]}
        >
          <Typography
            sx={{
              px: 2,
              pb: 0.8,
              pt: 0.3,
              color: "primary.main",
              fontSize: ".9rem",
              fontWeight: 700,
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
              {option.text} {option.value == "null;null" && "⭐"}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ));

  const fundamentalalFilters = filters
    .filter((item: any) => item.visible === 1 && item.placement != "technical")
    .map((filter: any) => (
      <Grid item xs={6} sm={1.714} key={filter.name + resetKey.toString()}>
        <TextField
          variant="outlined"
          select
          label={filter.label}
          name={filter.name}
          fullWidth
          size="small"
          value={textFieldInput[filter.name]}
          color="success"
          focused={formInputs[filter.name]}
        >
          <Typography
            sx={{
              px: 2,
              pb: 0.8,
              pt: 0.3,
              color: "primary.main",
              fontSize: ".9rem",
              fontWeight: 700,
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
              {option.text} {option.value == "null;null" && "⭐"}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ));

  useEffect(() => {
    let column: any = {};
    for (let item of filterOptions) {
      column[item.name] =
        screenerDatafields.indexOf(item.name) === -1 ? false : true;
    }
    setColumnVisibilityModel(column);
  }, [screenerDatafields]);

  useEffect(() => {
    getScreenerData();
  }, [formInputs]);

  useEffect(() => {
    if (!auth?.isPremiumEligible) handlePremiumDialogOpen();
    if (auth?.isPremiumEligible) handlePremiumDialogClose();
  }, [auth]);

  return (
    <Box>
      <Dialog
        open={openPremiumDialog}
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
      >
        <DialogContent>
          <PremiumDialogContent />
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          // borderBottom: 1,
          // borderColor: "divider",
          px: { xs: 2, sm: 4 },
          flexWrap: "wrap",
          // bgcolor: "financeCardTitlecolor",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Fundamental" sx={{ color: "primary.main" }} />
          <Tab label="Technical" sx={{ color: "primary.main" }} />
          <Tab label="All" sx={{ color: "primary.main" }} />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "1rem", color: "text.primary" }}>
            {Object.keys(formInputs).length} filters selected
          </Typography>
          <Button sx={{ ml: 4 }} variant="text" onClick={handleResetFilters}>
            Reset filters
          </Button>
        </Box>
      </Box>
      <Box>
        {customFilterMenu}
        <Box
          sx={{
            bgcolor: "homepageBackground",
            pt: 1,
            // borderBottom: 1,
            // borderColor: "divider",
          }}
        >
          <Box
            sx={{
              maxWidth: 1530,
              mx: "auto",
              px: { xs: 2, sm: 4 },
              mt: 1.5,
              pb: 2.5,
            }}
          >
            <Box>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ display: tabValue == 0 ? "flex" : "none" }}
              >
                {fundamentalalFilters}
              </Grid>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ display: tabValue == 1 ? "flex" : "none" }}
              >
                {technicalFilters}
              </Grid>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ display: tabValue == 2 ? "flex" : "none" }}
              >
                {fundamentalalFilters} {technicalFilters}
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: 1530,
            mx: "auto",
            px: { xs: 2, sm: 4 },
            pt: 2,
            pb: 6,
          }}
        >
          <Box sx={{ height: 580 }}>
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
              columnHeaderHeight={80}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
                filterPanel: { sx: { maxWidth: "90vw" } },
              }}
              loading={loading}
              sx={{
                // border: "none",
                borderRadius: 2,
                ".MuiDataGrid-columnHeader": {
                  color: "text.primary",
                },
                ".MuiDataGrid-columnHeaderTitle": {
                  overflow: "visible",
                  whiteSpace: "normal",
                  lineHeight: "normal",
                },
                ".MuiDataGrid-cell": {
                  fontWeight: 500,
                  fontSize: ".875rem",
                  textAlign: "center",
                },
                ".MuiDataGrid-root": {
                  textAlign: "center",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
