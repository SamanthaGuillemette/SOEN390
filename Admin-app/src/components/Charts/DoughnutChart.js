/**
 * @fileoverview This component takes care of displaying the DoughnutChart.
 *
 */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  getDoctors,
  patientLimit,
} from "../../backend/firebaseDoctorUtilities";
import Typography from "@mui/material/Typography";
import "./DoughtnutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * This function will check the capacity of the doctor.
 *
 * @param  {} doctor
 */
function isDoctorAtFullCapacity(doctor) {
  return doctor && doctor.treats && doctor.treats.length >= patientLimit;
}

/**
 * This component allows displaying the Doughnut.
 *
 * @returns {JSX.Element}
 */
function DoughnutChart() {
  const [doctorsAtCapacity, setDoctorsAtCapacity] = useState(0);
  const [doctorsAvailable, setDoctorsAvailable] = useState(0);

  /* Counting how many doctors are at full capacity and how many arent  */
  useEffect(() => {
    getDoctors().then((data) => {
      data.forEach((doc) => {
        if (!isDoctorAtFullCapacity(doc)) {
          /* if NOT at full capacity */
          setDoctorsAvailable((doctorsAvailable) => doctorsAvailable + 1);
        } else {
          setDoctorsAtCapacity((doctorsAtCapacity) => doctorsAtCapacity + 1);
        }
      });
    });
  }, []);

  const data = {
    labels: [],
    datasets: [
      {
        data: [doctorsAvailable, doctorsAtCapacity],
        backgroundColor: ["#8bc3eb", "rgb(5, 132, 190)"],
        borderColor: ["#1e1e1e"],
        borderWidth: 3,
        cutout: "80%",
        hoverBackgroundColor: ["#8bc3eb", "rgb(5, 132, 190)"],
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <Typography
        sx={{
          fontSize: "18px",
          color: "var(--text-primary)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Doctors Available vs Unavailable
      </Typography>
      <Doughnut data={data} />
      <Typography sx={{ textAlign: "center", mt: 1 }}>
        <Typography className="DASHBOARD__chart__label-unavail">
          Unavailable
        </Typography>
        <Typography className="DASHBOARD__chart__label-avail">
          Available
        </Typography>
      </Typography>
    </div>
  );
}

export default DoughnutChart;
