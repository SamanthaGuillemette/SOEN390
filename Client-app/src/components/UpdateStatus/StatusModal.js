import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vh",
  height: "75vh",
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
          <Grid container spacing={3}>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="save-button"
            sx={{ mt: 3, mb: 2}}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
