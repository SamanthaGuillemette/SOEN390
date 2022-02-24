import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  serverTimestamp,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./Chat.css";
import { deepOrange, deepPurple } from "@mui/material/colors";

const Chat = () => {
  const [user] = useAuthState(auth);
  const [msgToSend, setMsgToSend] = useState("");
  const clientRef = doc(db, "Client", user.email);
  const messageRef = collection(clientRef, "Messages");
  const q = query(messageRef, orderBy("timestamp"));

  const [messagesReceived, setMessagesReceived] = useState([]);
  const dummy = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(messageRef, {
      name: user.email,
      timestamp: serverTimestamp(),
      message: msgToSend,
    });

    setMsgToSend("");
  };

  useEffect(() => {
    onSnapshot(q, (doc) => {
      setMessagesReceived(
        doc.docs.map((doc) => ({
          name: doc.data().name,
          message: doc.data().message,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "",
        }}
        onSubmit={handleSubmit}
        noValidate
        component="form"
      >
        <Grid container spacing={2}>
          <Grid container>
            <Grid item xs={12}>
              <main id="messagesReceived">
                {messagesReceived &&
                  messagesReceived.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                <span ref={dummy}></span>
              </main>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 0 }}>
            <Grid item xs={2}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {user.email.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                value={msgToSend}
                autoFocus
                onChange={(e) => setMsgToSend(e.target.value)}
                placeholder="Type your message here..."
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                endIcon={<SendIcon />}
                disabled={!msgToSend}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
//This function is responsible for getting the messages and sorting them by sender and receiver.
//Then it returns the chating bubbles which are displayed above.
function ChatMessage(props) {
  const { name, timestamp, message } = props.message;
  const [user] = useAuthState(auth);

  const messageClass = name === user.email ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {name.toUpperCase().charAt(0)}
        </Avatar>

        <p>{message}</p>
      </div>
    </>
  );
}

export default Chat;
