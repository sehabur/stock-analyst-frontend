'use client';
import React, { Component, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';
import './tooltip.css';

import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const theme: any = useTheme();

  function goTo(index: any) {
    let url = '';

    switch (index) {
      case 0:
        url = 'https://apexcharts.com/';
        break;
      case 1:
        url = 'https://github.com/apexcharts/apexcharts.js';
        break;
      case 2:
        url = 'https://www.jsdelivr.com/package/npm/apexcharts';
        break;
    }

    window.location.href = url;
  }

  useEffect(() => {
    // let labels = document.querySelectorAll('.apexcharts-yaxis-label');

    // for (let i = 0; i < labels.length; i++) {
    //   labels[i].setAttribute('onclick', (event: any) => {
    //     console.log(event);
    //   });
    // }

    //   document.addEventListener('DOMContentLoaded', (event) => {
    //     console.log('DOM fully loaded and parsed');
    //   });

    const test = document.querySelectorAll<HTMLElement>(
      '.apexcharts-yaxis-label'
    );
    test.forEach((item) => {
      console.log(item);
      item.style.padding = '10px';
      // do whatever onClick
      // console.log(event.target);
    });

    // const labels = window.document.querySelectorAll('.apexcharts-yaxis-label');

    // console.log(labels);

    // labels.forEach((item) => {
    //   // item.innerHTML = `<a href="/stock-details/${item.textContent}">${item.textContent}</a>`;
    //   item.addEventListener('click', (event) => {
    //     const code: any = item.textContent;
    //     const tradingCode = code.slice(0, code.length / 2);
    //     router.push(`/stock-details/${tradingCode}`);
    //   });
    // });

    // labels.forEach((item) => {
    //   item.addEventListener('click', (event) => {
    //     // do whatever onClick
    //     // console.log(event.target);
    //   });
  });

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
          cssClass: 'chart-label-x',
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
