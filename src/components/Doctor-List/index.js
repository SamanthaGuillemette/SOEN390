import React from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@mui/material/Typography";
import "./Doctor-List.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    padding: theme.spacing(1.2)
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  }
}));

function DoctorList(props) {
  const classes = useStyles();
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
Math.ceil(projectsList.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
      <List className="doctor-list" dense compoent="span">
      <Typography className="doctors" variant="h6">Doctors</Typography>
      <Typography className="numOfPatients" variant="h6">Patient No.</Typography>
        {projectsList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(projectItem => {
            const labelId = `list-secondary-label-${projectItem.projectName}`;
            return (
              <ListItem
                key={projectItem.projectID}
                button
                onClick={() => console.log("")}
              >
                <ListItemAvatar>
                  <Avatar src={projectItem.projectImage} />
                </ListItemAvatar>
                <ListItemText
                  className="doctor-data"
                  id={labelId}
                  primary={projectItem.doctorname}
                />
                <ListItemText
                  className="doctor-data"
                  id={labelId}
                  primary={projectItem.numOfPatients}
                  align = "right"
                />
              </ListItem>
            );
          })}

      <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          size="small"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </List>
  );
};

export default DoctorList;

const projectsList = [
  {
    projectID: 1,
    doctorname: "Allyson Richards",
    numOfPatients: "4/10"
  },
  {
    projectID: 2,
    doctorname: "Charles Ludwig",
    numOfPatients: "3/10"
  }
];
