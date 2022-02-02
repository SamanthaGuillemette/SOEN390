import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";

const EventDetails = () => {
    const { id } = useParams();
    const { data: event } = useFetch('https://jsonplaceholder.typicode.com/posts/' + id);


    return (
        <div className="EventDetails">
            { event && (
                <article>
                    <h1>{ event.title }</h1>
                    <div>{ event.body }</div>
                </article>
            ) }
        </div>
      );
}
 
export default EventDetails;