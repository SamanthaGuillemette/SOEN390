/**
 * @fileoverview This component takes care of the Event function.
 *
 */

import EventList from "./EventList";
import useFetchData from "../../useFetchData";
import "./Event.css";

const Event = () => {
  const { data: events } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div>
      <h1 className="Event__Header">Events page</h1>
      <br />
      <br />
      {events && <EventList events={events} />}
    </div>
  );
};

export default Event;
