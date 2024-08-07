"use client";
import React, { Component } from "react";
import { Box, Grid, useTheme, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ShareholdingLineChart(props: any) {
  const { data, categories, lineColors } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartOptions: {} = {
    colors: lineColors,
    chart: {
      type: "line",
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    markers: {
      size: 6,
    },
    // plotOptions: {
    //   bar: {
    //     horizontal: false,
    //     borderRadius: 2,
    //     columnWidth: matchesSmDown ? "50%" : "35%",
    //   },
    // },
    // dataLabels: {
    //   enabled: true,
    //   formatter: (value: any) => {
    //     return value + "%";
    //   },
    // },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: any) => {
          return Number.isInteger(value) ? value : value.toFixed(2);
        },
      },
    },
    stroke: {
      show: true,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (
          value: any,
          { series, seriesIndex, dataPointIndex, w }: any
        ) => {
          let change;
          if (dataPointIndex == 0) {
            change = 0;
          } else {
            change = Number(
              (value - series[seriesIndex][dataPointIndex - 1]).toFixed(2)
            );
            if (change > 0) change = "+" + change;
          }
          return value + "% (" + change + "%)";
        },
      },
      shared: false,
      // followCursor: true,
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
    },
    legend: {
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="line"
        height={200}
      />
    </div>
  );
}
