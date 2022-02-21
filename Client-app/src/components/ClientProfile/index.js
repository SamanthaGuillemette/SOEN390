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
import Fab from '@mui/material/Fab';
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
    <Grid container spacing={2}>
      <Grid item xs={8} lg={9} margin={5}>
        <Card className="avatar-card">
          <CardActionArea className="avatar-card">
            <Fab color="primary" aria-label="edit" className="edit-icon"><EditIcon />
            </Fab>
            <Grid
              container
              columnSpacing={7}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                id="avatar"
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
              <Typography
                className="text"
                variant="body2"
                color="text.secondary"
              >
                <Box>Age: 50</Box>
                <Box>Birthday: 1 July 1971</Box>
                <Box>Address: 101 Brooke, Montreal L5L 9T9</Box>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        item
        rowSpacing={2}
        direction="column"
        xs={6.1}
      >
        <Grid item>
          <Card
            className={priorityFlag ? "status-card clicked" : "status-card"}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="button" component="div">
                  Status{" "}
                  <FlagIcon
                    onClick={() => {
                      priorityFlag
                        ? setPriorityFlag(false)
                        : setPriorityFlag(true);
                    }}
                    className={
                      priorityFlag ? "priority-flag clicked" : "priority-flag"
                    }
                  ></FlagIcon>
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" />}
                  spacing={1}
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
                <Stack spacing={1}>
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
