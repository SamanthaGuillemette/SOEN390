import * as React from 'react';
import Box from '@mui/material/Box';
import './PatientPage.css'

function PatientList() {
    return(
        <div className="PatientBox">
        <Box>
            <div className="header">
                <div className="name">Patient Name</div>
                <div className="id">ID</div>
                <div className="header-right">Status</div>
                <div className="header-right">Upcoming Appointment</div>
                <div className="header-right">Assigned Doctor</div>
                <div className="header-right">Flagged Priority</div>
            </div>
        </Box>
            <hr></hr>
            <p className="patient">Jane Doe
                <div className="ID-data">1476</div>    
                <span class="label-positive">positive</span>
                <div className="date">23/05/22</div>
            </p>
            <p className="patient">John Smith
                <div className="ID-data">1009</div>    
                <span class="label-negative">negative</span>
                <div className="date">05/02/22</div>
            </p>
        </div>
    );
}

export default PatientList;