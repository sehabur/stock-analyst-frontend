"use client";
import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function YearlyColumnChart(props: any) {
  const { data } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartOptions: {} = {
    colors: ["#448aff"],
    chart: {
      type: "bar",
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: matchesSmDown ? "50%" : "50px",
        borderRadius: 4,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: matchesSmDown ? false : true,
      style: {
        colors: [theme.palette.text.primary],
      },
      offsetY: -23,
    },
    xaxis: {
      categories: data?.categories,
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
          return Number.isInteger(value) ? value : value.toFixed(3);
        },
      },
    },
    // legend: {
    //   showForSingleSeries: true,
    //   position: 'bottom',
    //   customLegendItems: ['Total values in crore'],
    // },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data?.dataSeries}
        type="bar"
        height={250}
      />
    </div>
  );
}
