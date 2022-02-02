import EventList from "./EventList";
import useFetch from "../../useFetch";

const Event = () => {
  const { data: events } = useFetch('https://jsonplaceholder.typicode.com/posts')

  return (
      <div>
        <h1>Events page</h1>
        <br />
        <br />
        {events && <EventList events={events} />}
      </div>
    );
  }
  
  export default Event;