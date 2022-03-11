import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const style = {
  position: "absolute",
  top: "49%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "57vh",
  height: "78vh",
  bgcolor: "var(--background-secondary)",
  p: 3,
  borderRadius: "10px",
};

export default function SimpleModal() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div> 
      <Button onClick={handleOpen} variant="outlined" className='updateStatus-button'>Add Status</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
        >
          <Typography className="header-statusModal" variant="h6" component="h2" sx={{ mb: 2 }}>
            ADD STATUS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Date*"
                variant="standard"
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Temperature*"
                variant="standard"
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Weight*"
                variant="standard"
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>

            <Grid item style = {{maxWidth: "160px"}} sx={{ lineHeight: 3 }} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Fever</Typography>} labelPlacement="start"/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} sx={{ lineHeight: 3 }} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Sore Throat</Typography>} labelPlacement="start"/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Tiredness</Typography>} labelPlacement="start"/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Runny Nose</Typography>} labelPlacement="start"/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Cough</Typography>} labelPlacement="start"/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={12} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue",}}/> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Smell Loss</Typography>} labelPlacement="start"/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="save-button"
            style={{display: 'flex', justifyContent: 'center'}}
            sx={{ mt: 5, mb: 2}}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
