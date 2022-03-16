/**
 * @fileoverview This component displays & handles the QR code for client.
 *
 */
 import { useDocumentOnce } from "react-firebase-hooks/firestore";
 import { auth, db } from "../../backend/firebase";
 import { doc } from "firebase/firestore";
 import Button from "@mui/material/Button";
 import Card from "@mui/material/Card";
 import CardContent from "@mui/material/CardContent";
 import Typography from "@mui/material/Typography";
 import Box from "@mui/material/Box";
 import "./QR.css";
 
 const QR = () => {
   // const [user, loading] = useAuthState(auth);
   const user = auth.currentUser;
   const [value] = useDocumentOnce(doc(db, "Client", user?.email));
 
   // Declaring a constant that uses the data of the user to generate a unique qr code for the user using a qrserver website
   const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${user?.email}`;
 
   return (
     <>
 
       <div className="QR__container">
         <Card className="QR-box">
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
               color="var(--text-primary)"
               variant="h5"
             >
               Patient Details
             </Typography>
             <Typography
               sx={{
                 mx: "360px",
                 justifyContent: "center",
                 fontSize: 14,
                 color: "var(--text-primary)",
               }}
               variant="body2"
             >
               <strong>First Name: </strong>
               {value && value.data().firstName}
               {/* {loading && "loading..."} */}
               <br />
               <br />
               <strong>Last Name: </strong>
               {/* {loading && "loading..." */}
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
               className="download-QR"
             >
               Download QR Code
             </Button>
           </CardContent>
         </Card>
       </div>
     </>
   );
 };
 
 export default QR;