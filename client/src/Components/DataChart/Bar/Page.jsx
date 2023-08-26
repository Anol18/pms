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
  maintainAspectRatio: false,
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
const date = new Date().getFullYear();
const data = {
  labels,
  datasets: [
    {
      label: date,
      data: labels.map(() => Math.floor(Math.random() * 100000) + 10),
      backgroundColor: "#78C1F3",
    },
  ],
};

const Page = () => {
  return <Bar options={options} data={data} width="200%" height={400} />;
};

export default Page;
