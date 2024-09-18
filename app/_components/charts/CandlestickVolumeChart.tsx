"use client";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import "./tooltip.css";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";

export default function CandlestickVolumeChart(props: any) {
  const { candledata, volumedata, height } = props;

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
      height: height,
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
        top: 0.1,
        bottom: 0.25,
      },
    });

    const volumeSeries = chart.current.addHistogramSeries({
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

    chart.current.applyOptions({
      watermark: {
        visible: true,
        fontSize: 24,
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(125, 125, 125, 0.3)",
        text: "Stocksupporter",
      },
    });

    // chart.current.timeScale().fitContent();

    tooltip.current = document.createElement("div");

    tooltip.current.className = "custom-tooltip-candle-volume";
    tooltip.current.style.color =
      theme.palette.mode == "light" ? grey[700] : grey[200];

    chartContainerRef.current.appendChild(tooltip.current);

    chart.current.subscribeCrosshairMove((param: any) => {
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

        tooltip.current.innerHTML = `<style>span {
          margin-left: 3px;
          margin-right: 4px;
        }</style>O<span style="color: ${candleData.color}">${candleData.open}</span> H<span style="color: ${candleData.color}">${candleData.high}</span> L<span style="color: ${candleData.color}">${candleData.low}</span> C<span style="color: ${candleData.color}">${candleData.close}</span> Vol<span style="color: ${candleData.color}">${volumeData.value}</span>`;

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
        chartContainerRef?.current?.removeChild(tooltip.current);
      }
    };
  }, [candledata, theme, volumedata, height, matchesSmUp]);

  return <div ref={chartContainerRef} className="chart-container" />;
}
