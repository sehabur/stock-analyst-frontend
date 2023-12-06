'use client';
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface SingleBarChartProps {
  textColor: string;
  barColor: string;
  data: { dataPoints: number[]; categories: string[] };
  isReversed?: Boolean;
}

export default function HorizontalBarChart(props: SingleBarChartProps) {
  const { textColor, barColor, data, isReversed } = props;

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
        borderRadius: 9,
        horizontal: true,
        barHeight: '20px',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
      offsetX: 0,
      formatter: function (val: any) {
        return val + '%';
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
    tooltip: {
      // x: {
      //   show: true,
      //   format: 'dd MMM',
      //   formatter: undefined,
      // },
      y: {
        formatter: undefined,
        title: {
          formatter: () => '% Change:',
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
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={dataSeries}
        type="bar"
        height={380}
      />
    </div>
  );
}
