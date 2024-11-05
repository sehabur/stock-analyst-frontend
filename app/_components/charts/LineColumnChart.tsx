"use client";
import React, { Component } from "react";
import { Box, Grid, useTheme, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LineColumnChart(props: any) {
  const { data } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartOptions: {} = {
    colors: ["#42bda8", "#f57f17"],
    chart: {
      type: "line",
      foreColor: theme.palette.text.primary,
      fontFamily: "'Poppins', sans-serif",
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: matchesSmDown ? 5 : 7,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: matchesSmDown ? 2 : 4,
        borderRadiusApplication: "end",
        columnWidth: matchesSmDown ? "75%" : "50px",
      },
    },
    dataLabels: {
      enabled: matchesSmDown ? false : true,
      enabledOnSeries: [0],
      offsetY: 5,
      style: {
        colors: ["#000"],
      },
      background: {
        enabled: false,
      },
    },
    xaxis: {
      categories: data?.categories,
      labels: {
        rotate: -45,
        rotateAlways: matchesSmDown ? true : false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        labels: {
          formatter: (value: any) => {
            return Number.isInteger(value) ? value : value.toFixed(1);
          },
        },
      },
      {
        opposite: true,
        labels: {
          show: false,
          formatter: (value: any) => {
            return Number.isInteger(value) ? value : value.toFixed(1);
          },
        },
      },
    ],
    stroke: {
      show: true,
      // width: matchesSmDown ? 3 : 4,
      colors: ["transparent", "#f57f17"],
      // curve: 'smooth',
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
    },
    legend: {
      itemMargin: {
        horizontal: matchesSmDown ? 10 : 20,
        vertical: matchesSmDown ? 5 : 20,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data?.dataSeries?.yield}
        type="line"
        height={300}
      />
    </div>
  );
}
