import EventList from "./EventList";
import useFetchData from "../../useFetchData";



const Event = () => {
  const { data: events } = useFetchData('https://jsonplaceholder.typicode.com/posts')

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