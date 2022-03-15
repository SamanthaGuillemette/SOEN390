/**
 * @fileoverview This component takes care of the chat function.
 *
 */

import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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

/**
 * This component is what allows the chatting feature to work. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send information.
 *
 * @returns {JSX.Element}
 */
const Chat = () => {
  const [user] = useAuthState(auth);
  const [msgToSend, setMsgToSend] = useState("");
  const clientRef = doc(db, "Client", user.email);
  const messageRef = collection(clientRef, "Messages");
  const q = query(messageRef, orderBy("timestamp"));

  const [messagesReceived, setMessagesReceived] = useState([]);
  const dummy = useRef();

  /**
   * This method allows the user to send messages to the data base using asynchronus methods.
   * The addDoc funtion adds a document which is essentially a message in the database.
   * This message gets added to the patient's database collection.
   * @param  {ClieckEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(messageRef, {
      name: user.email,
      timestamp: serverTimestamp(),
      message: msgToSend,
    });

    setMsgToSend("");
  };

  /**
   * This hook allows this component to receive messages from the database, the same location as the const above.
   * The onSnapshot listens for changes and then updates the user interface to show new messages being sent or received in the chat box.
   */
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

  // This hook scrolls down to the latest message that was sent.
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

/**
 * This function is responsible for getting the messages and sorting them by sender and receiver.
 * Then it returns the chating bubbles which are displayed above.
 */
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
