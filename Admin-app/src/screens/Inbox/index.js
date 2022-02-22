import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { db, auth } from "../../backend/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import { doc, serverTimestamp, addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore"; 
import './Chat.css'
import ChatList from './ChatList.js';
import Typography from '@material-ui/core/Typography';
import { green, pink } from '@mui/material/colors';

const Inbox = () => {
    
    const [user] = useAuthState(auth);
    const [msgToSend, setMsgToSend] = useState('');
    const [clientMessage, setClientMessage] = useState(' ');
    const clientRef = doc(db, "Client", clientMessage)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp'))
    const [messagesReceived, setMessagesReceived]  = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(messageRef, {
            name: user.email,
            timestamp: serverTimestamp(),
            message: msgToSend,
        });
        setMsgToSend("")
    }

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
