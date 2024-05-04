"use client";
import React, { Component } from "react";
import { Box, Grid, useTheme, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function YearlyStackedColumnChart(props: any) {
  const { data } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartOptions: {} = {
    colors: ["#448aff", "#4dd0e1"],
    chart: {
      type: "column",
      stacked: true,
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: matchesSmDown ? "75%" : "50px",
        borderRadius: matchesSmDown ? 2 : 4,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          position: "center",
        },
      },
    },
    dataLabels: {
      enabled: matchesSmDown ? false : true,
      enabledOnSeries: [0, 1],
      style: {
        colors: [theme.palette.text.primary],
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
    yaxis: {
      labels: {
        formatter: (value: any) => {
          return Number.isInteger(value) ? value : value?.toFixed(2);
        },
      },
    },
    stroke: {
      show: true,
      colors: ["transparent"],
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
        series={data?.dataSeries?.dividend}
        type="line"
        height={350}
      />
    </div>
  );
}
