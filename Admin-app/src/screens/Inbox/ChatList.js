import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection, query,onSnapshot, orderBy, limit} from "firebase/firestore";
import { db, auth } from "../../backend/firebase";
import { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';

// This function is responsible for showing the list of patients that belong to the doctor that is signed in. 
// It communicates with its parent component to display the messages. 
export default function ChatList(props) {

    const [user] = useAuthState(auth);
    const [clients, setClients] = useState('');
    const adminRef = doc(db, "Admin", user.email)
    const messageRef = collection(adminRef, "Clients")
    const q = query(messageRef)

    // This hook shows all the clients that belong to the doctor as a list. 
    useEffect(() => {
        onSnapshot(q, (doc) => {
            setClients(doc.docs.map(doc => ({
                name: doc.data().name,
            })))
        })
        // eslint-disable-next-line
    }, [])

    // This is the function that communicates and sends its parent component which patient has been chosen. 
    const handleClick = (reference) => {
        props.func(reference)
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', height: '100%' }}>
                {clients && clients.map((client, index) => <div onClick={() => {handleClick(client)}}><PatientsList key={index} name={client} /></div>)}
        </List>
    );
}

// This function is responsible for getting the latest messages and also displaying all the patients. 
function PatientsList(props) {
    const { name } = props.name;
    
    const clientRef = doc(db, "Client", name)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp', 'desc'), limit(1));
    const [lastMessage, setLastMessage] = useState('');

    // This hook is used to show the lastest message sent on the database. 
    useEffect(() => {
        onSnapshot(q, (doc) => {
            setLastMessage(doc.docs.map(doc=> ({
                message: doc.data().message,
            })))
        })
    // eslint-disable-next-line
    }, [])

    if(!lastMessage[0]){
        return(
            <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={name} />
                </ListItemAvatar>
                <ListItemText
                    primary= {
                        <React.Fragment>
                            {name}
                            {<Chip label="primary" color="primary" variant="outlined" />}
                        </React.Fragment>}
                    secondary={
                        <React.Fragment>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
        )
    }
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={name} />
                </ListItemAvatar>
                <ListItemText
                    primary= {
                        <React.Fragment>
                            {name}
                            {<Chip label="primary" color="primary" variant="outlined" />}
                        </React.Fragment>}
                    secondary={
                        <React.Fragment>
                            {lastMessage && lastMessage[0].message}
                            {/* {"last comment"} */}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )

}