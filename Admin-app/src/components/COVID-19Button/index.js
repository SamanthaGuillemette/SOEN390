/**
 * @fileoverview This component takes care of the COVID19Button function.
 *
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import './COVID-19Button.css'

// Function for the creation of our COVID- News Button
/**
 * This function is used for the creation of the COVID19 button that will display 
 * the news component when it is clicked. 
 *
 * @returns {JSX.Element}
 */
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