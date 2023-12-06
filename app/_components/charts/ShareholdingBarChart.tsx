'use client';
import React, { Component } from 'react';
import { Box, Grid, useTheme, Typography, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function ShareholdingBarChart(props: any) {
  const { data, categories, lineColors } = props;

  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptions: {} = {
    colors: lineColors,
    chart: {
      type: 'bar',
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: matchesSmDown ? '50%' : '35%',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (value: any) => {
        return value + '%';
      },
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
    yaxis: [
      {
        labels: {
          formatter: (value: any) => {
            return Number.isInteger(value) ? value : value.toFixed(2);
          },
        },
      },
    ],
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="bar"
        height={200}
      />
    </div>
  );
}
