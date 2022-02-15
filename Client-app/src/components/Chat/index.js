import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import { useState } from "react";
import { db, auth } from "../../backend/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, serverTimestamp, addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore"; 
import './Chat.css'


const Chat = () => {
    
    const [user] = useAuthState(auth);
    const [msgToSend, setMsgToSend] = useState('');
    const clientRef = doc(db, "Client", user.email)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp'))
    const messagesReceived  = [{name: "tushar@client.com", message:"shalom" }, {name: "tushar@admin.com", message:"hey how are you?" }, {name: "tushar@client.com", message:"I'm feeling a little sick today :(" },
    {name: "tushar@admin.com", message:"Oh no, what is the problem?" }];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(messageRef, {
            name: user.email,
            timestamp: serverTimestamp(),
            message: msgToSend,
        });
        setMsgToSend('')
    }

    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         messagesReceived.push(doc.data())
    //     } )
    // })

    return (
        <>
            <Navbar />
            <Box sx={{
                padding: 4,
                backgroundColor: ""}} 
                onSubmit={handleSubmit} 
                noValidate 
                component="form"
            >
                <Grid container spacing={2}>
                    <Grid container>
                        <Grid item xs={12}>
                            <main>
                             {messagesReceived && messagesReceived.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                            </main> 
                        </Grid>
                    </Grid>

                    <Grid container sx={{mb:0,}}>
                        <Grid item xs={2}>
                            <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
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
            </Box>
            <BottomNav />
            
        </>
    )
}

function ChatMessage(props) {
    
    const {name, timestamp, message } = props.message
    const [user] = useAuthState(auth);

    const messageClass = (name === user.email ? 'sent' : 'received')
    
    return (
        <>
            <div className={`message ${messageClass}`}>
                <Avatar>{name.toUpperCase().charAt(0)}</Avatar>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Chat;