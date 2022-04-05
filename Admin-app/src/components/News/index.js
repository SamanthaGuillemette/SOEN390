/**
 * @fileoverview This component takes care of the News function.
 *
 */
import NewsList from "./NewsList";
import { useFetchNewsData } from "../../backend/firebaseNewsUtilities";
import "./News.css";

const News = () => {
  const { data: news } = useFetchNewsData();

  return (
    <div>
      <h1 className="News__Header">News page</h1>
      <br />
      <br />
      {news && <NewsList news={news} />}
    </div>
  );
};

export default News;
