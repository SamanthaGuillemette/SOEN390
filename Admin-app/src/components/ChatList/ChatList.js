/**
 * @fileoverview This file contains the component for the chatlist
 */

import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../../backend/firebase";
import { useEffect, useState } from "react";
import './ChatList.css'

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

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
        children: name.toUpperCase().charAt(0),
    };
}

// This function is responsible for showing the list of patients that belong to the doctor that is signed in. 
// It communicates with its parent component to display the messages. 
export default function ChatList(props) {

    const [user] = useAuthState(auth);
    const [clients, setClients] = useState('');
    const adminRef = doc(db, `Admin/${user?.email}`)

    // This hook shows all the clients that belong to the doctor as a list. 
    useEffect(() => {
        onSnapshot(adminRef, (doc) => {
            setClients(doc.data().treats?.map(patient => ({
                name: patient
            })))
        })
        // eslint-disable-next-line
    }, [])

    // This is the function that communicates and sends its parent component which patient has been chosen. 
    const handleClick = (reference) => {
        props.func(reference)
    }

    return (
        <List sx={{ bgcolor: 'white', height: '100%' }}>
            {clients && clients.map((client, index) => <div onClick={() => { handleClick(client) }}><PatientsList key={index} name={client} /></div>)}
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
            setLastMessage(doc.docs.map(doc => ({
                message: doc.data()?.message,
            })))
        })
        // eslint-disable-next-line
    }, [])
    if (!lastMessage[0]) {
        return (
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar {...stringAvatar(name)} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Fragment>
                                <Typography style={{ maxWidth: '100px', }} color="var(--text-primary)"> {name} </Typography>
                            </Fragment>}
                        secondary={
                            <Fragment>
                            </Fragment>
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
                    <Avatar {...stringAvatar(name)} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Fragment>
                            <Typography color="var(--text-primary)">
                                {name}
                            </Typography>
                        </Fragment>}
                    secondary={
                        <Fragment>
                            <Typography style={{ maxWidth: '100px', }} color="var(--text-inactive)"> {lastMessage && lastMessage[0].message.slice(0, 9).concat("...")} </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )

}