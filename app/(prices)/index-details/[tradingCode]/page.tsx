import { DateTime } from "luxon";
import Link from "next/link";

import { Box, Typography, Chip, Button, Tooltip } from "@mui/material";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

import Overview from "./Overview";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import News from "./News";

const getIndexDetails = async (tradingCode: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/index/${tradingCode}`,
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
    `${process.env.BACKEND_URL}/api/prices/news/EXCH?limit=25`,
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
  console.log(latest);
  const price = latest.ltp;
  const time = DateTime.fromISO(latest.time)
    .plus({ hours: 6 })
    .toFormat("dd MMM, HH:mm");
  return {
    price,
    time: "Last updated on " + time,
  };
};

// export async function generateStaticParams() {
//   const symbols = await fetch(
//     `${process.env.BACKEND_URL}/api/prices/getStocksList`
//   ).then((res) => res.json());

//   return symbols.map((symbol: string) => ({
//     tradingCode: symbol,
//   }));
// }

export default async function StockDetails({ params }: any) {
  const { tradingCode } = params;

  const [stock, news] = await Promise.all([
    getIndexDetails(tradingCode),
    getNews(tradingCode),
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
      <Box sx={{ pt: { xs: 0, sm: 2 }, pb: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            maxWidth: 1210,
            mx: "auto",
            px: { xs: 2, sm: 8 },
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "space-between" },
            bgcolor: "secondaryBackground",
            pt: { xs: 3, sm: 4 },
            pb: { xs: 4, sm: 4 },
            borderRadius: { xs: 0, sm: 4 },
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "1.6rem" },
                fontWeight: 500,
              }}
            >
              {stock.fundamentals.companyName}
            </Typography>

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
                  fontSize: { xs: "2.1rem", sm: "2.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {latestPriceData.price.toFixed(2)}
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
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
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  mr: 3,
                }}
              >
                {stock.latest.change !== 0
                  ? addPlusSign(stock.latest.percentChange)
                  : 0}
                {"%"}
              </Typography>

              <Tooltip
                title={`Market is ${stock.marketOpenStatus.toLowerCase()} now`}
                enterTouchDelay={10}
                arrow
              >
                <Chip
                  label={stock.marketOpenStatus}
                  variant="outlined"
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
                fontSize: "1rem",
                mt: { xs: 0.8, sm: 0 },
              }}
            >
              {latestPriceData.time}
            </Typography>
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
        <Box>
          <Overview stock={stock} />
        </Box>
        <Box>
          <News news={news} />
        </Box>
      </Box>
    </Box>
  );
}
