import { Grid, Avatar, TextField, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import { useState } from "react";
import { db, auth } from "../../backend/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
import { deepOrange, deepPurple } from '@mui/material/colors';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, serverTimestamp, addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import './Chat.css'


const Chat = () => {
    const [user] = useAuthState(auth);
    const [msgToSend, setMsgToSend] = useState('');
    const clientRef = doc(db, "Client", user.email)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp'))
    const messagesReceived = [{ name: "tushar@client.com", message: "shalom" }, { name: "tushar@admin.com", message: "hey how are you?" }, { name: "tushar@client.com", message: "I'm feeling a little sick today :(" },
    { name: "tushar@admin.com", message: "Oh no, what is the problem?" }];

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
            <Priority />
            <Card sx={{ m: "30px", width: "95", height: "75%" }}>
            <Box sx={{ padding: 6, backgroundColor: "" }}
                onSubmit={handleSubmit}
                noValidate
                component="form"
            >
                <Grid container spacing={1}>
                    <Grid container>
                        <Grid item xs={12}>
                            <main>
                                {messagesReceived && messagesReceived.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                            </main>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={2}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.email.charAt(0).toUpperCase()}</Avatar>
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
            </Card>
            <BottomNav />
        </>
    )
}

function ChatMessage(props) {

    const { name, timestamp, message } = props.message
    const [user] = useAuthState(auth);

    const messageClass = (name === user.email ? 'sent' : 'received')

    return (
        <>
            <div className={`message ${messageClass}`}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{name.toUpperCase().charAt(0)}</Avatar>
                <p>{message}</p>
            </div>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Priority(props) {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const handleCloseNew = () => setOpen(false);
    const [Case, setCase] = useState('General');
    const [color, setColor] = useState('success');

    const handleChange = (event) => {
        setCase(event.target.value);
        if (event.target.value === "Urgent") {
            setColor('warning');
        }
        if (event.target.value === "Non-Urgent") {
            setColor('secondary');
        }
        if (event.target.value === "General") {
            setColor('primary');
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <FormControl>
                            <FormLabel style={{ marginLeft: '15px' }} id="demo-row-radio-buttons-group-label">Is this urgent?</FormLabel>
                            <RadioGroup style={{ marginLeft: '15px' }} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChange}>
                                <FormControlLabel value="Urgent" control={<Radio />} label="urgent" />
                                <FormControlLabel value="Non-Urgent" control={<Radio />} label="non-urgent" />
                                <FormControlLabel value="General" control={<Radio />} label="general" />
                            </RadioGroup>
                        </FormControl>
                    </Typography>
                    <Button onClick={handleCloseNew}>New Chat</Button>
                    <Button onClick={handleClose}>Continue Chat</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default Chat;