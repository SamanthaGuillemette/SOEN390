import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './../COVID-19Button/COVID-19Button.css';
import './EventButton.css';

// Function for the use of our Upcoming events button on the dashboard
function EventButton() {
    return(
        <div className="event-button-div">
        <Link to="event">        
            <Button variant= "contained" className="event-btn"><p className="content">Upcoming Events</p></Button>
        </Link>
        </div>
    );
}

export default EventButton;