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
        <div className="UPCOMING-EVENTS__div"> {/* Making event box */}
            <div className="UPCOMING-EVENTS-1__background">
            <div className="UPCOMING-EVENTS__date">
                <div className="UPCOMING-EVENTS__month">Feb</div>    
                <div className="UPCOMING-EVENTS__day" >04</div>
                </div>
                <div data-testid = "up-events" className="UPCOMING-EVENTS__title" >Blood Donations</div>
                <div className="UPCOMING-EVENTS__time">6:00 PM</div>
                <div>
                <Button className="UPCOMING-EVENTS__viewMore" onClick={handleOpen}>View more {/* on click displaying modal */}
                <ArrowForwardIcon className="UPCOMING-EVENTS__arrow"></ArrowForwardIcon></Button>
                <Modal // Adding Modal
                    open={open}
                    onClose={handleClose} // Closing modal
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography className="UPCOMING-EVENTS__modal__header" color="var(--text-primary)" id="modal-modal-title" variant="h6" component="h2">
                        Blood Donations {/* Displaying text on modal */}
                    </Typography>
                    <Typography className="UPCOMING-EVENTS__modal__desc" color="var(--text-inactive)" id="modal-modal-description" sx={{ mt: 2 }}>
                        On Feb 04 exclusively, you can being donating blood at your nearest hospital. {/* Displaying text on modal */}
                    </Typography>
                    </Box>
                </Modal>
                </div>
            </div>
            <div className="UPCOMING-EVENTS-2__background"> {/* Making event box */}
                <div className="UPCOMING-EVENTS__date">
                <div className="UPCOMING-EVENTS__month">Feb</div>    
                <div className="UPCOMING-EVENTS__day" >08</div>
                </div>
                <div className="UPCOMING-EVENTS__title" >Vaccine Available for People 12+</div>
                <div className="UPCOMING-EVENTS__time">12:00 PM</div>
                <div>
                <Button className="UPCOMING-EVENTS__viewMore" onClick={handleOpen}>View more {/* on click displaying modal */}
                <ArrowForwardIcon className="UPCOMING-EVENTS__arrow"></ArrowForwardIcon></Button>
                <Modal
                    open={open}
                    onClose={handleClose} // Closing modal
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography className="UPCOMING-EVENTS__modal__header" id="modal-modal-title" variant="h6" component="h2">
                        Vaccine Available for People 12+ {/* Displaying text on modal */}
                    </Typography>
                    <Typography className="UPCOMING-EVENTS__modal__desc" id="modal-modal-description" sx={{ mt: 2 }}>
                        NOTE: Pfizer is recommended for ages under 40. Moderna carries serious risks. {/* Displaying text on modal */}
                    </Typography>
                    </Box>
                </Modal>
                </div>
            </div>
            <EventButton/>
            <COVID19Button/>
        </div>
    );
}

export default UpcomingEvents;