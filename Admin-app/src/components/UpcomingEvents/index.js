import * as React from 'react';
import Box from '@mui/material/Box';
import EventButton from "../../components/EventButton";
import COVID19Button from "../../components/COVID-19Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./UpcomingEvents.css";

function UpcomingEvents() {
    return (
        <Box className="outline">
            <Box className="outer-layer">
            <Box className="event">
                <div className="eventMonth">Feb</div>    
                <div className="eventDate" >04</div>
                </Box>
                <div className="eventTitle" >Blood Donations</div>
                <div className="eventTime">6:00 PM</div>
                <div className="viewMore">View more
                <ArrowForwardIcon className="arrow"></ArrowForwardIcon>
                </div>
            </Box>
            <Box className="outer-layer-2">
                <Box className="event">
                <div className="eventMonth">Feb</div>    
                <div className="eventDate" >08</div>
                </Box>
                <div className="eventTitle" >Vaccine Available for People 12+</div>
                <div className="eventTime">12:00 PM</div>
                <div className="viewMore">View more
                <ArrowForwardIcon className="arrow"></ArrowForwardIcon>
                </div>
            </Box>
            <EventButton></EventButton>
            <COVID19Button></COVID19Button>
        </Box>
    );
}

export default UpcomingEvents;