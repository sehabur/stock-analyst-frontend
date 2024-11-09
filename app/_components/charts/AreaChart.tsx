"use client";
import React, { useRef, useEffect } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useTheme, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/system";
import "./tooltip.css";
import { getUniques } from "_helper/getter";

interface AreaChartProps {
  data: { time: string; value: number }[];
  color: string;
  fullWidth?: Boolean;
  height: number;
  chartWidthValue: number;
}

export default function AreaChart(props: AreaChartProps) {
  let { data, color, fullWidth = false, height, chartWidthValue } = props;

  data = getUniques(data, "time");

  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  let fitContent: Boolean;
  if (fullWidth) {
    fitContent = fullWidth;
  } else {
    fitContent = matchesSmDown;
  }
  const chartContainerRef: { current: any } = useRef(null);
  const chart: { current: any } = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    chart.current = createChart(chartContainerRef.current, {
      height,
      width: chartContainerRef.current.clientWidth,
      layout: {
        background: {
          type: ColorType.Solid,
          color: theme.palette.background.default,
        },
        textColor: theme.palette.text.primary,
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        rightOffset: 5,
        barSpacing: chartWidthValue / data.length,
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
    });

    const series = chart.current.addAreaSeries({
      lineColor: color,
      topColor: alpha(color, 0.5),
      bottomColor: alpha(color, 0),
      lineWidth: 2,
      lineType: 2,
      priceLineVisible: false,
    });

    series.setData(data);

    chart.current.applyOptions({
      watermark: {
        visible: true,
        fontSize: 22,
        fontFamily: "'Poppins', sans-serif",
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(125, 125, 125, 0.3)",
        text: "Stocksupporter",
      },
    });

    // chart.current.timeScale().fitContent();

    if (fitContent) {
      chart.current.timeScale().fitContent();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (chart.current) {
        chart?.current?.remove();
      }
    };
  }, [color, data, fullWidth, height, theme, chartWidthValue, fitContent]);

  return <div ref={chartContainerRef} className="chart-container"></div>;
}
