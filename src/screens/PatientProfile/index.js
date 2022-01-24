import "./PatientProfile.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function PatientProfile() {

  function createData(ID, StartDate, EndDate, Fever, Cough, RunnyNose, MuscleAche, TirednessGrogginess, SmellLoss, TasteLoss) {
    return { ID, StartDate, EndDate,Fever, Cough, RunnyNose, MuscleAche, TirednessGrogginess, SmellLoss, TasteLoss};
  }

  const rows = [
    createData('Frozen yoghurt', 159, 2, 3, 2 , 5,2,2,2,9,),
    createData('Frozen yoghurt', "Jan 15", "Jan 25", "Yes", "No", "No","Yes","No","No","Yes",)
  ];
  
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
    <Grid item xs={12} lg={8}>
  
  <TableContainer component={Paper}><h3>&nbsp;&nbsp;&nbsp;&nbsp;Details List</h3>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID </TableCell>
            <TableCell align="right" >Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Fever</TableCell>
            <TableCell align="right">Cough</TableCell>
            <TableCell align="right">Runny Nose</TableCell>
            <TableCell align="right">Muscle Ache</TableCell>
            <TableCell align="right">Tiredness/Groginess</TableCell>
            <TableCell align="right">Smell Loss</TableCell>
            <TableCell align="right">Taste Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.StartDate}</TableCell>
              <TableCell align="right">{row.EndDate}</TableCell>
              <TableCell align="right">{row.Fever}</TableCell>
              <TableCell align="right">{row.Cough}</TableCell>
              <TableCell align="right">{row.RunnyNose}</TableCell>
              <TableCell align="right">{row.MuscleAche}</TableCell>
              <TableCell align="right">{row.TirednessGrogginess}</TableCell>
              <TableCell align="right">{row.SmellLoss}</TableCell>
              <TableCell align="right">{row.TasteLoss}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>
    <Grid item xs={6} lg={6} >
      <Card>
       <CardActionArea >
         <CardContent>
         <Typography gutterBottom variant="h5" component="div">
              Patient Diary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Typography>
         </CardContent>
        </CardActionArea> 
      </Card>
    </Grid>
    <Grid item xs={6} lg={6} >
    <Card>
       <CardActionArea >
         <CardContent>
         <Typography gutterBottom variant="h5" component="div">
              History Details List
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br></br>Status: unconfirmed
              <br></br>Temperature
              <br></br>List of Symptoms
            </Typography>
         </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  </Grid>
  );
}

export default PatientProfile;
