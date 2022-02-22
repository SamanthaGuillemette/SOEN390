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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ClientProfile() {
  const [priorityFlag, setPriorityFlag] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("priorityFlag");
    if (data) {
      setPriorityFlag(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("priorityFlag", JSON.stringify(priorityFlag));
  });

  return (
    <Grid container spacing={3} padding={5}>
      <Grid item xs={12}>
        <Card>
          <Box className="clientProfile-profileCard">
            <Fab
              color="primary"
              aria-label="edit"
              className="clientProfile-editIcon"
            >
              <EditIcon fontSize="small" />
            </Fab>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                id="clientProfile-avatar"
                src="https://cdn.discordapp.com/attachments/943266123393142804/943303072300548156/Stevie.png"
              />
            </Grid>
            <CardContent>
              <Typography
                className="profile-name"
                gutterBottom
                variant="button"
                fontSize="1.2rem"
                component="div"
              >
                Jane Doe
              </Typography>
              <Box className="clientProfile-text">
                <p className="clientProfile-textDetail">Age: 50</p>
                <p className="clientProfile-textDetail">
                  Birthday: 1 July 1971
                </p>
                <p className="clientProfile-textDetail">
                  Address: 101 Brooke, Montreal L5L 9T9
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
                <Box className="clientProfile-statusBox">
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
                </Box>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" />}
                  spacing={1}
                  marginBottom={2}
                  alignItems="baseline"
                >
                  <FormControl sx={{ width: 115 }}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Confirmation
                    </InputLabel>
                    <NativeSelect
                      size="small"
                      defaultValue={20}
                      inputProps={{
                        name: "confirmation",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={10}>Confirmed</option>
                      <option value={20}>Unconfirmed</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="label-positive">positive</span>
                </Stack>
                <Box />
                <Stack spacing={2}>
                  <Item>Temperature: 39 °C</Item>
                  <Item>Weight: 150 lbs</Item>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ClientProfile;
