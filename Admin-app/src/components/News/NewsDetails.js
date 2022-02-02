import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";

const NewsDetails = () => {
    const { id } = useParams();
    const { data: news } = useFetch('https://jsonplaceholder.typicode.com/posts/' + id);


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