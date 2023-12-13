'use client';
import React, { Component } from 'react';
import { Box, Grid, useTheme, Typography, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function HorizontalStackedBarChart(props: any) {
  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, colors } = props;

  const chartOptions: {} = {
    colors: colors || [],
    chart: {
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      type: 'bar',
      stacked: true,
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
        // dataLabels: {
        //   total: {
        //     enabled: true,
        //     offsetX: 0,
        //     style: {
        //       fontSize: '14px',
        //       color: theme.palette.text.primary,
        //       fontWeight: 700,
        //     },
        //   },
        // },
      },
    },
    stroke: {
      width: 1,
      colors: [theme.palette.background.paper],
    },
    // title: {
    //   text: 'Sector Status',
    // },
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
      position: 'top',
      itemMargin: {
        horizontal: 15,
      },
    },
    tooltip: {
      theme: 'dark',
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
