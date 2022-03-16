/**
 * @fileoverview This component takes care of the EventButton function.
 *
 */
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./../COVID-19Button/COVID-19Button.css";
import "./EventButton.css";

/**
 * Function for the use of our Upcoming events button on the dashboard.
 */
function EventButton() {
  return (
    <div className="EVENT-BTN__div">
      <Link to="event">
        <Button variant="contained" className="EVENT-BTN__button">
          <p className="EVENT-BTN__text">Upcoming Events</p>
        </Button>
      </Link>
    </div>
  );
}

export default EventButton;
