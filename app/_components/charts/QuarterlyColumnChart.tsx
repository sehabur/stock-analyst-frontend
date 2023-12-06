'use client';
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { Box, Grid, useTheme, Typography, useMediaQuery } from '@mui/material';

export default function QuarterlyColumnChart(props: any) {
  const { data } = props;
  const theme: any = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptions: {} = {
    colors: ['#448aff', '#42bda8', '#4dd0e1'],
    chart: {
      type: 'bar',
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
        columnWidth: matchesSmDown ? '60%' : '50px',
        borderRadius: 2,
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
    yaxis: {
      labels: {
        formatter: (value: any) => {
          return Number.isInteger(value) ? value : value.toFixed(2);
        },
      },
    },
    stroke: {
      show: true,
      width: matchesSmDown ? 3 : 8,
      colors: ['transparent'],
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
        type="bar"
        height={280}
      />
    </div>
  );
}
