import * as React from 'react';
import Button from '@mui/material/Button';
import './contact.css';

function ContactButton() {
    return(
        <div className="contactButton">
        <Button><p className="content">Contact us</p></Button>
        </div>
    );


}

export default ContactButton;