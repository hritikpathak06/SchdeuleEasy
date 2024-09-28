import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, title }: any) => {
  // Prepare the data for the chart
  const dates = data.map((item: any) =>
    new Date(item.date as any).toLocaleDateString()
  );
  const counts = data.map((item: any) => item.count);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `Number of ${title}`,
        data: counts,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `${title} Over Time`,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
