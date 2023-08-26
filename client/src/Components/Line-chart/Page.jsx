import { Layout, Space } from "antd";
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
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    height: 200,
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Project Budget",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July",];
const labels = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
  2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048,
  2049, 2050,
];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 2000 - 1000),
      borderColor: "#793FDF",
      backgroundColor: "#793FDF",
    },
  ],
};
const Page = () => {
  return <Line options={options} data={data} width="100%" height="400px" />;
};

export default Page;
