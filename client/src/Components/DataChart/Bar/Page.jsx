import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Col, Layout, Row, Space } from "antd";

const { Content } = Layout;
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Activity",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {
  labels,
  datasets: [
    {
      label: "2023",
      data: labels.map(() => Math.floor(Math.random() * 50) + 1),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Page = () => {
  return <Bar options={options} data={data} />;
};

export default Page;
