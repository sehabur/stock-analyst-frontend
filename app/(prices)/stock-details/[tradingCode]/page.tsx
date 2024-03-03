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
} from "@mui/material";
import TabView from "./TabView";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import Link from "next/link";

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
  if (latest.ltp !== 0) {
    price = latest.ltp;
    time = DateTime.fromISO(latest.time).toFormat("dd MMM, HH:mm");
  } else {
    price = latest.ycp;
    time = DateTime.fromISO(latest.time)
      .minus({ days: 1 })
      .toFormat("dd MMM, 14:30");
  }
  return {
    price,
    time: "Last updated on " + time,
  };
};

// export function generateStaticParams() {
//   return [{ tradingCode: 'BSRMSTEEL' }, { tradingCode: 'AFTABAUTO' }];
// }

export default async function StockDetails({
  params: { tradingCode },
}: {
  params: { tradingCode: string };
}) {
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

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ py: 4 }}>
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
              gutterBottom
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.8rem", sm: "1.8rem" },
                fontWeight: 500,
              }}
            >
              {stock.fundamentals.companyName}
            </Typography>

            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <Chip
                label={stock.fundamentals.tradingCode}
                // color='info'
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  fontSize: "1rem",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                }}
              />
              <Chip
                label={`Category ${stock.fundamentals.category}`}
                sx={{ borderRadius: 1, mx: 2, fontSize: ".875rem" }}
              />
              <Chip
                label={stock.fundamentals.sector}
                sx={{ borderRadius: 1, fontSize: ".875rem" }}
              />
            </Stack>

            <Stack direction="row" alignItems="baseline" sx={{ mt: 2 }}>
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "2.1rem", sm: "2.5rem" },
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
                  ml: 0.6,
                }}
              >
                BDT
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  ml: 2,
                  mr: 2,
                }}
              >
                {addPlusSign(stock.latest.change)}
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {stock.latest.change !== 0
                  ? addPlusSign(stock.latest.percentChange)
                  : 0}
                {"%"}
              </Typography>
            </Stack>
            <Typography
              sx={{ mt: 1, color: "text.secondary", fontSize: "1rem" }}
            >
              {latestPriceData.time}
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              href={`/supercharts?symbol=${stock.fundamentals.tradingCode}`}
              target="_blank"
              sx={{ borderRadius: 2, mt: 0.2 }}
              variant="outlined"
            >
              See on Supercharts
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 0.3 }}>
        <TabView stock={stock} news={news} blocktr={blocktr} />
      </Box>
    </Box>
  );
}
