import * as React from 'react';
import Button from '@mui/material/Button';
import './CovidButton.css'

function COVID19Button() {
    return(
        <div className="button">
        <Button variant="text"><p className="content">COVID-19</p></Button>
        </div>
    );


}

export default COVID19Button;