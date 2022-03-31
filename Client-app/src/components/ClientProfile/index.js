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
import EditModal from "./ProfileEditModal";
import { useSelector } from "react-redux";

function ClientProfile() {
  /**
   * Pull 'userInfoDetails' from the store (Redux centralized store)
   */
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

  return (
    <Box className="clientProfile-container">
      <Grid container spacing={5}>
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
      </Grid>
    </Box>
  );
}

export default ClientProfile;
