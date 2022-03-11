import "./UpdateStatus.css";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import StatusModal from "./StatusModal";


function UpdateStatus() {
  return (
    <Grid container justify="center">
     <StatusModal />
    </Grid>
  );
}

export default UpdateStatus;
