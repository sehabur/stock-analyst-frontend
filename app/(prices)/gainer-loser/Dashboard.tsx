"use client";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AreaChart from "@/components/charts/AreaChart";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./Dashboard.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const variantMap = [
  {
    type: "gainer",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top gainers",
    pageSubtitle: "Stocks with a price gain against the previous day's close",
    datafield: "gainerDaily",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "gainer",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top gainers",
    pageSubtitle: "Stocks with a price gain against one week before data",
    datafield: "gainerOneWeek",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEK CHANGE(%)",
  },
  {
    type: "gainer",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top gainers",
    pageSubtitle: "Stocks with a price gain against one month before data",
    datafield: "gainerOneMonth",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTH CHANGE(%)",
  },
  {
    type: "gainer",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top gainers",
    pageSubtitle: "Stocks with a price gain against fix month before data",
    datafield: "gainerSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE(%)",
  },
  {
    type: "gainer",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top gainers",
    pageSubtitle: "Stocks with a price gain against one year before data",
    datafield: "gainerOneYear",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEAR CHANGE(%)",
  },
  {
    type: "gainer",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top gainers",
    pageSubtitle: "Stocks with a price gain against five year before data",
    datafield: "gainerFiveYear",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEAR CHANGE(%)",
  },
  // {
  //   type: "gainer",
  //   variant: "alltime",
  //   title: "All time",
  //   titleSmall: "Alltime",
  //   datafield: "gainerAllTime",
  //   datafieldName: null,
  //   columnTitle: null,
  // },
  {
    type: "loser",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top losers",
    pageSubtitle: "Stocks with a price lose against the previous day's close",
    datafield: "loserDaily",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "loser",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top losers",
    pageSubtitle: "Stocks with a price lose against one week before data",
    datafield: "loserOneWeek",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEK CHANGE(%)",
  },
  {
    type: "loser",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top losers",
    pageSubtitle: "Stocks with a price lose against one month before data",
    datafield: "loserOneMonth",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTH CHANGE(%)",
  },
  {
    type: "loser",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top losers",
    pageSubtitle: "Stocks with a price lose against fix month before data",
    datafield: "loserSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE(%)",
  },
  {
    type: "loser",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top losers",
    pageSubtitle: "Stocks with a price lose against one year before data",
    datafield: "loserOneYear",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEAR CHANGE(%)",
  },
  {
    type: "loser",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top losers",
    pageSubtitle: "Stocks with a price lose against five year before data",
    datafield: "loserFiveYear",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEAR CHANGE(%)",
  },
  // {
  //   type: "loser",
  //   variant: "alltime",
  //   title: "All time",
  //   titleSmall: "Alltime",
  //   datafield: "gainerAllTime",
  //   datafieldName: null,
  //   columnTitle: null,
  // },
  {
    type: "gainer",
    variant: "trade",
    title: "Trade",
    titleSmall: "TRD",
    pageTitle: "Top shares by trade",
    pageSubtitle: "Stocks with highest trade today",
    datafield: "gainerTrade",
    datafieldName: "trade",
    columnTitle: "TRADE",
  },
  {
    type: "loser",
    variant: "trade",
    title: "Trade",
    titleSmall: "Trd",
    pageTitle: "Down shares by trade",
    pageSubtitle: "Stocks with lowest trade today",
    datafield: "loserTrade",
    datafieldName: "trade",
    columnTitle: "TRADE",
  },
  {
    type: "gainer",
    variant: "volume",
    title: "Volume",
    titleSmall: "Vol",
    pageTitle: "Top shares by volume",
    pageSubtitle: "Stocks with highest volume today",
    datafield: "gainerVolume",
    datafieldName: "volume",
    columnTitle: "VOLUME",
  },
  {
    type: "loser",
    variant: "volume",
    title: "Volume",
    titleSmall: "Vol",
    pageTitle: "Down shares by volume",
    pageSubtitle: "Stocks with lowest volume today",
    datafield: "loserVolume",
    datafieldName: "volume",
    columnTitle: "VOLUME",
  },
  {
    type: "gainer",
    variant: "value",
    title: "Value",
    titleSmall: "Val",
    pageTitle: "Top shares by value",
    pageSubtitle: "Stocks with highest value today",
    datafield: "gainerValue",
    datafieldName: "value",
    columnTitle: "VALUE (BDT)",
  },
  {
    type: "loser",
    variant: "value",
    title: "Value",
    titleSmall: "Val",
    pageTitle: "Down shares by value",
    pageSubtitle: "Stocks with lowest value today",
    datafield: "loserValue",
    datafieldName: "value",
    columnTitle: "VALUE (BDT)",
  },
];

export default function Dashboard({ data }: any) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const variant = searchParams.get("variant");

  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [typeAlignment, setTypeAlignment] = React.useState(type);

  const [variantAlignment, setVariantAlignment] = React.useState<any>(variant);

  const selectedData: any = variantMap.find(
    (item) => item.type === typeAlignment && item.variant === variantAlignment
  );

  const mobileColumns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "CODE",
      width: 120,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Link href={`/stock-details/${params.value}`}>{params.value}</Link>
        );
      },
      cellClassName: styles.tradingCodeCell,
    },
    {
      field: "percentChange",
      headerName: "CH(%)",
      align: "right",
      headerAlign: "right",
      disableColumnMenu: true,
      width: 100,
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
      field: selectedData.datafieldName,
      headerName: selectedData.columnTitle,
      align: "right",
      headerAlign: "right",
      disableColumnMenu: true,
      width: 110,
      cellClassName: (params: any) => {
        let cellClass;
        if (params.value < 0) {
          cellClass = styles.downTrend;
        } else if (params.value > 0) {
          cellClass = styles.upTrend;
        } else {
          cellClass = styles.neutral;
        }
        if (["value", "trade", "volume"].includes(variantAlignment)) {
          cellClass = "";
        }
        return cellClass;
      },
      valueFormatter: (params) => {
        let format;
        if (["value", "trade", "volume"].includes(variantAlignment)) {
          if (variantAlignment === "value") {
            format = params.value * 1000000;
          } else {
            format = params.value;
          }
        } else {
          format = params.value + "%";
        }
        return format;
      },
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: 140,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Link href={`/stock-details/${params.value}`}>{params.value}</Link>
        );
      },
      cellClassName: styles.tradingCodeCell,
    },
    {
      field: "category",
      headerName: "CATEGORY",
      align: "left",
      headerAlign: "left",
      width: 120,
    },
    {
      field: "sector",
      headerName: "SECTOR",
      align: "left",
      headerAlign: "left",
      width: 260,
    },
    {
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "left",
      headerAlign: "left",
      width: 110,
    },
    {
      field: "percentChange",
      headerName: "DAY CHANGE(%)",
      align: "left",
      headerAlign: "left",
      width: 150,
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
      field: selectedData.datafieldName,
      headerName: selectedData.columnTitle,
      align: "left",
      headerAlign: "left",
      width: 160,
      cellClassName: (params: any) => {
        let cellClass;
        if (params.value < 0) {
          cellClass = styles.downTrend;
        } else if (params.value > 0) {
          cellClass = styles.upTrend;
        } else {
          cellClass = styles.neutral;
        }
        if (["value", "trade", "volume"].includes(variantAlignment)) {
          cellClass = "";
        }
        return cellClass;
      },
      valueFormatter: (params) => {
        let format;
        if (["value", "trade", "volume"].includes(variantAlignment)) {
          if (variantAlignment === "value") {
            format = params.value * 1000000;
          } else {
            format = params.value;
          }
        } else {
          format = params.value + "%";
        }
        return format;
      },
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
          <ToggleButton value="gainer" sx={{ px: 4 }}>
            Gainer
          </ToggleButton>
          <ToggleButton value="loser" sx={{ px: 4 }}>
            Looser
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
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={variantAlignment}
          exclusive
          onChange={handleVariantAlignmentChange}
          aria-label="Platform"
        >
          {variantMap
            .filter((item) => item.type === "gainer")
            .map((item) => (
              <ToggleButton
                value={item.variant}
                key={item.variant}
                sx={{ px: { xs: 1.5, sm: 2.5 } }}
              >
                {matchesSmUp ? item.title : item.titleSmall}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
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
          {selectedData.pageTitle}
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", textAlign: "center" }}
          color="text.secondary"
        >
          {selectedData.pageSubtitle}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={data[selectedData.datafield]}
          columns={matchesSmUp ? columns : mobileColumns}
          hideFooter={true}
          columnVisibilityModel={{
            [selectedData.datafieldName]: selectedData.datafieldName
              ? true
              : false,
          }}
          sx={{
            ".MuiDataGrid-columnHeader": {
              color: "text.secondary",
            },
            border: "none",
            width: matchesSmUp
              ? selectedData.datafieldName
                ? 950
                : 780
              : selectedData.datafieldName
              ? "90vw"
              : "65vw",
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
