/**
 * @fileoverview This component displays the doctor's basic information.
 *
 */
import "./DoctorInfo.css";
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DoctorInfo() {
  return (
    <Box className="doctorInfo-box__container">
      <Grid container spacing={3}>
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
                  Jamal Doe
                </Typography>
                <Box className="doctorInfo-card__profileText">
                  <p className="doctorInfo-card__profileTextDetail">Age: 86</p>
                  <p className="doctorInfo-card__profileTextDetail">
                    Gender: male
                  </p>
                  <p className="doctorInfo-card__profileTextDetail">
                    Work Place: MUHC
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
                      Speciality: Family Doctor
                    </Item>
                    <Item
                      className="doctorInfo-card__data"
                      sx={{ bgcolor: "black", boxShadow: "none" }}
                    >
                      Patient spots: 10/20
                    </Item>
                    <Item
                      className="doctorInfo-card__data"
                      sx={{ bgcolor: "black", boxShadow: "none" }}
                    >
                      Experience: 7 years
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
