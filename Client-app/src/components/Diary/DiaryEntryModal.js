/**
 * @fileoverview This component displays the modal for adding a new diary entry.
 *
 */
import Button from "@mui/material/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../backend/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { makeStyles } from "@material-ui/core/styles";
import NoteIcon from "../../assets/note.svg";
import "./DiaryTable.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import BookIcon from "@mui/icons-material/Book";
import Grid from "@mui/material/Grid";

const style = {
  //position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  color: "var(--text-main)",
  backgroundColor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "20px",
  borderColor: "var(--primary-light)",
};

const DiaryEntryModal = () => {
  //const [user] = useAuthState(auth);
  //const diaryDoc = doc(db, `Diary/${user?.email}`);
  const [openEntry, setOpenEntry] = useState(false);

  const handleEntryOpen = () => setOpenEntry(true);
  const handleEntryClose = () => setOpenEntry(false);
  return (
    <div sx={style}>
      <Fab
        sx={{ boxShadow: 3 }}
        onClick={handleEntryOpen}
        color="primary"
        aria-label="openEntry"
        className="diaryEntry-openIcon"
      >
        <BookIcon fontSize="small" />
      </Fab>
      <div className="diaryEntry">
        <Dialog
          //sx={{ borderColor: "var(--primary-light)", borderRadius: 3 }}
          open={openEntry}
          onClose={handleEntryClose}
          aria-labelledby="diary-entry-title"
          aria-describedby="diary-entry-description"
        >
          <DialogTitle
            id="diary-entry-dialog-title"
            className="header-diaryEntry-dialog"
          >
            <img className="diaryEntry__icon" src={NoteIcon} alt="Diary" />
            Diary Entry
          </DialogTitle>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={6} className="diaryEntry-text">
                <p className="diaryEntry-contactDate">Contact Date:</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-data">2022-02-02</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-contactFullName">Desciption:</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-data">Family Reunion</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-phoneNumber">Location:</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-data">Mcdonalds</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-email">Postal Code</p>
              </Grid>
              <Grid item xs={6}>
                <p className="diaryEntry-data">H2K 3E3</p>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="diaryEntry-cancel-button"
              onClick={handleEntryClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default DiaryEntryModal;
