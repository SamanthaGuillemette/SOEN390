import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection, query,onSnapshot, orderBy, limit, setDoc} from "firebase/firestore";
import { db, auth } from "../../backend/firebase";
import { useEffect, useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import { red } from '@mui/material/colors';
import {
    togglePriorityFlag
} from "../../backend/firebasePatientUtilities";
import './ChatList.css'

// priority flag with DB
// function onFlagClick(id) {
//     togglePriorityFlag(id).then(
//       (newPatientInfo) =>
//         newPatientInfo &&
//         setPriorityFlag(newPatientInfo.flaggedPriority === "1")
//     );
//   }

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
    const messageRef = collection(adminRef, "Clients")
    const q = query(messageRef)
    const [priorityFlag, setPriorityFlag] = useState(false);

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
        <List sx={{ bgcolor: 'white', height: '100%' }}>
                {clients && clients.map((client, index) => <div onClick={() => {handleClick(client)}}><PatientsList key={index} name={client} /></div>)}
        </List>
    );
}

// This function is responsible for getting the latest messages and also displaying all the patients. 
function PatientsList(props) {
    const { name } = props.name;
    
    const clientRef = doc(db, "Client", name)
    const messageRef = collection(clientRef, "Messages")
    // const countCol = collection(clientRef, "Counter")
    // const countRef = doc(countCol, "counter")
    const q = query(messageRef, orderBy('timestamp', 'desc'), limit(1));
    const [lastMessage, setLastMessage] = useState('');
    const [flag, setFlag] = useState(false);
    // const [messageCount, setMessageCount] = useState(0);

    // This hook is used to show the lastest message sent on the database. 
    useEffect(() => {

        onSnapshot(q, (doc) => {
            setLastMessage(doc.docs.map(doc=> ({
                message: doc.data()?.message,
            })))
        })

        onSnapshot(clientRef, (doc) => {
            setFlag(doc.data()?.flag)
        })

        // onSnapshot(countRef, (doc) => {
        //     setMessageCount(doc.data()?.counterDoc)
        // })
    // eslint-disable-next-line
    }, [])

    const handleClick = async (event) => {
        // event.preventDefault();
        // if(flag){
        //     await updateDoc(clientRef, {
        //         flag: false,
        //     })
        // }else{
        //     await updateDoc(clientRef, {
        //         flag: true,
        //     })
        // }
    }

    if(!lastMessage[0]){
        return(
            <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar {...stringAvatar(name)} />
                </ListItemAvatar>
                <ListItemText
                    primary= {
                        <React.Fragment>
                            <Typography style={{ maxWidth: '100px',}} color="var(--text-primary)"> {name} </Typography>
                            {<FlagIcon label="primary" color="primary" variant="outlined"
                            // onClick={() => {
                            //     onFlagClick(id);
                            //   }}
                            //   className={
                            //     priorityFlag ? "priority-flag clicked" : "priority-flag"
                            //   } 
                            />}
                        </React.Fragment>}
                    secondary={
                        <React.Fragment>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
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
                    primary= {
                        <React.Fragment>
                            <Typography color="var(--text-primary)"> 
                                {name} 
                                <FlagIcon style={{ marginLeft: '10px',}} label="error" color="error" variant="outlined" 
                                    onClick={() => {handleClick()}} className={flag ? "priority-flag clicked" : "priority-flag"} />
                                {/* <Avatar sx={{ width: 24, height: 24, bgcolor: red[500]}} >{messageCount}</Avatar> */}
                            </Typography>
                        </React.Fragment>}
                    secondary={
                        <React.Fragment>
                            <Typography style={{ maxWidth: '100px',}} color="var(--text-inactive)"> {lastMessage && lastMessage[0].message} </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    )

}