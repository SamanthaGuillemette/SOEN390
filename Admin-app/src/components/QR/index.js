import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { auth, db } from "../../backend/firebase";
import { doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const QR = () => {
  const [user, loading] = useAuthState(auth);
  const [value] = useDocumentOnce(doc(db, "Users", user.email));
  const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${user.email}`;

  return (
    <>
      <Card sx={{ m: "30px", background: 'linear-gradient(to right bottom, #8bc3eb, #949be2)', borderRadius: "20px"}}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "30px",
            mb: "20px",
            background: 'linear-gradient(to right bottom, #8bc3eb, #949be2)',
          }}
        >
          <Typography
            sx={{
              mx: "30px",
              pb: "30px",
              textAlign: "center",
              fontWeight: "800",
            }}
            color="white"
            variant="h5"
          >
            Patient Details
          </Typography>
          <Typography
            sx={{ mx: "360px", justifyContent: "center", fontSize: 14, color: "white" }}
            variant="body2"
          >
            <strong>First Name: </strong>
            {value && value.data().firstName}
            {loading && "loading..."}
            <br />
            <br />
            <strong>Last Name: </strong>
            {loading && "loading..."}
            {value && value.data().lastName}
            <br />
            <br />
            <strong>Email: </strong>
            {value && value.data().email}
            <br />
            <br />
          </Typography>

          <Box sx={{ mx: "350px", mb: "30px" }}>
            <img alt="QRCode" src={qrCode} />
          </Box>

          <Button
            href={qrCode}
            target="_blank"
            variant="contained"
            sx={{ 
              bgcolor: "#1e1e1e",
              borderRadius: "10px",
              ":hover": { color: "white", bgcolor: "#949be2"} }}
          >
            Download QR Code
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default QR;
