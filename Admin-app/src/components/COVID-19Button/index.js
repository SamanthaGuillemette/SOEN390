import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './COVID-19Button.css'

function COVID19Button() {
    return(
        <div data-testid="covid-1" className="news-button-div">
            <Link to="news">
                <Button variant= "contained" className="news-btn"><p className="content">COVID-19 News</p></Button>
            </Link>
        </div>
    );
}

export default COVID19Button;