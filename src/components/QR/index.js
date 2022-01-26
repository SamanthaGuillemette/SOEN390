import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../backend/firebase';
import { doc } from "firebase/firestore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const QR = () => {

  const [user, loading, error] = useAuthState(auth);
  const [value, loading2, error2, reload] = useDocumentOnce(doc(db, "Users", user.email));
  const text = user.email;
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${text}`);
  }, [text]);

  return (
    <div>
       <Box
        component="span"
        sx={{ width: 1000, display: 'inline-block', mx: '30px', transform: 'scale(0.8)' }}
      >
         <Card >
        <CardContent sx={{ justifyContent:"center", fontSize: 20 }}>
          <Typography sx={{mx: '430px'}} color="text.secondary" gutterBottom>
            Patient  Details
            <br /><br />
          </Typography>
          <Typography sx={{ mx: '360px', justifyContent:"center", fontSize: 14}} variant="body2">
            <strong>First Name: </strong>
            {value && value.data().firstName}
            {loading && "loading..."}
            <br /><br />
            <strong>Last Name: </strong>
            {loading && "loading..."}
            {value && (value.data().lastName)}
            <br /><br />
            <strong>Email: </strong>
            {value && (value.data().email)}
            <br /><br />
          </Typography>
          <Typography sx={{mx: '350px'}}>
            <img src={qrCode} />
            <br /> <br />
          </Typography>
          <Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <a href={qrCode} download="QRCode">
                <Button variant="contained" color="success">Download QR Code</Button>
              </a>
            </Stack>
          </Typography>
        </CardContent>
      </Card>
      </Box>
    </div>
  );
};

export default QR;
