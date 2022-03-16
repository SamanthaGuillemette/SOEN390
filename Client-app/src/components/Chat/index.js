/**
 * @fileoverview This component takes care of the chat function.
 *
 */
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Box,
  ListItemAvatar,
} from "@mui/material";
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
  updateDoc,
  increment,
} from "firebase/firestore";
import Typography from "@material-ui/core/Typography";
import "./Chat.css";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name?.toUpperCase().charAt(0),
  };
}

/**
 * This component is what allows the chatting feature to work. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send information.
 *
 * @returns {JSX.Element}
 */
const Chat = () => {
  const [user] = useAuthState(auth);
  const [msgToSend, setMsgToSend] = useState("");
  const clientRef = doc(db, `Client/${user?.email}`);
  const messageRef = collection(clientRef, "Messages");
  const counterCol = collection(clientRef, "Counter");
  const counterRef = doc(counterCol, "counter");
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

    await updateDoc(counterRef, {
      counterDoc: increment(1),
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
        onSubmit={handleSubmit}
        noValidate
        component="form"
      >
        <Grid container spacing={2}>
          <Grid container>
            <Grid item xs={12}>
              <Grid id="messagesReceived">
                {messagesReceived &&
                  messagesReceived.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                <span ref={dummy}></span>
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 5 }}>
            <Grid item xs={1} sx={{ marginLeft: "20px" }}>
              <Avatar {...stringAvatar(user?.email)} />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                value={msgToSend}
                autoFocus
                onChange={(e) => setMsgToSend(e.target.value)}
                placeholder="Type your message here..."
                sx={{
                  input: {
                    color: "white"
                  },
                  bgcolor: "#262626",
                  borderRadius: "15px",
                  width: "90%",
                  marginLeft: "10px",
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                type="submit"
                variant="contained"
                className="CHAT__send-button"
                sx={{ mb: 1}}
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
      <div className={`INBOX__message ${messageClass}`}>
        <ListItemAvatar
          sx={{ marginBottom: "10px", marginLeft: "10px", marginRight: "10px" }}
        >
          <Avatar {...stringAvatar(name)} />
        </ListItemAvatar>
        <Typography>{message}</Typography>
      </div>
    </>
  );
}

export default Chat;
