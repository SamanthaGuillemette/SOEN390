import React, { useState } from "react";
import QrReader from "react-qr-reader";
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

  async function handleScan(QRScan) {
    if (QRScan) {
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
            onScan={handleScan}
            onError={(err) => console.log(err)}
            style={{ width: "300px" }}
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


////////////////////////////////////////////////////////////////////////
//////////////SHOULD BE MOVED TO THE CLIENT SIDE////////////////////////
////////////////////////////////////////////////////////////////////////
// // import { useAuthState } from "react-firebase-hooks/auth";
// import { useDocumentOnce } from "react-firebase-hooks/firestore";
// import { auth, db } from "../../backend/firebase";
// import { doc } from "firebase/firestore";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// const QR = () => {
//   // const [user, loading] = useAuthState(auth);
//   const user = auth.currentUser;
//   const [value] = useDocumentOnce(doc(db, "Users", user?.email));
//   const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${user?.email}`;

//   return (
//     <>
//       <Card sx={{ m: "30px" }}>
//         <CardContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             p: "30px",
//             mb: "20px",
//           }}
//         >
//           <Typography
//             sx={{
//               mx: "30px",
//               pb: "30px",
//               textAlign: "center",
//               fontWeight: "800",
//             }}
//             color="text.secondary"
//             variant="h5"
//           >
//             Patient Details
//           </Typography>
//           <Typography
//             sx={{ mx: "360px", justifyContent: "center", fontSize: 14 }}
//             variant="body2"
//           >
//             <strong>First Name: </strong>
//             {value && value.data().firstName}
//             {/* {loading && "loading..."} */}
//             <br />
//             <br />
//             <strong>Last Name: </strong>
//             {/* {loading && "loading..." */}
//             {value && value.data().lastName}
//             <br />
//             <br />
//             <strong>Email: </strong>
//             {value && value.data().email}
//             <br />
//             <br />
//           </Typography>

//           <Box sx={{ mx: "350px", mb: "30px" }}>
//             <img alt="QRCode" src={qrCode} />
//           </Box>

//           <Button
//             href={qrCode}
//             target="_blank"
//             variant="contained"
//             color="success"
//             sx={{ ":hover": { color: "white" } }}
//           >
//             Download QR Code
//           </Button>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default QR;
