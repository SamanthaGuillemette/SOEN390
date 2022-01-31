import * as React from 'react';
import Button from '@mui/material/Button';
import './CovidButton.css'

function COVID19Button() {
    return(
        <div className="button">
        <Button variant= "contained"><p className="content">COVID-19 News</p></Button>
        </div>
    );


}

export default COVID19Button;