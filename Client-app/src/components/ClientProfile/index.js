import "./ClientProfile.css";
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
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DropdownConfirmation from "../DropdownConfirmation/index";
import { auth, db } from "../../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import EditModal from "./ProfileEditModal";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ClientProfile() {
  const [priorityFlag, setPriorityFlag] = useState(false);

  // Pull currently logged in user obj => to get user email below
  //const [user] = useAuthState(auth);

  // Query for a single user from the Client collection (table) based on user's email
  //const [currentUser] = useDocument(doc(db, `Client/${user?.email}`));

  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

  // useEffect(() => {
  //   const data = localStorage.getItem("priorityFlag");
  //   if (data) {
  //     setPriorityFlag(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("priorityFlag", JSON.stringify(priorityFlag));
  // });

  return (
    <Box className="clientProfile-container">
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12}>
          <Card>
            <Box className="clientProfile-profileCard">
              <EditModal />
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar id="clientProfile-avatar" src="" />
              </Grid>
              <CardContent>
                <Typography
                  data-testid="avatar"
                  className="profile-name"
                  gutterBottom
                  variant="button"
                  fontSize="1.2rem"
                  component="div"
                >
                  {`${userInfoDetails?.firstName} ${userInfoDetails?.lastName}`}
                </Typography>
                <Box className="clientProfile-text">
                  <p className="clientProfile-textDetail">
                    DOB: {userInfoDetails?.dob}
                  </p>
                  <p className="clientProfile-textDetail">
                    City: {userInfoDetails?.city}
                  </p>
                  <p className="clientProfile-textDetail">
                    Province: {userInfoDetails?.province}
                  </p>
                  <p className="clientProfile-textDetail">
                    Postal Code: {userInfoDetails?.postalCode}
                  </p>
                  <p className="clientProfile-textDetail">
                    Address: {userInfoDetails?.address}
                  </p>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <Card
              className={priorityFlag ? "status-card clicked" : "status-card"}
            >
              <CardActionArea>
                <CardContent>
                  <div className="clientProfile-statusBox">
                    <Typography
                      className="header"
                      gutterBottom
                      variant="button"
                      component="div"
                    >
                      Status
                      <FlagIcon
                        onClick={() => {
                          priorityFlag
                            ? setPriorityFlag(false)
                            : setPriorityFlag(true);
                        }}
                        className={
                          priorityFlag
                            ? "clientProfile-priority-flag clicked"
                            : "clientProfile-priority-flag"
                        }
                      ></FlagIcon>
                    </Typography>
                  </div>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" />}
                    spacing={1}
                    marginBottom={2}
                    alignItems="baseline"
                  >
                    <DropdownConfirmation className="profile-data"></DropdownConfirmation>
                    <span className="label-positive">positive</span>
                  </Stack>
                  <Box />
                  <Stack spacing={2}>
                    <Item
                      className="profile-data"
                      sx={{ bgcolor: "inherit", boxShadow: "none" }}
                    >
                      Temperature: 39 °C
                    </Item>
                    <Item
                      className="profile-data"
                      sx={{ bgcolor: "inherit", boxShadow: "none" }}
                    >
                      Weight: 150 lbs
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

export default ClientProfile;
