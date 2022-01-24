import * as React from 'react';
import Box from '@mui/material/Box';
import './PatientPage.css'

function PatientList() {
    return(
        <div className="PatientBox">
        <Box>
        <p className="name">Patient Name</p>
        <p className="status">Status</p>
        <p className="upcomingapt">Upcoming Appointment</p>
        </Box>
        </div>
    );
}

export default PatientList;