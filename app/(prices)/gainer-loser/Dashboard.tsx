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
import { isWithinPreviousTwoDays } from "_helper/getter";

// const variantMap = [
//   {
//     type: "gainer",
//     variant: "1d",
//     title: "Day",
//     titleSmall: "1D",
//     pageTitle: "Daily top gainers",
//     pageSubtitle: "Stocks with a price gain against the previous day's price",
//     datafieldName: null,
//     columnTitle: null,
//   },
//   {
//     type: "gainer",
//     variant: "1w",
//     title: "Week",
//     titleSmall: "1W",
//     pageTitle: "Weekly top gainers",
//     pageSubtitle: "Stocks with a price gain against one week before price",
//     datafieldName: "oneWeekPercentChange",
//     columnTitle: "WEEKLY CHANGE (%)",
//   },
//   {
//     type: "gainer",
//     variant: "1m",
//     title: "Month",
//     titleSmall: "1M",
//     pageTitle: "Monthly top gainers",
//     pageSubtitle: "Stocks with a price gain against one month before price",
//     datafieldName: "oneMonthPercentChange",
//     columnTitle: "MONTHLY CHANGE (%)",
//   },
//   {
//     type: "gainer",
//     variant: "6m",
//     title: "6 Months",
//     titleSmall: "6M",
//     pageTitle: "6 Month top gainers",
//     pageSubtitle: "Stocks with a price gain against six months before price",
//     datafieldName: "sixMonthPercentChange",
//     columnTitle: "6 MONTHLY CHANGE (%)",
//   },
//   {
//     type: "gainer",
//     variant: "1y",
//     title: "Year",
//     titleSmall: "1Y",
//     pageTitle: "Yearly top gainers",
//     pageSubtitle: "Stocks with a price gain against one year before price",
//     datafieldName: "oneYearPercentChange",
//     columnTitle: "YEARLY CHANGE (%)",
//   },
//   {
//     type: "gainer",
//     variant: "5y",
//     title: "5 Years",
//     titleSmall: "5Y",
//     pageTitle: "5 Year top gainers",
//     pageSubtitle: "Stocks with a price gain against five years before price",
//     datafieldName: "fiveYearPercentChange",
//     columnTitle: "5 YEARLY CHANGE (%)",
//   },
//   {
//     type: "loser",
//     variant: "1d",
//     title: "Day",
//     titleSmall: "1D",
//     pageTitle: "Daily top losers",
//     pageSubtitle: "Stocks with a price lose against the previous day's price",
//     datafieldName: null,
//     columnTitle: null,
//   },
//   {
//     type: "loser",
//     variant: "1w",
//     title: "Week",
//     titleSmall: "1W",
//     pageTitle: "Weekly top losers",
//     pageSubtitle: "Stocks with a price lose against one week before price",
//     datafieldName: "oneWeekPercentChange",
//     columnTitle: "WEEKLY CHANGE (%)",
//   },
//   {
//     type: "loser",
//     variant: "1m",
//     title: "Month",
//     titleSmall: "1M",
//     pageTitle: "Monthly top losers",
//     pageSubtitle: "Stocks with a price lose against one month before price",
//     datafieldName: "oneMonthPercentChange",
//     columnTitle: "MONTHLY CHANGE (%)",
//   },
//   {
//     type: "loser",
//     variant: "6m",
//     title: "6 Months",
//     titleSmall: "6M",
//     pageTitle: "6 Month top losers",
//     pageSubtitle: "Stocks with a price lose against six months before price",
//     datafieldName: "sixMonthPercentChange",
//     columnTitle: "6 MONTHLY CHANGE (%)",
//   },
//   {
//     type: "loser",
//     variant: "1y",
//     title: "Year",
//     titleSmall: "1Y",
//     pageTitle: "Yearly top losers",
//     pageSubtitle: "Stocks with a price lose against one year before price",
//     datafieldName: "oneYearPercentChange",
//     columnTitle: "YEARLY CHANGE (%)",
//   },
//   {
//     type: "loser",
//     variant: "5y",
//     title: "5 Years",
//     titleSmall: "5Y",
//     pageTitle: "5 Year top losers",
//     pageSubtitle: "Stocks with a price lose against five years before price",
//     datafieldName: "fiveYearPercentChange",
//     columnTitle: "5 YEARLY CHANGE (%)",
//   },
//   {
//     type: "value",
//     variant: "1d",
//     title: "Day",
//     titleSmall: "1D",
//     pageTitle: "Daily top values",
//     pageSubtitle: "Stocks with top value for today",
//     datafieldName: null,
//     columnTitle: null,
//   },
//   {
//     type: "value",
//     variant: "1w",
//     title: "Week",
//     titleSmall: "1W",
//     pageTitle: "Weekly top values",
//     pageSubtitle: "Stocks with top value for last one week",
//     datafieldName: "oneWeekTotalValue",
//     columnTitle: "WEEK VALUE",
//   },
//   {
//     type: "value",
//     variant: "1m",
//     title: "Month",
//     titleSmall: "1M",
//     pageTitle: "Monthly top values",
//     pageSubtitle: "Stocks with top value for last one month",
//     datafieldName: "oneMonthTotalValue",
//     columnTitle: "MONTH VALUE",
//   },
//   {
//     type: "value",
//     variant: "6m",
//     title: "6 Months",
//     titleSmall: "6M",
//     pageTitle: "6 Month top values",
//     pageSubtitle: "Stocks with top value for last six months",
//     datafieldName: "sixMonthTotalValue",
//     columnTitle: "6 MONTH VALUE",
//   },
//   {
//     type: "value",
//     variant: "1y",
//     title: "Year",
//     titleSmall: "1Y",
//     pageTitle: "Yearly top values",
//     pageSubtitle: "Stocks with top value for last one year",
//     datafieldName: "oneYearTotalValue",
//     columnTitle: "YEAR VALUE",
//   },
//   {
//     type: "value",
//     variant: "5y",
//     title: "5 Years",
//     titleSmall: "5Y",
//     pageTitle: "5 Year top values",
//     pageSubtitle: "Stocks with top value for last five years",
//     datafieldName: "fiveYearTotalValue",
//     columnTitle: "5 YEAR VALUE",
//   },
//   {
//     type: "volume",
//     variant: "1d",
//     title: "Day",
//     titleSmall: "1D",
//     pageTitle: "Daily top volumes",
//     pageSubtitle: "Stocks with top volume for today",
//     datafieldName: null,
//     columnTitle: null,
//   },
//   {
//     type: "volume",
//     variant: "1w",
//     title: "Week",
//     titleSmall: "1W",
//     pageTitle: "Weekly top volumes",
//     pageSubtitle: "Stocks with top volume for last one week",
//     datafieldName: "oneWeekTotalVolume",
//     columnTitle: "WEEK VOLUME",
//   },
//   {
//     type: "volume",
//     variant: "1m",
//     title: "Month",
//     titleSmall: "1M",
//     pageTitle: "Monthly top volumes",
//     pageSubtitle: "Stocks with top volume for last one month",
//     datafieldName: "oneMonthTotalVolume",
//     columnTitle: "MONTH VOLUME",
//   },
//   {
//     type: "volume",
//     variant: "6m",
//     title: "6 Months",
//     titleSmall: "6M",
//     pageTitle: "6 Month top volumes",
//     pageSubtitle: "Stocks with top volume for last six months",
//     datafieldName: "sixMonthTotalVolume",
//     columnTitle: "6 MONTH VOLUME",
//   },
//   {
//     type: "volume",
//     variant: "1y",
//     title: "Year",
//     titleSmall: "1Y",
//     pageTitle: "Yearly top volumes",
//     pageSubtitle: "Stocks with top volume for last one year",
//     datafieldName: "oneYearTotalVolume",
//     columnTitle: "YEAR VOLUME",
//   },
//   {
//     type: "volume",
//     variant: "5y",
//     title: "5 Years",
//     titleSmall: "5Y",
//     pageTitle: "5 Year top volumes",
//     pageSubtitle: "Stocks with top volume for last five years",
//     datafieldName: "fiveYearTotalVolume",
//     columnTitle: "5 YEAR VOLUME",
//   },
//   {
//     type: "trade",
//     variant: "1d",
//     title: "Day",
//     titleSmall: "1D",
//     pageTitle: "Daily top trades",
//     pageSubtitle: "Stocks with top trade for today",
//     datafieldName: null,
//     columnTitle: null,
//   },
//   {
//     type: "trade",
//     variant: "1w",
//     title: "Week",
//     titleSmall: "1W",
//     pageTitle: "Weekly top trades",
//     pageSubtitle: "Stocks with top trade for last one week",
//     datafieldName: "oneWeekTotalTrade",
//     columnTitle: "WEEK TRADE",
//   },
//   {
//     type: "trade",
//     variant: "1m",
//     title: "Month",
//     titleSmall: "1M",
//     pageTitle: "Monthly top trades",
//     pageSubtitle: "Stocks with top trade for last one month",
//     datafieldName: "oneMonthTotalTrade",
//     columnTitle: "MONTH TRADE",
//   },
//   {
//     type: "trade",
//     variant: "6m",
//     title: "6 Months",
//     titleSmall: "6M",
//     pageTitle: "6 Month top trades",
//     pageSubtitle: "Stocks with top trade for last six months",
//     datafieldName: "sixMonthTotalTrade",
//     columnTitle: "6 MONTH TRADE",
//   },
//   {
//     type: "trade",
//     variant: "1y",
//     title: "Year",
//     titleSmall: "1Y",
//     pageTitle: "Yearly top trades",
//     pageSubtitle: "Stocks with top trade for last one year",
//     datafieldName: "oneYearTotalTrade",
//     columnTitle: "YEAR TRADE",
//   },
//   {
//     type: "trade",
//     variant: "5y",
//     title: "5 Years",
//     titleSmall: "5Y",
//     pageTitle: "5 Year top trades",
//     pageSubtitle: "Stocks with top trade for last five years",
//     datafieldName: "fiveYearTotalTrade",
//     columnTitle: "5 YEAR TRADE",
//   },
// ];

const typeList = [
  {
    value: "gainer",
    title: "Gainer",
  },
  {
    value: "loser",
    title: "Loser",
  },
  {
    value: "volume",
    title: "Volume",
  },
  {
    value: "value",
    title: "Value",
  },
  {
    value: "trade",
    title: "Trade",
  },
];

const variantList = [
  {
    value: "day",
    title: "Day",
    titleSmall: "1D",
  },
  {
    value: "oneWeek",
    title: "Week",
    titleSmall: "1W",
  },
  {
    value: "oneMonth",
    title: "Month",
    titleSmall: "1M",
  },
  {
    value: "sixMonth",
    title: "6 Months",
    titleSmall: "6M",
  },
  {
    value: "oneYear",
    title: "Year",
    titleSmall: "1Y",
  },
  {
    value: "fiveYear",
    title: "5 Years",
    titleSmall: "5Y",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "5px !important",
    marginRight: "10px",
    marginLeft: "10px",
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

const StyledMainToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    marginRight: "8px",
    marginLeft: "8px",
  },
}));

const StyledMainToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "4px !important",
    marginRight: "10px",
    border: `1px solid lightgray !important`,
    // paddingLeft: "8px",
    // paddingRight: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
}));

export default function Dashboard({ initialdata }: any) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const variant = searchParams.get("variant");

  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = React.useState<any>([]);

  const [typeAlignment, setTypeAlignment] = React.useState<any>(type);

  const [variantAlignment, setVariantAlignment] = React.useState<any>(variant);

  // const selectedData: any = variantMap.find(
  //   (item) => item.type === typeAlignment && item.variant === variantAlignment
  // );

  React.useEffect(() => {
    let newData = initialdata.map((item: any) => ({
      id: item._id,
      tradingCode: item.tradingCode,
      ltp: item.ltp,
      sector: item.sector,
      category: item.category,
      haltStatus: isWithinPreviousTwoDays(item.recordDate)
        ? "spot"
        : item.haltStatus,
      recordDate: item.recordDate,
      change: item[variantAlignment].change,
      percentChange: item[variantAlignment].percentChange,
      volume: item[variantAlignment].volume,
      value: item[variantAlignment].value,
      trade: item[variantAlignment].trade,
    }));

    if (typeAlignment == "gainer") {
      newData.sort((a: any, b: any) => b.percentChange - a.percentChange);
    } else if (typeAlignment == "loser") {
      newData.sort((a: any, b: any) => a.percentChange - b.percentChange);
    } else {
      newData.sort((a: any, b: any) => b[typeAlignment] - a[typeAlignment]);
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
      align: "center",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "center",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "haltStatus",
      headerName: "",
      align: "center",
      headerAlign: "center",
      width: 80,
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
              />
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    {
      field: "change",
      headerName: "CHANGE",
      align: "center",
      headerAlign: "center",
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
    },
    {
      field: "percentChange",
      headerName: "CHANGE (%)",
      align: "center",
      headerAlign: "center",
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
    // {
    //   field: selectedData.datafieldName,
    //   headerName: selectedData.columnTitle,
    //   align: "center",
    //   headerAlign: "center",
    //   width: 125,
    //   cellClassName: (params: any) => {
    //     let cellClass = "";
    //     if (["gainer", "loser"].includes(typeAlignment)) {
    //       if (params.value < 0) {
    //         cellClass = styles.downTrend;
    //       } else if (params.value > 0) {
    //         cellClass = styles.upTrend;
    //       } else {
    //         cellClass = styles.neutral;
    //       }
    //     }
    //     return cellClass;
    //   },
    //   valueFormatter: (params) => {
    //     let format;
    //     if (["value", "trade", "volume"].includes(typeAlignment)) {
    //       if (typeAlignment === "value") {
    //         format = (params.value / 10).toFixed(2);
    //       } else {
    //         format = params.value;
    //       }
    //     } else {
    //       format = params.value.toFixed(2) + "%";
    //     }
    //     return format;
    //   },
    // },
    {
      field: "volume",
      headerName: "VOLUME",
      align: "center",
      headerAlign: "center",
      width: 130,
    },
    {
      field: "value",
      headerName: "VALUE (CR)",
      align: "center",
      headerAlign: "center",
      width: 120,
      valueFormatter: (params) => {
        return (params.value / 10).toFixed(2);
      },
    },
    {
      field: "trade",
      headerName: "TRADE",
      align: "center",
      headerAlign: "center",
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
        <StyledMainToggleButtonGroup
          size="small"
          value={typeAlignment}
          exclusive
          onChange={handleTypeAlignmentChange}
          aria-label="Platform"
          color="primary"
        >
          {typeList.map((item: any) => (
            <StyledMainToggleButton
              key={item.value}
              value={item.value}
              sx={{ px: { xs: 1.2, sm: 3 } }}
            >
              {item.title}
            </StyledMainToggleButton>
          ))}
        </StyledMainToggleButtonGroup>
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
          {variantList.map((item) => (
            <StyledToggleButton
              value={item.value}
              key={item.value}
              sx={{ px: { xs: 1.5, sm: 2.5 } }}
            >
              {matchesSmUp ? item.title : item.titleSmall}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Box>
      {/* <Box
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
      </Box> */}
      <Box sx={{ width: "100%" }}>
        {matchesSmUp && (
          <DataGrid
            rows={data}
            columns={columns}
            hideFooter={true}
            // columnVisibilityModel={{
            //   [selectedData.datafieldName]: selectedData.datafieldName
            //     ? true
            //     : false,
            // }}
            sx={{
              ".MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.43rem",
                whiteSpace: "normal",
                fontWeight: 700,
              },
              ".MuiDataGrid-cell": {
                fontWeight: 500,
              },
              border: "none",
              width: 1250,
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
