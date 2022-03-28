/**
 * @fileoverview This component displays the client profile page.
 *
 */
import "./ClientProfile.css";
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
import { useState } from "react";
import EditModal from "./ProfileEditModal";
import { useSelector } from "react-redux";
import { selectUserInfoDetails } from "../../store/userInfoSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ClientProfile() {
  const [priorityFlag, setPriorityFlag] = useState(false);

  /**
   * Pull 'userInfoDetails' from the store (Redux centralized store)
   */
  const userInfoDetails = useSelector(selectUserInfoDetails);

  return (
    <Box className="clientProfile-container">
      <Grid container spacing={3}>
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
                <Avatar
                  id="clientProfile-avatar"
                  src={userInfoDetails?.profileImage}
                />
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
                      className="profile__header"
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
                    <span
                      className={
                        userInfoDetails?.status === "POSITIVE"
                          ? "PATIENT__label-positive"
                          : userInfoDetails?.status === "NEGATIVE"
                          ? "PATIENT__label-negative"
                          : "PATIENT__label-unconfirmed"
                      }
                    >
                      {userInfoDetails?.status}
                    </span>
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
