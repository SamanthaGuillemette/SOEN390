import "./DoctorInfo.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { auth, db } from "../../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DoctorInfo() {
  // Pull currently logged in user obj => to get user email below
  const [user] = useAuthState(auth);

  // Query for a single user from the Client collection (table) based on user's email
  const [currentUser] = useDocument(doc(db, `Client/${user?.email}`));
  // Query for a the assigned doctor from the Doctors collection (table) based on client's email
  const [assignedDoctor] = useDocument(
    doc(db, `Doctors/${currentUser?.data().assignedDr}`)
  );

  return (
    <Box className="doctorInfo-box__container">
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12}>
          <Card>
            <Box className="doctorInfo-card__profile">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  id="doctorInfo-card__img"
                  src="https://media.discordapp.net/attachments/948246278490456064/949745262367232100/unknown.png"
                />
              </Grid>
              <CardContent>
                <Typography
                  data-testid="avatar"
                  className="doctorInfo-card__profileName"
                  gutterBottom
                  variant="button"
                  fontSize="1.2rem"
                  component="div"
                >
                  {`${assignedDoctor?.data().firstName} ${
                    assignedDoctor?.data().lastName
                  }`}
                </Typography>
                <Box className="doctorInfo-card__profileText">
                  <p className="doctorInfo-card__profileTextDetail">
                    Age: {`${assignedDoctor?.data().age}`}
                  </p>
                  <p className="doctorInfo-card__profileTextDetail">
                    Gender: {`${assignedDoctor?.data().gender}`}
                  </p>
                  <p className="doctorInfo-card__profileTextDetail">
                    Work Place: {`${assignedDoctor?.data().workPlace}`}
                  </p>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <Card className="doctorInfo-card__info">
              <CardActionArea>
                <CardContent>
                  <div>
                    <Typography
                      className="doctorInfo-card__header"
                      gutterBottom
                      variant="button"
                      component="div"
                    >
                      Info
                    </Typography>
                  </div>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" />}
                    spacing={1}
                    marginBottom={2}
                    alignItems="baseline"
                  ></Stack>
                  <Box />
                  <Stack spacing={2}>
                    <Item
                      className="doctorInfo-card__data"
                      sx={{ bgcolor: "black", boxShadow: "none" }}
                    >
                      Speciality: {`${assignedDoctor?.data().speciality}`}
                    </Item>
                    <Item
                      className="doctorInfo-card__data"
                      sx={{ bgcolor: "black", boxShadow: "none" }}
                    >
                      Patient spots: {`${assignedDoctor?.data().patientSpots}`}
                      /20
                    </Item>
                    <Item
                      className="doctorInfo-card__data"
                      sx={{ bgcolor: "black", boxShadow: "none" }}
                    >
                      Experience: {`${assignedDoctor?.data().experience}`} years
                    </Item>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorInfo;
