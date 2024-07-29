"use client";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material";
import "./tooltip.css";

export default function CandlestickChart(props: { data: any[] }) {
  const { data } = props;

  const theme = useTheme();

  const chartContainerRef: { current: any } = useRef(null);
  const chart: { current: any } = useRef(null);
  const tooltip: { current: any } = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    chart.current = createChart(chartContainerRef.current, {
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
          top: 0.2,
          bottom: 0.2,
        },
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          visible: true,
        },
        horzLines: {
          visible: true,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleSeries.setData(data);

    chart.current.timeScale().fitContent();

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    tooltip.current = document.createElement("div");

    tooltip.current.className = "custom-tooltip";
    tooltip.current.style.background = "white";

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
        const dateStr = param.time;
        tooltip.current.style.display = "block";
        const data = param.seriesData.get(candleSeries);
        console.log(data);
        // const price = data.value !== undefined ? data.value : data.close;
        tooltip.current.innerHTML = `<div><div style="color: ${"#2962FF"}">Apple Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
                ${Math.round(100 * data.close) / 100}
                </div><div style="color: ${"black"}">
                ${dateStr}
                </div></div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        tooltip.current.style.left = left + "px";
        tooltip.current.style.top = top + "px";

        // const coordinate = candleSeries.priceToCoordinate(data.close);
        // let shiftedCoordinate = param.point.x;
        // if (coordinate === null) {
        //   return;
        // }
        // shiftedCoordinate = Math.max(
        //   0,
        //   Math.min(
        //     chartContainerRef.current.clientWidth - toolTipWidth,
        //     shiftedCoordinate
        //   )
        // );
        // const coordinateY =
        //   coordinate - toolTipHeight - toolTipMargin > 0
        //     ? coordinate - toolTipHeight - toolTipMargin
        //     : Math.max(
        //         0,
        //         Math.min(
        //           chartContainerRef.current.clientHeight -
        //             toolTipHeight -
        //             toolTipMargin,
        //           coordinate + toolTipMargin
        //         )
        //       );
        // tooltip.current.style.left = param.point.x + 'px';
        // tooltip.current.style.top = param.point.y + 'px';
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      if (chart.current) {
        chart.current.remove();
      }
      if (tooltip.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartContainerRef.current.removeChild(tooltip.current);
      }
    };
  }, [data, theme]);

  return <div ref={chartContainerRef} className="chart-container" />;
}
