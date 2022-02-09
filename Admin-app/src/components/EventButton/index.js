import * as React from 'react';
import Button from '@mui/material/Button';
import './../COVID-19Button/Button.css';
import { Link } from "react-router-dom";

function EventButton() {
    return(
        <div className="button">
        <Link to="event">        
            <Button variant= "contained" className="btn"><p className="content">Upcoming Events</p></Button>
        </Link>
        </div>
    );
}

export default EventButton;