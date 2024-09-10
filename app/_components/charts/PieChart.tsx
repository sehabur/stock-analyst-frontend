"use client";
import { useTheme, useMediaQuery } from "@mui/material";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart(props: any) {
  const { data, colors, labels, height, width, donutSize } = props;

  const theme = useTheme();

  const chartOptions: {} = {
    chart: {
      type: "donut",
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: donutSize,
        },
      },
    },
    stroke: {
      show: false,
    },
    colors: colors,
    labels: labels,
    legend: {
      itemMargin: {
        horizontal: 15,
        vertical: 2,
      },
      position: "bottom",
    },
    dataLabels: {
      formatter: function (val: any, opts: any) {
        return val.toFixed(2) + "%";
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 380,
          },
          legend: {
            position: "right",
          },
        },
      },
    ],
  };

  return (
    <div id="chart-container">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="donut"
        height={height}
        width={width}
      />
    </div>
  );
}
