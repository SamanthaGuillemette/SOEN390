/**
 * @fileoverview This component takes care of the EventList function.
 *
 */

import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import "./Event.css";

const EventList = ({ events = [] }) => {
  console.log(events);
  var todayDate = new Date();
  var date =
    todayDate.getMonth() +
    1 +
    "/" +
    todayDate.getDate() +
    "/" +
    todayDate.getFullYear();

  return (
    <div className="event-list">
      {events.map((eventItem) => (
        <div className="Event__Main__Content" key={eventItem.id}>
          <Link to={`/event/${eventItem.id}`}>
            <h1 className="Event__Details__Title">{eventItem.title}</h1>
            <p className="Event__Details__Body">{date}</p>
            <p className="Event__Details__Body"> {eventItem.body}</p>
            <br />
            <Divider color="#949be2" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventList;
