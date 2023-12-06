'use client';
import React, { Component } from 'react';
import { Box, Grid, useTheme, Typography, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function HorizontalSectorBarChart(props: any) {
  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { data } = props;

  const chartOptions: {} = {
    colors: ['#b388ff'],
    chart: {
      foreColor: theme.palette.text.primary,
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
        horizontal: true,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 12,
      style: {
        fontSize: '14px',
        colors: [theme.palette.text.primary],
        fontWeight: 700,
      },
    },
    xaxis: {
      categories: matchesSmDown
        ? data.categories.map(
            (item: any) => item.slice(0, 18) + (item.length > 18 ? '..' : '')
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
      showForSingleSeries: true,
      position: 'top',
      customLegendItems: ['Total values in crore'],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data.series}
        type="bar"
        height={660}
      />
    </div>
  );
}
