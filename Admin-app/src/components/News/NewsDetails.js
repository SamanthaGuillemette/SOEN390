/**
 * @fileoverview This component takes care of the NewsDetails function.
 *
 */
import { useParams } from "react-router-dom";
import { useFetchNewsDataItem } from "../../backend/firebaseNewsUtilities";
import "./News.css";

const NewsDetails = () => {
  const { id } = useParams();
  const { data: news } = useFetchNewsDataItem(id);

  return (
    <div className="News__Main__Content">
      {news && (
        <article>
          <h1>{news?.title}</h1>
          <h2>by {news?.author}</h2>
          <h2>{news?.timestamp?.toDate()?.toLocaleString()}</h2>
          <div>{news?.body}</div>
        </article>
      )}
    </div>
  );
};

export default NewsDetails;
