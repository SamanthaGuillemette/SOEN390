/**
 * @fileoverview This component displays the symptoms table.
 *
 */
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VirusIcon from "../../assets/virus.svg";
import { getStatuses } from "../../backend/firebasePatientUtilities";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SymptomsTable.css";

// Creating data for symptom details table
function createData(
  Date,
  Fever,
  Cough,
  RunnyNose,
  MuscleAche,
  Tiredness,
  SmellLoss,
  TasteLoss,
  Temperature,
  Weight
) {
  return {
    Date,
    Fever,
    Cough,
    RunnyNose,
    MuscleAche,
    Tiredness,
    SmellLoss,
    TasteLoss,
    Temperature,
    Weight,
  };
}

function SymptomsTable() {
  const [patientStatuses, setPatientStatuses] = useState([]);

  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getStatuses(userEmail, false)
      .then((statuses) => {
        statuses &&
          setPatientStatuses(
            statuses.map((status) =>
              createData(
                status?.timestamp?.toDate()?.toLocaleString() || "",
                status.fever || "No",
                status.cough || "No",
                status.runnyNose || "No",
                status.muscleAche || "No",
                status.soreThroat || "No",
                status.smellLoss || "No",
                status.tasteLoss || "No",
                status.temperature || "",
                status.weight || ""
              )
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  return (
    <TableContainer className="Symptoms-list">
      <h5 className="Symptoms-list__title">
        <img className="Symptoms-list__icon" src={VirusIcon} alt="Symptoms" />{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status List{" "}
        {patientStatuses && patientStatuses.length === 0 ? (
          <h5 className="SYMPTOMS-list__no-data">(NO SYMPTOMS ENTERED YET)</h5>
        ) : (
          ""
        )}
      </h5>
      {/* Making Table */}
      <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
        {/* Displaying Table headers */}
        <TableHead>
          <TableRow>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
            >
              Date
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Fever
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Cough
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Runny Nose
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Muscle Ache
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Sore Throat
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Smell Loss
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Taste Loss
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Temperature (&deg;C)
            </TableCell>
            <TableCell
              className="Symptoms-list__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Weight (lb)
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Displaying the data created */}
        <TableBody>
          {patientStatuses &&
            patientStatuses.map((row) => (
              <TableRow
                key={row.Date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  component="th"
                  scope="row"
                >
                  {row.Date}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.Fever}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.Cough}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.RunnyNose}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.MuscleAche}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.Tiredness}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.SmellLoss}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.TasteLoss}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.Temperature}
                </TableCell>
                <TableCell
                  className="Symptoms-list__data"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  {row.Weight}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              sx={{ borderColor: "transparent" }}
              component="th"
              scope="row"
            ></TableCell>
            <TableCell
              sx={{ borderColor: "transparent" }}
              style={{ width: 160 }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SymptomsTable;
