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

export default function Patients(props) {

    const [user] = useAuthState(auth);
    const [clients, setClients] = useState('');
    const adminRef = doc(db, "Admin", user.email)
    const messageRef = collection(adminRef, "Clients")
    const q = query(messageRef)

    useEffect(() => {
        onSnapshot(q, (doc) => {
            setClients(doc.docs.map(doc => ({
                name: doc.data().name,
            })))
        })
        // eslint-disable-next-line
    }, [])

    const handleClick = (reference) => {
        props.func(reference)
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'white', height: '100%' }}>
                {clients && clients.map(client => <div onClick={() => {handleClick(client)}}><PatientsList key={client} name={client} /></div>)}
        </List>
    );
}

function PatientsList(props) {
    const { name } = props.name;
    
    const clientRef = doc(db, "Client", name)
    const messageRef = collection(clientRef, "Messages")
    const q = query(messageRef, orderBy('timestamp', 'desc'), limit(1));
    const [lastMessage, setLastMessage] = useState(['message']);

    useEffect(() => {
        onSnapshot(q, (doc) => {
            setLastMessage(doc.docs.map(doc=> ({
                name: doc.data().name,
                message: doc.data().message,
                timestamp: doc.data().timestamp,
            })))
        })
    // eslint-disable-next-line
    }, [])
    
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