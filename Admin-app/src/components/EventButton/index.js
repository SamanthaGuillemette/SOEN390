import * as React from 'react';
import Button from '@mui/material/Button';
import './Event.css';
import { Link } from "react-router-dom";

function EventButton() {
    return(
        <div className="eventButton">
        <Link to="event">        
            <Button variant= "contained"><p className="content">Upcoming Events</p></Button>
        </Link>
        </div>
    );
}

export default EventButton;