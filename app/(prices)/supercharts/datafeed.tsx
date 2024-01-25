import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers'

const configurationData = {
  supported_resolutions: ['1', '15', '60', '1D', '1W', '1M', '3M'],
  exchanges: [{ value: 'DSE', name: 'DSE', desc: 'Dhaka Stock Exchange' }]
  //   symbols_types: [{ name: 'stock', value: 'stock' }],
}

async function getAllSymbols () {
  const data = await makeApiRequest('tv-symbols')
  let allSymbols: any[] = []

  for (const exchange of configurationData.exchanges) {
    const stocks = data.Data[exchange.value].stocks
    for (const stock of stocks) {
      const symbols = {
        symbol: stock.tradingCode,
        full_name: stock.tradingCode,
        description: stock.companyName,
        exchange: exchange.value,
        type: 'stock'
      }
      allSymbols = [...allSymbols, symbols]
    }
  }
  return allSymbols
}

const getData = {
  onReady: (
    callback: (arg0: {
      supported_resolutions: string[]
      exchanges: { value: string; name: string; desc: string }[]
    }) => void
  ) => {
    console.log('[onReady]: Method call')
    setTimeout(() => callback(configurationData))
  },
  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: any,
    onResultReadyCallback: (arg0: any[]) => void
  ) => {
    console.log('[searchSymbols]: Method call')
    const symbols = await getAllSymbols()
    const newSymbols = symbols.filter(symbol => {
      const isExchangeValid = exchange === '' || symbol.exchange === exchange
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1
      return isExchangeValid && isFullSymbolContainsInput
    })
    onResultReadyCallback(newSymbols)
  },
  resolveSymbol: async (
    symbolName: any,
    onSymbolResolvedCallback: (arg0: {
      currency_code: string
      ticker: any
      name: any
      description: string
      type: any
      timezone: string
      exchange: any
      minmov: number
      pricescale: number
      has_intraday: boolean
      visible_plots_set: string
      has_weekly_and_monthly: boolean
      supported_resolutions: string[]
      data_status: string
      intraday_multipliers: string[]
      sector: string
      session: string
      session_holidays: string
    }) => void,
    onResolveErrorCallback: (arg0: string) => void,
    extension: any
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName)
    const symbols = await getAllSymbols()
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName)
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName)
      onResolveErrorCallback('Cannot resolve symbol')
      return
    }

    const symbolInfo = {
      currency_code: 'BDT',
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.symbol + ' - Stocksupporter',
      type: symbolItem.type,
      timezone: 'Asia/Dhaka',
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      visible_plots_set: 'ohlcv',
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      data_status: 'streaming',
      has_intraday: true,
      intraday_multipliers: ['1', '15', '60'],
      sector: 'new sector',
      session: '1;1000-1415:12345',
      session_holidays: '20181105,20181107,20181112'
    }

    console.log('[resolveSymbol]: Symbol resolved', symbolName)
    onSymbolResolvedCallback(symbolInfo)
  },
  getBars: async (
    symbolInfo: {
      exchange: any
      name: any
      intraday_multipliers: string | any[]
    },
    resolution: any,
    periodParams: { from: any; to: any; firstDataRequest: any },
    onHistoryCallback: (
      arg0: {
        time: any
        low: any
        high: any
        open: any
        close: any
        volume: any
      }[],
      arg1: { noData: boolean }
    ) => void,
    onErrorCallback: (arg0: unknown) => void
  ) => {
    const { from, to, firstDataRequest } = periodParams

    const fromMs = from * 1000
    const toMs = to * 1000

    console.log('[getBars]: Method call', symbolInfo, resolution, from, to)

    const urlParameters: any = {
      exchange: symbolInfo.exchange,
      symbol: symbolInfo.name,
      resolutionType: symbolInfo.intraday_multipliers.includes(resolution)
        ? 'intraday'
        : 'day',
      fromTime: from,
      toTime: to
      // limit: 2000,
    }
    const query = Object.keys(urlParameters)
      .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&')

    try {
      const data = await makeApiRequest(`tv-bars?${query}`)
      if (
        (data.Response && data.Response === 'Error') ||
        data.Data.length === 0
      ) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true })
        return
      }
      let bars: any[] = []

      if (urlParameters.resolutionType === 'intraday') {
        for (let i = 0; i < data.Data.length; i++) {
          const tempData = data.Data[i]
          if (tempData.close !== 0) {
            bars[i] = {
              time: tempData.time,
              low: i > 0 ? bars[i - 1].close : tempData.close,
              high: tempData.close,
              open: i > 0 ? bars[i - 1].close : tempData.close,
              close: tempData.close,
              volume:
                i > 0
                  ? data.Data[i].volume - data.Data[i - 1].volume
                  : tempData.volume
            }
          } else {
            bars[i] = {
              time: tempData.time,
              low: tempData.ycp,
              high: tempData.ycp,
              open: tempData.ycp,
              close: tempData.ycp,
              volume:
                i > 0
                  ? data.Data[i].volume - data.Data[i - 1].volume
                  : tempData.volume
            }
          }
        }
      } else {
        data.Data.forEach(
          (bar: {
            time: number
            close: number
            low: any
            high: any
            open: any
            volume: any
          }) => {
            if (bar.time >= fromMs && bar.time < toMs) {
              if (bar.close !== 0) {
                bars = [
                  ...bars,
                  {
                    time: bar.time,
                    low: bar.low,
                    high: bar.high,
                    open: bar.open,
                    close: bar.close,
                    volume: bar.volume
                  }
                ]
              } else {
                bars = [
                  ...bars,
                  {
                    time: bar.time,
                    low: bar.open,
                    high: bar.open,
                    open: bar.open,
                    close: bar.open,
                    volume: bar.volume
                  }
                ]
              }
            }
          }
        )
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`)
      onHistoryCallback(bars, { noData: false })
    } catch (error) {
      console.log('[getBars]: Get error', error)
      onErrorCallback(error)
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
      '[subscribeBars]: Method call with subscriberUID:',
      subscriberUID
    )
  },
  unsubscribeBars: (subscriberUID: any) => {
    console.log(
      '[unsubscribeBars]: Method call with subscriberUID:',
      subscriberUID
    )
  }
}

export default getData
