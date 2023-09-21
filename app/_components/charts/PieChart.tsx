'use client';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
  data: Array<number>;
  colors: Array<string>;
  labels: Array<string>;
}

export default function PieChart(props: PieChartProps) {
  const { data, colors, labels } = props;

  const chartOptions: {} = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        },
      },
    },
    stroke: {
      show: false,
    },
    colors: colors,
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 380, // Adjust the chart width for smaller screens
          },
          legend: {
            position: 'bottom', // Change the legend position for smaller screens
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
        width="400"
      />
    </div>
  );
}
