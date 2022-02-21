import * as React from 'react';
import Box from '@mui/material/Box';
import EventButton from "../../components/EventButton";
import COVID19Button from "../../components/COVID-19Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./UpcomingEvents.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'var(--secondary-main)',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };
  

function UpcomingEvents() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="outline">
            <div className="outer-layer">
            <div className="event">
                <div className="eventMonth">Feb</div>    
                <div className="eventDate" >04</div>
                </div>
                <div className="eventTitle" >Blood Donations</div>
                <div className="eventTime">6:00 PM</div>
                <div>
                <Button className="viewMore" onClick={handleOpen}>View more
                <ArrowForwardIcon className="events-arrow"></ArrowForwardIcon></Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography color="var(--text-primary)" id="modal-modal-title" variant="h6" component="h2">
                        Blood Donations
                    </Typography>
                    <Typography color="var(--text-inactive)" id="modal-modal-description" sx={{ mt: 2 }}>
                        On Feb 04 exclusively, you can being donating blood at your nearest hospital.
                    </Typography>
                    </Box>
                </Modal>
                </div>
            </div>
            <div className="outer-layer-2">
                <div className="event">
                <div className="eventMonth">Feb</div>    
                <div className="eventDate" >08</div>
                </div>
                <div className="eventTitle" >Vaccine Available for People 12+</div>
                <div className="eventTime">12:00 PM</div>
                <div>
                <Button className="viewMore" onClick={handleOpen}>View more
                <ArrowForwardIcon className="events-arrow"></ArrowForwardIcon></Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography className="events-modal-h" id="modal-modal-title" variant="h6" component="h2">
                        Vaccine Available for People 12+
                    </Typography>
                    <Typography className="events-modal-sec" id="modal-modal-description" sx={{ mt: 2 }}>
                        NOTE: Pfizer is recommended for ages under 40. Moderna carries serious risks.
                    </Typography>
                    </Box>
                </Modal>
                </div>
            </div>
            <EventButton></EventButton>
            <COVID19Button></COVID19Button>
        </div>
    );
}

export default UpcomingEvents;