import { Link } from "react-router-dom";

const EventList = ({events}) => {
    console.log(events);
    var todayDate = new Date();
    var date = (todayDate.getMonth()+1)+'/'+todayDate.getDate()+'/'+todayDate.getFullYear();

    return (
        <div className="event-list">
            {events.map(eventItem => (
                <div className="event-item" key={eventItem.id}>
                    <Link to={`/event/${eventItem.id}`}>
                        <h2>{ eventItem.title}</h2>
                        <p> 
                            { 
                            date 
                            }
                        </p> 
                        <p> { eventItem.body}</p>
                        <br />
                    </Link>
                </div>
            ))}
        </div>
      );
}
 
export default EventList;