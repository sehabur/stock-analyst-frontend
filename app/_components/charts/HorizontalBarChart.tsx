'use client';
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface SingleBarChartProps {
  textColor: string;
  barColor: string;
  data: { dataPoints: number[]; categories: string[]; type: string };
  isReversed?: Boolean;
}

export default function HorizontalBarChart(props: SingleBarChartProps) {
  const { textColor, barColor, data, isReversed } = props;

  const theme: any = useTheme();

  const dataSeries = [
    {
      data: data.dataPoints,
    },
  ];
  const chartOptions: {} = {
    colors: [barColor],
    chart: {
      foreColor: textColor,
      fontFamily: "'DM Sans', sans-serif",
      type: 'bar',
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        horizontal: true,
        barHeight: '18px',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: [textColor],
      },
      offsetX: 45,
      formatter: function (val: any) {
        return val + '%';
      },
    },
    legend: {
      showForSingleSeries: true,
      position: 'bottom',
      formatter: function () {
        return data.type + ' % Change';
      },
      markers: {
        offsetX: -8,
        radius: 12,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: data.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        offsetX: 0,
        style: {
          fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
        },
        formatter: (value: any) => {
          return value;
        },
      },
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      // x: {
      //   show: true,
      //   format: 'dd MMM',
      //   formatter: undefined,
      // },
      theme: 'dark',
      y: {
        formatter: undefined,
        title: {
          formatter: () => data.type + ' % Change:',
        },
      },
    },
    // yaxis: {
    //   reversed: isReversed,
    //   axisTicks: {
    //     show: true,
    //   },
    // },
  };

  return (
    <Box component="div" id="chart" sx={{ px: 2 }}>
      <ReactApexChart
        options={chartOptions}
        series={dataSeries}
        type="bar"
        height={420}
      />
    </Box>
  );
}
