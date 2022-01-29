import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./Doctor-List.css";

function DoctorList() {
  return (
    <List className="doctor-list"sx={{ width: "100%", maxWidth: 300 }}>
      <Typography className="doctors" variant="h6">Doctors</Typography>
      <Typography className="numOfPatients" variant="h6">Patient No.</Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText className="doctor-data" primary="Allyson Richards"/>
        <ListItemText className="doctor-data" align="right"primary="1/10"/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText className="doctor-data" primary="Charles Ludwig"/>
        <ListItemText className="doctor-data" align="right" primary="1/10"/>
      </ListItem>
    </List>
  );
}

export default DoctorList;