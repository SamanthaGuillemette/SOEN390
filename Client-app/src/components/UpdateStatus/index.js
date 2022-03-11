import "./UpdateStatus.css";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StatusModal from "./StatusModal";


function UpdateStatus() {
  return (
    <Grid container justify="center">
     <StatusModal />
    </Grid>
  );
}

export default UpdateStatus;
