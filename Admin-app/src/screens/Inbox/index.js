import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../backend/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import { doc, serverTimestamp, addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore"; 
import './Chat.css'
import ChatList from './ChatList.js';
import Typography from '@material-ui/core/Typography';
import { green, pink } from '@mui/material/colors';

// This component is what allows the chatting feature to work. Below are many consts and 
// useEffect hooks that communicate with the database in order to recieve or send information.
const Inbox = () => {
    
    const [user] = useAuthState(auth);
    const [msgToSend, setMsgToSend] = useState('');
    const [clientMessage, setClientMessage] = useState(' ');
    const clientRef = doc(db, "Client", clientMessage)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp'))
    const [messagesReceived, setMessagesReceived]  = useState([]);
    const dummy = useRef();

    // This method allows the user to send messages to the data base using asynchronus methods. 
    // The addDoc funtion adds a document which is essentially a mesage in the database. 
    // This message gets added to the patient's database collection. 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(messageRef, {
            name: user.email,
            timestamp: serverTimestamp(),
            message: msgToSend,
        });
        setMsgToSend("")
    }

    // This hook allows this component to receive messages from the database, the same location as the const above. 
    // The onSnapshot listens for changes and then updates the user interface to show new messages being sent or received in the chat box. 
    useEffect(() => {
        onSnapshot(q, (doc) => {
          setMessagesReceived(doc.docs.map(doc=> ({
              name: doc.data().name,
              message: doc.data().message,
              timestamp: doc.data().timestamp,
          })))
      })
        // eslint-disable-next-line
    }, [clientMessage])

    // This hook scrolls down to the latest message that was sent. 
    useEffect(() => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    })

    // This function allows the child component to communicate with this parent component.
    // The child component is sending which user has been selected to display their messages. 
    const pull_data = (data) => {
      if(data){  
        setClientMessage(data.name); 
      }
    };
    
    return (
        
        <>
         <Box 
            onSubmit={handleSubmit} 
            noValidate 
            component="form"
            >
            <Grid container spacing={2}>
                <Grid item xs={6}> 
                    <ChatList func={pull_data} />
                </Grid>
                <Grid item xs={6}>
                       <Grid container sx={{ mb: 2 }} >
                             <Typography variant="h5" className="header-message">{clientMessage}</Typography>
                       </Grid>
                        <Grid container spacing={2}>
                             <Grid container>
                                <Grid item xs={12}>
                                    <main id="messagesReceived">
                                        {messagesReceived && messagesReceived.map(msg => <ChatMessage key={msg.timestamp} message={msg} />)}
                                        <span ref={dummy}></span>
                                    </main> 
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Avatar sx={{ bgcolor: pink[500] }}>{user.email.charAt(0).toUpperCase()}</Avatar>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={msgToSend}
                                        autoFocus
                                        onChange={(e) => setMsgToSend(e.target.value)}
                                        placeholder="Type your message here..."
                                    />
                                </Grid>
                                <Grid item>
                                     <Button type="submit"
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
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

//This function is responsible for getting the messages and sorting them by sender and receiver.
//Then it returns the chating bubbles which are displayed above. 
function ChatMessage(props) {
    
    const {name, timestamp, message } = props.message
    const [user] = useAuthState(auth);
    const avatarColor = (name === user.email ? pink[500] : green[500])
    const messageClass = (name === user.email ? 'sent' : 'received')
    
    return (
        <>
            <div className={`message ${messageClass}`}>
                <Avatar sx={{ bgcolor: avatarColor }}>{name.toUpperCase().charAt(0)}</Avatar>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Inbox;
