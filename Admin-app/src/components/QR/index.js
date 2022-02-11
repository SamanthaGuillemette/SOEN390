import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// Source: https://reactjsexample.com/react-component-for-reading-qr-codes-from-webcam/

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanResult: "No code scanned yet!"
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(QRScan) {
    if (QRScan) {
      this.setState({
        scanResult: QRScan
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <>
        <Card sx={{ m: "30px" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "30px",
              mb: "20px",
            }}
          >
            <Typography
              sx={{
                mx: "30px",
                pb: "30px",
                textAlign: "center",
                fontWeight: "800",
              }}
              color="text.secondary"
              variant="h8"
            >
              Scan a QR Code to Generate User's Profile
            </Typography>
            <QrReader
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "70%" }}
            />
            <p>{this.state.scanResult}</p>
            <Box sx={{ mx: "350px", mb: "30px" }}>
              <img alt="QRCode" src={`http://api.qrserver.com/v1/create-qr-code/?data=${this.state.scanResult}`} />
            </Box>
          </CardContent>
        </Card>
      </>
    );
  }
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
