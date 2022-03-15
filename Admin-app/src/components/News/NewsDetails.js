/**
 * @fileoverview This component takes care of the NewsDetails function.
 *
 */
import { useParams } from "react-router-dom";
import useFetchData from "../../useFetchData";

const NewsDetails = () => {
    const { id } = useParams();
    const { data: news } = useFetchData('https://jsonplaceholder.typicode.com/posts/' + id);


    return (
        <div className="NewsDetails">
            { news && (
                <article>
                    <h1>{ news.title }</h1>
                    <div>{ news.body }</div>
                </article>
            ) }
        </div>
      );
}
 
export default NewsDetails;