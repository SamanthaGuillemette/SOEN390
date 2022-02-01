import "./PatientProfile.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PatientProfile() {
  function createData(
    Date,
    Fever,
    Cough,
    RunnyNose,
    MuscleAche,
    Tiredness,
    SmellLoss,
    TasteLoss
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
    };
  }

  const rows = [
    createData("Jan 25", "No", "Yes", "No", "Yes", "Yes", "No", "No"),
    createData("Jan 26", "No", "Yes", "No", "No", "No", "No", "No")
  ];

  return (
    <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
      <Grid item xs={8} lg={4}>
        <Card>
          <CardActionArea>
            <Avatar
              id="avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg"
            />
            <CardContent>
              <Typography
                className="profile-name"
                gutterBottom
                variant="button"
                fontSize="1.2rem"
                component="div"
              >
                John Doe
              </Typography>
              <Typography
                className="text"
                variant="body2"
                color="text.secondary"
              >
                <br></br>Age: 50
                <br></br>Birthday: 1 July 1971
                <br></br>Address: 101 Brooke, Montreal L5L 9T9
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid container spacing={2} item rowSpacing={2} direction="column" xs={6}>
        <Grid item>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="button" component="div">
                  Status
                  <br></br>
                  <br></br>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" />}
                      spacing={1}
                      alignItems="baseline"
                    >
                      
                      <FormControl sx={{width: 115}} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Confirmation
                        </InputLabel>
                        <NativeSelect
                          size="small"
                          defaultValue={20}
                          inputProps={{
                            name: 'confirmation',
                            id: 'uncontrolled-native',
                          }}>
                          <option value={10}>Confirmed</option>
                          <option value={20}>Unconfirmed</option>
                        </NativeSelect>
                      </FormControl>
                      <Item class="label-pos">positive</Item>
                      <Item>Temperature: 39 °C</Item>
                      <Item>Weight: 150 lbs</Item>
                    </Stack>
                  </div>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid container spacing={2} item rowSpacing={2} direction="row">
          <Grid item xs={6}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Assigned Doctor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Name:{" "}
                    <Link to="/doctor" className="link">
                      {" "}
                      Michael Scott
                    </Link>
                    <Checkbox size="small" style ={{color: "white"}}/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Status Review
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review Completed: <Checkbox size="small"/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={10}>
        <TableContainer component={Paper}>
          <h5>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SYMPTOM DETAILS
            <Button id="addButton"><AddCircleIcon></AddCircleIcon></Button>
          </h5>
          <Table sx={{ minWidth: 650 }} aria-label="collapsable table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Fever</TableCell>
                <TableCell align="right">Cough</TableCell>
                <TableCell align="right">Runny Nose</TableCell>
                <TableCell align="right">Muscle Ache</TableCell>
                <TableCell align="right">Tiredness</TableCell>
                <TableCell align="right">Smell Loss</TableCell>
                <TableCell align="right">Taste Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Date}
                  </TableCell>
                  <TableCell align="right">{row.Fever}</TableCell>
                  <TableCell align="right">{row.Cough}</TableCell>
                  <TableCell align="right">{row.RunnyNose}</TableCell>
                  <TableCell align="right">{row.MuscleAche}</TableCell>
                  <TableCell align="right">{row.Tiredness}</TableCell>
                  <TableCell align="right">{row.SmellLoss}</TableCell>
                  <TableCell align="right">{row.TasteLoss}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
  );
}

export default PatientProfile;