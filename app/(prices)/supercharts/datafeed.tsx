import { makeApiRequest, generateSymbol, parseFullSymbol } from "./helpers";

const configurationData = {
  supported_resolutions: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "120",
    "180",
    "1D",
    "2D",
    "3D",
    "1W",
    "2W",
    "1M",
    "3M",
    "6M",
    "12M",
  ],
  currency_codes: [{ id: "BDT", code: "BDT", description: "Taka" }],
  exchanges: [{ value: "DSE", name: "DSE", desc: "Dhaka Stock Exchange" }],
  symbols_types: [
    { name: "All", value: "" },
    { name: "Stock", value: "stock" },
    { name: "Index", value: "index" },
    { name: "Sector", value: "sector" },
  ],
};

async function getAllSymbols() {
  const data = await makeApiRequest("tv-symbols");
  let allSymbols: any[] = [];

  for (const exchange of configurationData.exchanges) {
    const stocks = data.Data[exchange.value].stocks;
    for (const stock of stocks) {
      const symbols = {
        symbol: stock.tradingCode,
        full_name: stock.tradingCode,
        description: stock.companyName,
        exchange: exchange.value,
        type: "stock",
      };
      allSymbols = [...allSymbols, symbols];
    }

    const indexList = data.Data[exchange.value].index;

    for (const index of indexList) {
      const symbols = {
        symbol: index.code,
        full_name: index.code,
        description: index.name,
        exchange: exchange.value,
        type: "index",
      };
      allSymbols = [...allSymbols, symbols];
    }

    const sectors = data.Data[exchange.value].sectors;

    for (const sector of sectors) {
      const symbols = {
        symbol: sector.name,
        full_name: sector.name,
        description: sector.name,
        exchange: exchange.value,
        type: "sector",
      };
      allSymbols = [...allSymbols, symbols];
    }
  }
  return allSymbols;
}

const getData = {
  onReady: (
    callback: (arg0: {
      supported_resolutions: string[];
      exchanges: { value: string; name: string; desc: string }[];
    }) => void
  ) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (arg0: any[]) => void
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isTypeValid = symbolType === "" || symbol.type === symbolType;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;

      return isExchangeValid && isFullSymbolContainsInput && isTypeValid;
    });
    onResultReadyCallback(newSymbols);
  },
  resolveSymbol: async (
    symbolName: any,
    onSymbolResolvedCallback: (arg0: {
      currency_code: string;
      ticker: any;
      name: any;
      description: string;
      type: any;
      timezone: string;
      exchange: any;
      minmov: number;
      pricescale: number;
      has_intraday: boolean;
      visible_plots_set: string;
      has_weekly_and_monthly: boolean;
      supported_resolutions: string[];
      data_status: string;
      intraday_multipliers: string[];
      sector: string;
      session: string;
      session_holidays: string;
    }) => void,
    onResolveErrorCallback: (arg0: string) => void,
    extension: any
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(
      ({ full_name }) => full_name === symbolName
    );
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("Cannot resolve symbol");
      return;
    }

    const symbolInfo = {
      currency_code: "BDT",
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.symbol + " - Stocksupporter",
      type: symbolItem.type,
      timezone: "Asia/Dhaka",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      visible_plots_set: "ohlcv",
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      data_status: "streaming",
      has_intraday: true,
      intraday_multipliers: ["1", "3", "5", "15", "30", "60", "120", "180"],
      sector: "Sector",
      session: "1;1000-1430:12345",
      session_holidays: "20240501,20240522",
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: {
      exchange: any;
      name: any;
      type: any;
      intraday_multipliers: string | any[];
    },
    resolution: any,
    periodParams: { from: any; to: any; firstDataRequest: any },
    onHistoryCallback: (
      arg0: {
        time: any;
        low: any;
        high: any;
        open: any;
        close: any;
        volume: any;
      }[],
      arg1: { noData: boolean }
    ) => void,
    onErrorCallback: (arg0: unknown) => void
  ) => {
    const { from, to, firstDataRequest } = periodParams;

    const fromMs = from * 1000;
    const toMs = to * 1000;

    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);

    const urlParameters: any = {
      exchange: symbolInfo.exchange,
      symbol: symbolInfo.name,
      symbolType: symbolInfo.type,
      resolutionType: symbolInfo.intraday_multipliers.includes(resolution)
        ? "intraday"
        : "day",
      fromTime: from,
      toTime: to,
      limit: 5000,
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join("&");

    try {
      const data = await makeApiRequest(`tv-bars?${query}`);
      if (
        (data.Response && data.Response === "Error") ||
        data.Data.length === 0
      ) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }

      let bars: any[] = [];

      if (urlParameters.resolutionType === "intraday") {
        for (let i = 0; i < data.Data.length; i++) {
          const { time, close, volume, ycp } = data.Data[i];

          if (close !== 0) {
            bars[i] = {
              time: time,
              low: i > 0 ? bars[i - 1].close : close,
              high: close,
              open: i > 0 ? bars[i - 1].close : close,
              close: close,
              volume: volume,
            };
          } else {
            bars[i] = {
              time: time,
              low: ycp,
              high: ycp,
              open: ycp,
              close: ycp,
              volume: volume,
            };
          }
        }
      } else {
        data.Data.forEach(
          (bar: {
            time: number;
            close: number;
            low: number;
            high: number;
            open: number;
            volume: number;
          }) => {
            if (bar.time >= fromMs && bar.time < toMs) {
              bars = [
                ...bars,
                {
                  time: bar.time,
                  low: bar.low,
                  high: bar.high,
                  open: bar.open,
                  close: bar.close,
                  volume: bar.volume,
                },
              ];
            }
          }
        );
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },
  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscriberUID: any,
    onResetCacheNeededCallback: any
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
  },
  unsubscribeBars: (subscriberUID: any) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
  },
};

export default getData;
