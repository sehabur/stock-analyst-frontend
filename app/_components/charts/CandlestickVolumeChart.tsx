"use client";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import "./tooltip.css";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";

export default function CandlestickVolumeChart(props: any) {
  const { candledata, volumedata } = props;

  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const chartContainerRef: { current: any } = useRef(null);
  const chart: { current: any } = useRef(null);
  const tooltip: { current: any } = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    const chartOptions = {
      layout: {
        background: {
          type: ColorType.Solid,
          color: theme.palette.background.default,
        },
        textColor: theme.palette.text.primary,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        rightOffset: 0.5,
        barSpacing: matchesSmUp ? 9 : 8,
      },
      crosshair: {
        horzLine: {
          labelVisible: true,
        },
        vertLine: {
          labelVisible: true,
        },
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 530,
    };

    chart.current = createChart(chartContainerRef.current, chartOptions);

    const candleSeries = chart.current.addCandlestickSeries({
      // upColor: '#089981',
      // downColor: '#f23645',
      // borderVisible: false,
      // wickUpColor: '#089981',
      // wickDownColor: '#f23645',
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
    });

    candleSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.08,
        bottom: 0.35,
      },
    });

    const volumeSeries = chart.current.addHistogramSeries({
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0.02,
      },
    });

    candleSeries.setData(candledata);

    volumeSeries.setData(volumedata);

    // chart.current.timeScale().fitContent();

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    tooltip.current = document.createElement("div");

    tooltip.current.className = "custom-tooltip-candle-volume";
    tooltip.current.style.background = grey[900];

    chartContainerRef.current.appendChild(tooltip.current);

    chart.current.subscribeCrosshairMove((param: any) => {
      console.log(param);
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        tooltip.current.style.display = "none";
      } else {
        const dateStr = DateTime.fromSeconds(param.time)
          .minus({ hours: 6 })
          .toFormat("yyyy-MM-dd");
        tooltip.current.style.display = "block";
        const candleData = param.seriesData.get(candleSeries);
        const volumeData = param.seriesData.get(volumeSeries);

        // tooltip.current.innerHTML = `<div><div style="font-size: 15px; font-weight: bold; margin-bottom: 6px; color: ${"#2962ff"}">${dateStr}</div><div style="color: ${"black"}">
        //         Open: ${candleData.open}
        //         </div><div style="color: ${"black"}">
        //         High: ${candleData.high}
        //         </div><div style="color: ${"black"}">
        //         Low: ${candleData.low}
        //         </div><div style="color: ${"black"}">
        //         Close: ${candleData.close}
        //         </div><div style="color: ${"black"}; margin-top: 6px;">
        //         Volume: ${volumeData.value}
        //         </div></div>`;

        tooltip.current.innerHTML = `O <span style="color: ${volumeData.color}">${candleData.open}</span> H <span style="color: ${volumeData.color}">${candleData.high}</span> L <span style="color: ${volumeData.color}">${candleData.low}</span> C <span style="color: ${volumeData.color}">${candleData.close}</span> V <span style="color: ${volumeData.color}">${volumeData.value}</span>`;

        // const y = param.point.y;
        // let left = param.point.x + toolTipMargin;
        // if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
        //   left = param.point.x - toolTipMargin - toolTipWidth;
        // }

        // let top = y + toolTipMargin;
        // if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
        //   top = y - toolTipHeight - toolTipMargin;
        // }
        // tooltip.current.style.left = left + "px";
        // tooltip.current.style.top = top + "px";

        tooltip.current.style.left = "0px";
        tooltip.current.style.top = "0px";
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      if (chart.current) {
        chart?.current?.remove();
      }
      if (tooltip?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartContainerRef?.current?.removeChild(tooltip.current);
      }
    };
  }, [candledata, theme, volumedata]);

  return <div ref={chartContainerRef} className="chart-container" />;
}
