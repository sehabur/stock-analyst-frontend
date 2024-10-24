import CandlestickChart from "@/components/charts/CandlestickChart";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import TabView from "./TabView";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import Link from "next/link";

import { redirect } from "next/navigation";

import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import Trades from "./_component/Trades";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import { isWithinPreviousTwoDays } from "_helper/getter";

const getStockDetails = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/stock/${tradingCode}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// const getMarketDepth = async (tradingCode: string) => {
//   const res = await fetch(
//     `${process.env.BACKEND_URL}/api/prices/marketDepth?inst=${tradingCode}`,
//     {
//       next: { revalidate: 0 },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// };

const getNews = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/news/${tradingCode}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getBlocktr = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/blockTr/${tradingCode}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const addPlusSign = (value: number) => {
  let result;
  if (value > 0) {
    result = "+" + value.toFixed(2);
  } else if (value < 0) {
    result = value.toFixed(2);
  } else {
    result = value;
  }
  return result;
};

const getLatestPrice = (latest: any) => {
  let price, time;
  if (latest.isNullDataAtDse === "YES") {
    price = latest.ycp;
    time = DateTime.fromISO(latest.date)
      .minus({ days: 1 })
      .toFormat("dd MMM, 14:30");
  } else {
    price = latest.close;
    time = DateTime.fromISO(latest.time)
      .plus({ hours: 6 })
      .toFormat("dd MMM, HH:mm");
  }
  return {
    price,
    time: "Last updated on " + time,
  };
};

export async function generateStaticParams() {
  const symbols = await fetch(
    `${process.env.BACKEND_URL}/api/prices/getStocksList`,
    {
      next: { revalidate: 0 },
    }
  ).then((res) => res.json());

  return symbols.map((symbol: string) => ({
    tradingCode: symbol,
  }));
}

export async function generateMetadata({ params }: any) {
  const { tradingCode } = params;
  return {
    title: `${tradingCode} Price, News, Financial Analysis`,
    description: `Get finacial data and prepared analytics for ${tradingCode} helping you find the perfect trade`,
  };
}

export default async function StockDetails({ params }: any) {
  const { tradingCode } = params;

  const [stock, news, blocktr] = await Promise.all([
    getStockDetails(tradingCode),
    getNews(tradingCode),
    getBlocktr(tradingCode),
  ]);

  const latestPriceData = getLatestPrice(stock.latest);

  const textColor =
    stock.latest.change === 0
      ? "primary.main"
      : stock.latest.change < 0
      ? "error.main"
      : "success.main";

  const isSpotEnabled = isWithinPreviousTwoDays(stock.fundamentals.recordDate);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ py: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            maxWidth: 1250,
            mx: "auto",
            px: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "space-around" },
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
                fontWeight: 500,
              }}
            >
              {stock.fundamentals.companyName}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Chip
                label={stock.fundamentals.tradingCode}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  fontSize: "1rem",
                  fontWeight: 500,
                  mt: 1,
                }}
              />
              <Chip
                label={`Category ${stock.fundamentals.category}`}
                sx={{
                  borderRadius: 1,
                  mx: { xs: 0.8, sm: 2 },
                  fontSize: ".875rem",
                  mt: 1,
                }}
              />
              <Chip
                label={stock.fundamentals.sector}
                sx={{
                  borderRadius: 1,
                  fontSize: ".875rem",
                  mt: 1,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "2.1rem", sm: "2.4rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {latestPriceData.price.toFixed(2)}
              </Typography>

              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.1rem", sm: "1.1rem" },
                  ml: 0.8,
                }}
              >
                BDT
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.4rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  mx: 2,
                }}
              >
                {addPlusSign(stock.latest.change)}
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.4rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  mr: 2,
                }}
              >
                {stock.latest.change !== 0
                  ? addPlusSign(stock.latest.percentChange)
                  : 0}
                {"%"}
              </Typography>

              {stock.haltStatus && stock.haltStatus != "none" && (
                <Box>
                  <Chip
                    label="Halt"
                    size="small"
                    // variant="outlined"
                    color={stock.haltStatus == "buy" ? "success" : "error"}
                    sx={{
                      // borderRadius: 1,
                      fontSize: ".875rem",
                      px: 0.3,
                      mt: -1.3,
                      mr: 2,
                    }}
                  />
                </Box>
              )}

              {isSpotEnabled && (
                <Box>
                  <Chip
                    label="Spot"
                    size="small"
                    // variant="outlined"
                    color="warning"
                    sx={{
                      // borderRadius: 1,
                      fontSize: ".875rem",
                      px: 0.3,
                      mt: -1.3,
                      mr: 2,
                    }}
                  />
                </Box>
              )}

              <Tooltip
                title={`Market is ${stock.marketOpenStatus.toLowerCase()} now`}
                enterTouchDelay={10}
                arrow
              >
                <Chip
                  label={stock.marketOpenStatus}
                  // variant="outlined"
                  size="small"
                  icon={
                    stock.marketOpenStatus == "Open" ? (
                      <RadioButtonCheckedRoundedIcon color="success" />
                    ) : stock.marketOpenStatus == "Closed" ? (
                      <DoDisturbOnRoundedIcon color="error" />
                    ) : (
                      <DoDisturbOnRoundedIcon color="warning" />
                    )
                  }
                  sx={{ fontSize: ".875rem", px: 0.3 }}
                />
              </Tooltip>
            </Box>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: ".9rem",
                mt: { xs: 0.8, sm: 0 },
              }}
            >
              {latestPriceData.time}
            </Typography>
            <Trades
              data={stock.minute}
              tradingCode={stock.fundamentals.tradingCode}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.8 }}>
            <FavoriteButton tradingCode={stock.fundamentals.tradingCode} />
            <Button
              component={Link}
              href={`/supercharts?symbol=${stock.fundamentals.tradingCode}`}
              target="_blank"
              sx={{ borderRadius: 2, py: 1.05 }}
              variant="contained"
            >
              See on Supercharts
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <TabView
          stock={stock}
          news={news}
          blocktr={blocktr}
          tradingCode={tradingCode}
        />
      </Box>
    </Box>
  );
}
