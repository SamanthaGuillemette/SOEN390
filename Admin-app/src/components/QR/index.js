/**
 * @fileoverview This component takes care of the QR function.
 *
 */
import { useState } from "react";
import QrReader from "modern-react-qr-reader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// Source: https://reactjsexample.com/react-component-for-reading-qr-codes-from-webcam/

const useStyles = makeStyles({
  failureAlert: {
    "& .MuiAlert-icon": {
      color: "rgb(231, 167, 5)",
    },
  },
  successAlert: {
    "& .MuiAlert-icon": {
      color: "var(--success-main)",
    },
  },
});
/**
 * Scanner function that handles the scanned document and checks if the patient exist or not.
 */
const Scanner = () => {
  const classes = useStyles();
  const [scanned, setScanned] = useState("Not scanned yet!");
  const [displayProfile, setDisplay] = useState(false);
  const [patient, setPatient] = useState(false);
  const [notPatient, setNotPatient] = useState(false);
  const [patientDoc, setPatientDoc] = useState();

  /**
   * handling error function
   * @param  {} err
   */
  function handleError(err) {
    console.error(err);
  }

  /**
   * async function that handles the scanned code and checks if the patient exist or not
   * @param  {} QRScan
   */
  async function handleScan(QRScan) {
    try {
      if (QRScan) {
        console.log(QRScan);
        setPatient(false);
        setNotPatient(false);
        setDisplay(false);
        setScanned("Scanned successfully!");
        const docRef = doc(db, "Client", `${QRScan}`);
        const docSnap = await getDoc(docRef);
        console.log(docRef);
        if (docSnap.exists()) {
          setDisplay(true);
          setPatient(true);
          setPatientDoc(`${QRScan}`);
        } else {
          setNotPatient(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Card
        sx={{
          m: "30px",
          width: "1",
          bgcolor: "var(--background-main)",
          borderRadius: "10px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "30px",
            mb: "20px",
            fontWeight: "600",
            color: "var(--text-inactive)",
          }}
        >
          <Typography
            sx={{
              mx: "30px",
              pb: "30px",
              textAlign: "center",
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
            variant="h6"
          >
            Scan a QR Code to Generate Patients's Profile
          </Typography>
          <QrReader
            facingMode={"environment"}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />
          <br />
          <Typography
            sx={{
              mb: "20px",
              color: "var(--text-primary)",
            }}
          >
            {scanned}
          </Typography>
          {notPatient && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                severity="warning"
                className={classes.failureAlert}
                sx={{
                  bgcolor: "rgb(156, 113, 3, 0.18)",
                  color: "rgb(231, 167, 5)",
                  border: "1px solid rgb(231, 167, 5, 0.3)",
                  borderRadius: "2rem",
                }}
              >
                <AlertTitle>
                  <strong>No Results</strong>
                </AlertTitle>
                The patient is not registered, no profile was found.
              </Alert>
            </Stack>
          )}
          {patient && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                severity="success"
                className={classes.successAlert}
                sx={{
                  bgcolor: "var(--success-background)",
                  color: "var(--success-main)",
                  border: "1px solid var(--success-border)",
                  borderRadius: "2rem",
                }}
              >
                <AlertTitle>
                  <strong>Success</strong>
                </AlertTitle>
                The patient profile was found successfully!
                <Link to={`/patientprofile/${patientDoc}`}>
                  <strong> Click to display the profile! </strong>
                </Link>
              </Alert>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
};
export default Scanner;
