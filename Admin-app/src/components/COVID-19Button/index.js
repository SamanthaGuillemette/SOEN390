import * as React from 'react';
import Button from '@mui/material/Button';
import './CovidButton.css'
import { Link } from "react-router-dom";

function COVID19Button() {
    return(
        <div data-test-id="covid-1" className="button">
            <Link to="news">
                <Button variant= "contained"><p className="content">COVID-19 News</p></Button>
            </Link>
        </div>
    );
}

export default COVID19Button;