"use client";
import React, { Component } from "react";
import { Box, Grid, useTheme, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

import "./SectorValueTooltip.css";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StyledTooltip = styled("div")({
  // background-color: rgba(0, 0, 0, 0.8);
  // color: #fff;
  // border-radius: 5px;
  // padding: 10px;
});
const StyledTooltipTitle = styled("div")({
  marginBottom: "5px",
});
const StyledTooltipContent = styled("div")({
  fontWeight: "bold",
});

export default function HorizontalStackedBarChartValue(props: any) {
  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, colors } = props;

  const chartOptions: {} = {
    colors: colors || [],
    chart: {
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      type: "bar",
      stacked: true,
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: [theme.palette.background.paper],
    },
    xaxis: {
      categories: matchesSmDown
        ? data.categories.map(
            (item: any) => item.slice(0, 18) + (item.length > 18 ? ".." : "")
          )
        : data.categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      position: "top",
      itemMargin: {
        horizontal: 15,
      },
    },
    tooltip: {
      theme: "dark",
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        console.log(series, seriesIndex, dataPointIndex, w);

        let totalValue = 0;
        let totalDataPointValue = 0;

        for (let item of series) {
          totalDataPointValue += item[dataPointIndex];
          for (let value of item) {
            totalValue += value;
          }
        }

        const valueA = series[0][dataPointIndex];
        const valueB = series[1][dataPointIndex];
        const valueN = series[2][dataPointIndex];
        const valueZ = series[3][dataPointIndex];

        const percentA = Number(
          (series[0][dataPointIndex] / totalValue) * 100
        ).toFixed(2);
        const percentB = Number(
          (series[1][dataPointIndex] / totalValue) * 100
        ).toFixed(2);
        const percentN = Number(
          (series[2][dataPointIndex] / totalValue) * 100
        ).toFixed(2);
        const percentZ = Number(
          (series[3][dataPointIndex] / totalValue) * 100
        ).toFixed(2);

        const percentDataPoint = Number(
          (totalDataPointValue / totalValue) * 100
        ).toFixed(2);

        return (
          "<div class='sector-value-chart'>" +
          "<div class='sector-value-chart-title'>" +
          w.globals.labels[dataPointIndex] +
          "</div>" +
          "<div class='sector-value-chart-content'><div style='font-size: 13px;'>" +
          totalDataPointValue.toFixed(2) +
          " Crore" +
          "</div>" +
          "<div style='font-size: 13px;'>" +
          percentDataPoint +
          "% of total turnover" +
          "</div>" +
          "<div style='margin-top: 8px'>" +
          "A: " +
          valueA +
          " Crore (" +
          percentA +
          "%)" +
          "</div>" +
          "<div>" +
          "B: " +
          valueB +
          " Crore (" +
          percentB +
          "%)" +
          "</div>" +
          "<div>" +
          "N: " +
          valueN +
          " Crore (" +
          percentN +
          "%)" +
          "</div>" +
          "<div>" +
          "Z: " +
          valueZ +
          " Crore (" +
          percentZ +
          "%)" +
          "</div>" +
          "</div></div>"

          // "B: " +
          // valueB +
          // "Crore (" +
          // percentB +
          // "%)" +
          // "</div>"

          // "</div></div>"
        );

        // return seriesIndex;
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data.series}
        type="bar"
        height={520}
      />
    </div>
  );
}
