'use client';
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

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
      type: 'bar',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
        columnWidth: '70%',
        barHeight: '20px',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        colors: ['#fff'],
      },
      offsetX: -15,
    },
    xaxis: {
      labels: {
        style: {
          colors: [textColor],
        },
      },
      categories: data.categories,
      lines: {
        show: true,
      },
    },
    grid: {
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
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
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
        height={480}
      />
    </div>
  );
}
