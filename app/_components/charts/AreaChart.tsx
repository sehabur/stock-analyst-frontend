"use client";
import React, { useRef, useEffect } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useTheme, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/system";
import "./tooltip.css";
import { DateTime } from "luxon";

interface AreaChartProps {
  data: { time: string; value: number }[];
  color: string;
  fullWidth?: Boolean;
  height: number;
  chartWidthValue: number;
}

export default function AreaChart(props: AreaChartProps) {
  const {
    data,
    color,
    fullWidth = false,
    height,
    // tooltipTitle,
    chartWidthValue,
  } = props;

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
  // const tooltip: { current: any } = useRef(null);

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

    if (fitContent) {
      chart.current.timeScale().fitContent();
    }

    // const toolTipWidth = 80;
    // const toolTipHeight = 80;
    // const toolTipMargin = 15;

    // tooltip.current = document.createElement("div");

    // tooltip.current.className = "custom-tooltip-area-chart";
    // tooltip.current.style.background = "white";

    // chartContainerRef.current.appendChild(tooltip.current);

    // chart.current.subscribeCrosshairMove((param: any) => {
    //   // console.log(param);
    //   if (
    //     param.point === undefined ||
    //     !param.time ||
    //     param.point.x < 0 ||
    //     param.point.x > chartContainerRef.current.clientWidth ||
    //     param.point.y < 0 ||
    //     param.point.y > chartContainerRef.current.clientHeight
    //   ) {
    //     tooltip.current.style.display = "none";
    //   } else {
    //     const dateStr = DateTime.fromSeconds(param.time)
    //       .minus({ hours: 6 })
    //       .toFormat("yyyy-MM-dd HH:mm");

    //     tooltip.current.style.display = "block";
    //     const data = param.seriesData.get(series);
    //     const price = data.value !== undefined ? data.value : data.close;
    //     tooltip.current.innerHTML = `<div><div style="color: #2962FF">${tooltipTitle}</div><div style="font-size: 20px; margin: 4px 0px; color: ${"black"}">
    //             ${Math.round(100 * price) / 100}
    //             </div><div style="color: ${"black"}">
    //             ${dateStr}
    //             </div></div>`;
    //     const y = param.point.y;
    //     let left = param.point.x + toolTipMargin;
    //     if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
    //       left = param.point.x - toolTipMargin - toolTipWidth;
    //     }

    //     let top = y + toolTipMargin;
    //     if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
    //       top = y - toolTipHeight - toolTipMargin;
    //     }
    //     tooltip.current.style.left = left + "px";
    //     tooltip.current.style.top = top + "px";
    //   }
    // });

    window.addEventListener("resize", handleResize);

    return () => {
      if (chart.current) {
        chart?.current?.remove();
      }
      // if (tooltip?.current) {
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
      //   chartContainerRef?.current?.removeChild(tooltip.current);
      // }
    };
  }, [color, data, fullWidth, height, theme]);

  return <div ref={chartContainerRef} className="chart-container"></div>;
}
