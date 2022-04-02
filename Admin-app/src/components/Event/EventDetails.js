/**
 * @fileoverview This component takes care of the EventDetails function.
 *
 */
import { useParams } from "react-router-dom";
import useFetchData from "../../useFetchData";
import "./Event.css";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts/" + id
  );

  return (
    <div className="Event__Main__Content">
      {event && (
        <article>
          <h1>{event.title}</h1>
          <div>{event.body}</div>
        </article>
      )}
    </div>
  );
};

export default EventDetails;
