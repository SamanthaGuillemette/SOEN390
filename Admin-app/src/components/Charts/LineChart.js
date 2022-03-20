/**
 * @fileoverview This component takes care of the LineChart function.
 *
 */
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      // text: "New Covid cases",
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
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [400, 800, 520, 1200, 620, 210, 870, 590, 330, 100, 970, 590],
      borderColor: "#949be2",
      backgroundColor: "#949be2",
    },
    {
      label: "Dataset 2",
      data: [330, 200, 100, 800, 400, 120, 990, 850, 500, 200, 340, 500],
      borderColor: "#8bc3eb",
      backgroundColor: "#8bc3eb",
    },
  ],
};

/**
 * This component will allow the LineChart feature to work. Below is the function LineChart that will return the 
 * Line component that is imported from react-chartjs-2.
 *
 * @returns {JSX.Element}
 */

function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;
