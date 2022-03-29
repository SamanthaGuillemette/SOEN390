/**
 * @fileoverview This component takes care of the UpcomingEvents function.
 *
 */
import { useState } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./UpcomingEvents.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "var(--secondary-main)",
  borderRadius: "10px",
  color: "var(--text-primary)",
  boxShadow: 24,
  p: 4,
};

const UpcomingEvents = ({eventTitle, eventMonth, eventDay, eventTime, eventDesc}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="UPCOMING-EVENTS__div">
      {" "}
      {/* Making event box */}
      <div className="UPCOMING-EVENTS-1__background">
        <div className="UPCOMING-EVENTS__date">
          <div className="UPCOMING-EVENTS__month">{eventMonth}</div>
          <div className="UPCOMING-EVENTS__day">{eventDay}</div>
        </div>
        <div data-testid="up-events" className="UPCOMING-EVENTS__title">{eventTitle}</div>
        <div className="UPCOMING-EVENTS__time">{eventTime}</div>
        <div>
          <Button className="UPCOMING-EVENTS__viewMore" onClick={handleOpen}>
            View more {/* on click displaying modal */}
            <ArrowForwardIcon className="UPCOMING-EVENTS__arrow"></ArrowForwardIcon>
          </Button>
          <Modal // Adding Modal
            open={open}
            onClose={handleClose} // Closing modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography
                className="UPCOMING-EVENTS__modal__header"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {eventTitle} {/* Displaying text on modal */}
              </Typography>
              <Typography
                className="UPCOMING-EVENTS__modal__desc"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {eventDesc} {/* Displaying text on modal */}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;
