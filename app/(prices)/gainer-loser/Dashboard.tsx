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
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import AreaChart from "@/components/charts/AreaChart";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./Dashboard.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { styled } from "@mui/material/styles";

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
    columnTitle: "WEEK CHANGE",
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
    columnTitle: "MONTH CHANGE",
  },
  {
    type: "gainer",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top gainers",
    pageSubtitle: "Stocks with a price gain against six month before data",
    datafield: "gainerSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE",
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
    columnTitle: "YEAR CHANGE",
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
    columnTitle: "5 YEAR CHANGE",
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
    columnTitle: "WEEK CHANGE",
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
    columnTitle: "MONTH CHANGE",
  },
  {
    type: "loser",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top losers",
    pageSubtitle: "Stocks with a price lose against six month before data",
    datafield: "loserSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE",
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
    columnTitle: "YEAR CHANGE",
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
    columnTitle: "5 YEAR CHANGE",
  },
  {
    type: "value",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top values",
    pageSubtitle: "Stocks with a value gain against the previous day's value",
    datafield: "valueDaily",
    datafieldName: null,
    columnTitle: "VALUE (MN)",
  },
  {
    type: "value",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top values",
    pageSubtitle: "Stocks with a value gain against one week before value",
    datafield: "valueOneWeek",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEK CHANGE",
  },
  {
    type: "value",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top values",
    pageSubtitle: "Stocks with a value gain against one month before value",
    datafield: "valueOneMonth",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTH CHANGE",
  },
  {
    type: "value",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top values",
    pageSubtitle: "Stocks with a value gain against six month before value",
    datafield: "valueSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE",
  },
  {
    type: "value",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top values",
    pageSubtitle: "Stocks with a value gain against one year before value",
    datafield: "valueOneYear",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEAR CHANGE",
  },
  {
    type: "value",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top values",
    pageSubtitle: "Stocks with a value gain against five year before value",
    datafield: "valueFiveYear",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEAR CHANGE",
  },
  {
    type: "volume",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top volumes",
    pageSubtitle: "Stocks with a volume gain against the previous day's volume",
    datafield: "volumeDaily",
    datafieldName: null,
    columnTitle: "VOLUME",
  },
  {
    type: "volume",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top volumes",
    pageSubtitle: "Stocks with a volume gain against one week before data",
    datafield: "volumeOneWeek",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEK CHANGE",
  },
  {
    type: "volume",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top volumes",
    pageSubtitle: "Stocks with a volume gain against one month before volume",
    datafield: "volumeOneMonth",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTH CHANGE",
  },
  {
    type: "volume",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top volumes",
    pageSubtitle: "Stocks with a volume gain against six month before volume",
    datafield: "volumeSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE",
  },
  {
    type: "volume",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top volumes",
    pageSubtitle: "Stocks with a volume gain against one year before volume",
    datafield: "volumeOneYear",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEAR CHANGE",
  },
  {
    type: "volume",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top volumes",
    pageSubtitle: "Stocks with a volume gain against five year before volume",
    datafield: "volumeFiveYear",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEAR CHANGE",
  },
  {
    type: "trade",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top trades",
    pageSubtitle: "Stocks with a trade gain against the previous day's trade",
    datafield: "tradeDaily",
    datafieldName: null,
    columnTitle: "TRADE",
  },
  {
    type: "trade",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top trades",
    pageSubtitle: "Stocks with a trade gain against one week before trade",
    datafield: "tradeOneWeek",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEK CHANGE",
  },
  {
    type: "trade",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top trades",
    pageSubtitle: "Stocks with a trade gain against one month before trade",
    datafield: "tradeOneMonth",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTH CHANGE",
  },
  {
    type: "trade",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top trades",
    pageSubtitle: "Stocks with a trade gain against six month before trade",
    datafield: "tradeSixMonth",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTH CHANGE",
  },
  {
    type: "trade",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top trades",
    pageSubtitle: "Stocks with a trade gain against one year before trade",
    datafield: "tradeOneYear",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEAR CHANGE",
  },
  {
    type: "trade",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top trades",
    pageSubtitle: "Stocks with a trade gain against five year before trade",
    datafield: "tradeFiveYear",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEAR CHANGE",
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

  function getHeaderName(data: any) {
    return data.find(
      (item: any) => item.type === selectedData.type && item.variant === "1d"
    ).columnTitle;
  }

  const mobileColumns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: 130,
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
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "left",
      headerAlign: "left",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: selectedData.type,
      headerName: getHeaderName(variantMap),
      align: "left",
      headerAlign: "left",
      width: 110,
      disableColumnMenu: true,
    },
    {
      field: "percentChange",
      headerName: "DAY CHANGE",
      align: "left",
      headerAlign: "left",
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
      align: "left",
      headerAlign: "left",
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
      field: selectedData.type,
      headerName: getHeaderName(variantMap),
      align: "left",
      headerAlign: "left",
      width: 110,
    },
    {
      field: "percentChange",
      headerName: "DAY CHANGE",
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
          // color="primary"
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
            percentChange:
              matchesSmUp &&
              !["volume", "value", "trade"].includes(selectedData.type)
                ? true
                : selectedData.variant !== "1d"
                ? false
                : true,
            ltp: ["volume", "value", "trade"].includes(selectedData.type)
              ? false
              : true,
            [selectedData.type]: ["value", "trade", "volume"].includes(
              selectedData.type
            ),
          }}
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
            width: matchesSmUp
              ? selectedData.datafieldName
                ? 950
                : 880
              : "90vw",
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
