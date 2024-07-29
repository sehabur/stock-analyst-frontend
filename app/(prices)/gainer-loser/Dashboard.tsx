"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import styles from "./Dashboard.module.css";
import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";

const variantMap = [
  {
    type: "gainer",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top gainers",
    pageSubtitle: "Stocks with a price gain against the previous day's price",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "gainer",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top gainers",
    pageSubtitle: "Stocks with a price gain against one week before price",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEKLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top gainers",
    pageSubtitle: "Stocks with a price gain against one month before price",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTHLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top gainers",
    pageSubtitle: "Stocks with a price gain against six months before price",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTHLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top gainers",
    pageSubtitle: "Stocks with a price gain against one year before price",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEARLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top gainers",
    pageSubtitle: "Stocks with a price gain against five years before price",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEARLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top losers",
    pageSubtitle: "Stocks with a price lose against the previous day's price",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "loser",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top losers",
    pageSubtitle: "Stocks with a price lose against one week before price",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEKLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top losers",
    pageSubtitle: "Stocks with a price lose against one month before price",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTHLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top losers",
    pageSubtitle: "Stocks with a price lose against six months before price",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTHLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top losers",
    pageSubtitle: "Stocks with a price lose against one year before price",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEARLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top losers",
    pageSubtitle: "Stocks with a price lose against five years before price",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEARLY CHANGE (%)",
  },
  {
    type: "value",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top values",
    pageSubtitle: "Stocks with top value for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "value",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top values",
    pageSubtitle: "Stocks with top value for last one week",
    datafieldName: "oneWeekTotalValue",
    columnTitle: "WEEK VALUE",
  },
  {
    type: "value",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top values",
    pageSubtitle: "Stocks with top value for last one month",
    datafieldName: "oneMonthTotalValue",
    columnTitle: "MONTH VALUE",
  },
  {
    type: "value",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top values",
    pageSubtitle: "Stocks with top value for last six months",
    datafieldName: "sixMonthTotalValue",
    columnTitle: "6 MONTH VALUE",
  },
  {
    type: "value",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top values",
    pageSubtitle: "Stocks with top value for last one year",
    datafieldName: "oneYearTotalValue",
    columnTitle: "YEAR VALUE",
  },
  {
    type: "value",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top values",
    pageSubtitle: "Stocks with top value for last five years",
    datafieldName: "fiveYearTotalValue",
    columnTitle: "5 YEAR VALUE",
  },
  {
    type: "volume",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top volumes",
    pageSubtitle: "Stocks with top volume for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "volume",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top volumes",
    pageSubtitle: "Stocks with top volume for last one week",
    datafieldName: "oneWeekTotalVolume",
    columnTitle: "WEEK VOLUME",
  },
  {
    type: "volume",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top volumes",
    pageSubtitle: "Stocks with top volume for last one month",
    datafieldName: "oneMonthTotalVolume",
    columnTitle: "MONTH VOLUME",
  },
  {
    type: "volume",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top volumes",
    pageSubtitle: "Stocks with top volume for last six months",
    datafieldName: "sixMonthTotalVolume",
    columnTitle: "6 MONTH VOLUME",
  },
  {
    type: "volume",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top volumes",
    pageSubtitle: "Stocks with top volume for last one year",
    datafieldName: "oneYearTotalVolume",
    columnTitle: "YEAR VOLUME",
  },
  {
    type: "volume",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top volumes",
    pageSubtitle: "Stocks with top volume for last five years",
    datafieldName: "fiveYearTotalVolume",
    columnTitle: "5 YEAR VOLUME",
  },
  {
    type: "trade",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top trades",
    pageSubtitle: "Stocks with top trade for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "trade",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top trades",
    pageSubtitle: "Stocks with top trade for last one week",
    datafieldName: "oneWeekTotalTrade",
    columnTitle: "WEEK TRADE",
  },
  {
    type: "trade",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top trades",
    pageSubtitle: "Stocks with top trade for last one month",
    datafieldName: "oneMonthTotalTrade",
    columnTitle: "MONTH TRADE",
  },
  {
    type: "trade",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top trades",
    pageSubtitle: "Stocks with top trade for last six months",
    datafieldName: "sixMonthTotalTrade",
    columnTitle: "6 MONTH TRADE",
  },
  {
    type: "trade",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top trades",
    pageSubtitle: "Stocks with top trade for last one year",
    datafieldName: "oneYearTotalTrade",
    columnTitle: "YEAR TRADE",
  },
  {
    type: "trade",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top trades",
    pageSubtitle: "Stocks with top trade for last five years",
    datafieldName: "fiveYearTotalTrade",
    columnTitle: "5 YEAR TRADE",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "5px !important",
    marginRight: "12px",
    border: `1px solid #2962ff !important`,
    paddingLeft: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "12px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.primary.main,
    },
  },
  color: theme.palette.primary.main,
}));

export default function Dashboard({ initialdata }: any) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const variant = searchParams.get("variant");

  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = React.useState<any>(initialdata);

  const [typeAlignment, setTypeAlignment] = React.useState<any>(type);

  const [variantAlignment, setVariantAlignment] = React.useState<any>(variant);

  const selectedData: any = variantMap.find(
    (item) => item.type === typeAlignment && item.variant === variantAlignment
  );

  React.useEffect(() => {
    let newData;

    if (variantAlignment == "1d") {
      if (typeAlignment == "loser") {
        newData = [...initialdata].sort(
          (a: any, b: any) => a.percentChange - b.percentChange
        );
      }
      if (typeAlignment == "gainer") {
        newData = [...initialdata].sort(
          (a: any, b: any) => b.percentChange - a.percentChange
        );
      }
      if (typeAlignment == "value") {
        newData = [...initialdata].sort((a: any, b: any) => b.value - a.value);
      }
      if (typeAlignment == "volume") {
        newData = [...initialdata].sort(
          (a: any, b: any) => b.volume - a.volume
        );
      }
      if (typeAlignment == "trade") {
        newData = [...initialdata].sort((a: any, b: any) => b.trade - a.trade);
      }
    } else {
      if (typeAlignment == "loser") {
        newData = [...initialdata]?.sort(
          (a: any, b: any) =>
            a[selectedData.datafieldName] - b[selectedData.datafieldName]
        );
      } else {
        newData = [...initialdata]?.sort(
          (a: any, b: any) =>
            b[selectedData.datafieldName] - a[selectedData.datafieldName]
        );
      }
    }
    setData(newData);
  }, [typeAlignment, variantAlignment]);

  const columns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: 160,
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
      cellClassName: styles.tradingCodeCell,
    },
    {
      field: "sector",
      headerName: "SECTOR",
      align: "left",
      headerAlign: "left",
      width: 200,
    },
    {
      field: "category",
      headerName: "CATEGORY",
      align: "left",
      headerAlign: "left",
      width: 120,
    },
    {
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "left",
      headerAlign: "left",
      width: 100,
    },
    {
      field: "haltStatus",
      headerName: "",
      align: "left",
      headerAlign: "left",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            {params.value !== "none" ? (
              <Chip
                label="Halt"
                size="small"
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
    {
      field: "percentChange",
      headerName: "CHANGE (%)",
      align: "left",
      headerAlign: "left",
      width: 120,
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
        return params.value.toFixed(2) + "%";
      },
    },

    {
      field: selectedData.datafieldName,
      headerName: selectedData.columnTitle,
      align: "left",
      headerAlign: "left",
      width: 125,
      cellClassName: (params: any) => {
        let cellClass = "";
        if (["gainer", "loser"].includes(typeAlignment)) {
          if (params.value < 0) {
            cellClass = styles.downTrend;
          } else if (params.value > 0) {
            cellClass = styles.upTrend;
          } else {
            cellClass = styles.neutral;
          }
        }
        return cellClass;
      },
      valueFormatter: (params) => {
        let format;
        if (["value", "trade", "volume"].includes(typeAlignment)) {
          if (typeAlignment === "value") {
            format = (params.value / 10).toFixed(2);
          } else {
            format = params.value;
          }
        } else {
          format = params.value.toFixed(2) + "%";
        }
        return format;
      },
    },
    {
      field: "volume",
      headerName: "VOLUME",
      align: "left",
      headerAlign: "left",
      width: 130,
    },
    {
      field: "value",
      headerName: "VALUE (CRORE)",
      align: "left",
      headerAlign: "left",
      width: 120,
      valueFormatter: (params) => {
        return (params.value / 10).toFixed(2);
      },
    },
    {
      field: "trade",
      headerName: "TRADE",
      align: "left",
      headerAlign: "left",
      width: 100,
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
  const handleVariantAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setVariantAlignment(newAlignment);
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
        }}
      >
        <ToggleButtonGroup
          size="small"
          value={typeAlignment}
          exclusive
          onChange={handleTypeAlignmentChange}
          aria-label="Platform"
        >
          <ToggleButton value="gainer" sx={{ px: { xs: 1.4, sm: 4 } }}>
            Gainer
          </ToggleButton>
          <ToggleButton value="loser" sx={{ px: { xs: 1.4, sm: 4 } }}>
            Loser
          </ToggleButton>
          <ToggleButton value="volume" sx={{ px: { xs: 1.4, sm: 4 } }}>
            Volume
          </ToggleButton>
          <ToggleButton value="value" sx={{ px: { xs: 1.4, sm: 4 } }}>
            Value
          </ToggleButton>
          <ToggleButton value="trade" sx={{ px: { xs: 1.4, sm: 4 } }}>
            Trade
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={variantAlignment}
          exclusive
          onChange={handleVariantAlignmentChange}
          aria-label="Platform"
        >
          {variantMap
            .filter((item) => item.type === "gainer")
            .map((item) => (
              <StyledToggleButton
                value={item.variant}
                key={item.variant}
                sx={{ px: { xs: 1.5, sm: 2.5 } }}
              >
                {matchesSmUp ? item.title : item.titleSmall}
              </StyledToggleButton>
            ))}
        </StyledToggleButtonGroup>
      </Box>
      <Box
        sx={{
          my: 3,
          maxWidth: { xs: 280, sm: 600 },
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}
          color="text.primary"
        >
          {selectedData.pageTitle}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: ".875rem", sm: "1rem" },
            // display: { xs: "none", sm: "block" },
          }}
          color="text.secondary"
        >
          {selectedData.pageSubtitle}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        {matchesSmUp && (
          <DataGrid
            rows={data}
            columns={columns}
            hideFooter={true}
            columnVisibilityModel={{
              [selectedData.datafieldName]: selectedData.datafieldName
                ? true
                : false,
            }}
            sx={{
              ".MuiDataGrid-columnHeader": {
                color: "text.primary",
                fontSize: ".85rem",
              },
              ".MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.43rem",
                whiteSpace: "normal",
              },
              ".MuiDataGrid-cell": {
                fontWeight: 500,
              },
              border: "none",
              width: selectedData.datafieldName ? 1250 : 1120,
              mx: "auto",
              mb: 6,
              mt: 5,
              fontSize: ".9rem",
              fontWeight: 500,
            }}
          />
        )}

        {matchesSmDown &&
          data.map((item: any, index: number) => (
            <Box key={index}>
              <MobileViewPriceCard item={item} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
