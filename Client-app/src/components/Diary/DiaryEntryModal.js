import Box from "@mui/material/Box";
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
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",

  bgcolor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "10px",
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
        onClick={handleEntryOpen}
        color="primary"
        aria-label="edit"
        className="clientProfile-editIcon"
      >
        <EditIcon fontSize="small" />
      </Fab>
      <Dialog
        open={openEntry}
        onClose={handleEntryClose}
        aria-labelledby="diary-entry-title"
        aria-describedby="diary-entry-description"
      >
        <DialogTitle id="diary-entry-dialog-title">
          <img className="symptoms__icon" src={NoteIcon} alt="Diary" />
          Diary Entry
        </DialogTitle>
        <DialogContent>
          <Box className="diaryEntry-text">
            <p className="diaryEntry-contactDate">Contact Date: 2022-02-02</p>
            <p className="diaryEntry-contactFullName">
              Contact Full Name: Julie Doe
            </p>
            <p className="diaryEntry-phoneNumber">Phone Number: 555-555-5555</p>
            <p className="diaryEntry-email">Email: email@email.com</p>
            <p className="diaryEntry-contactLocation">
              Contact Location: Concordia Hall Building
            </p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEntryClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DiaryEntryModal;
