import React, { useState } from "react";
import QrReader from 'modern-react-qr-reader';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// Source: https://reactjsexample.com/react-component-for-reading-qr-codes-from-webcam/

const Scanner = () => {

  const [scanned, setScanned] = useState("Not scanned yet!");
  const [displayQR, setDisplay] = useState(false);
  const [patient, setPatient] = useState(false);
  const [notPatient, setNotPatient] = useState(false);
  const [qr, setQR] = useState("");

  function handleError (err) {
    console.error(err)
  } 

  async function handleScan(QRScan) {
    if (QRScan) {
      console.log(QRScan);
      setPatient(false);
      setNotPatient(false);
      setDisplay(false);
      setScanned("Scanned successfully!");
      const docRef = doc(db, "Patients", `${QRScan}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQR(`http://api.qrserver.com/v1/create-qr-code/?data=${QRScan}`);
        setDisplay(true);
        setPatient(true);
      } else {
        setNotPatient(true);
      }
    }
  }

  return (
    <>
      <Card sx={{ m: "30px", width: "1" }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: "30px", mb: "20px" }}
        >
          <Typography
            sx={{ mx: "30px", pb: "30px", textAlign: "center", fontWeight: "800" }}
            color="text.secondary"
            variant="h6"
          >
            Scan a QR Code to Generate User's Profile
          </Typography>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setScanned(result?.text);
              }
              if (!!error) {
                console.info(error);
              }
            }}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '300px' }}
          />
          <br />
          <p>{scanned}</p>
          {displayQR &&
            <Box sx={{ mx: "300px", mb: "30px" }}>
              <img alt="QRCode" src={qr} />
            </Box>
          }
          {notPatient &&
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">The patient is not registered, no profile was found.</Alert>
            </Stack>
          }
          {patient &&
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">The patient profile was found successfully!</Alert>
            </Stack>
          }
        </CardContent>
      </Card>
    </>
  );
}
export default Scanner;