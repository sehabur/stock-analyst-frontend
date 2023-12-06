'use client';
import React, { Component } from 'react';
import { Box, Grid, useTheme, Typography, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function LineColumnChart(props: any) {
  const { data } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptions: {} = {
    colors: ['#448aff', '#f57f17', '#42bda8'],
    chart: {
      type: 'line',
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
      size: matchesSmDown ? 5 : 6,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: matchesSmDown ? '75%' : '65%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.categories,
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
            return Number.isInteger(value) ? value : value.toFixed(2);
          },
        },
      },
      {
        opposite: true,
        labels: {
          formatter: (value: any) => {
            return Number.isInteger(value) ? value : value.toFixed(2);
          },
        },
      },
    ],
    stroke: {
      show: true,
      width: matchesSmDown ? [1, 3, 0] : 4,
      colors: ['transparent', '#f57f17', 'transparent'],
      // curve: 'smooth',
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
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
        series={data.dataSeries}
        type="line"
        height={300}
      />
    </div>
  );
}
