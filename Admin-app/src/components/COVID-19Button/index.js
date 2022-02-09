import * as React from 'react';
import Button from '@mui/material/Button';
import './Button.css'
import { Link } from "react-router-dom";

function COVID19Button() {
    return(
        <div className="button">
            <Link to="news">
                <Button variant= "contained" className="btn"><p className="content">COVID-19 News</p></Button>
            </Link>
        </div>
    );
}

export default COVID19Button;