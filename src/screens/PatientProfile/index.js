import "./PatientProfile.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function PatientProfile() {
  
  return (
   <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
     <Grid item xs={8} lg={4}>
      <Card >
        <CardActionArea>
          <Avatar  id="avatar" src="/broken-image.jpg" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br></br>Age: 30
              <br></br>Birthday: 1 July 1991
              <br></br>Weight: 150 lb
              <br></br>Address: 101 Brooke, Montreal L5L 9T9
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>  
  </Grid>
  );
}

export default PatientProfile;
