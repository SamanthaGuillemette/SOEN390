import * as React from 'react';
import Button from '@mui/material/Button';
import './Event.css';

function EventButton() {
    return(
        <div className="eventButton">
        <Button variant= "contained"><p className="content">Upcoming Events</p></Button>
        </div>
    );


}

export default EventButton;