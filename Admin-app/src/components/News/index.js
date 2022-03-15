/**
 * @fileoverview This component takes care of the News function.
 *
 */
import NewsList from "./NewsList";
import useFetchData from "../../useFetchData";

const News = () => {
  const { data: news } = useFetchData('https://jsonplaceholder.typicode.com/posts')

  return (
      <div>
        <h1>News page</h1>
        <br />
        <br />
        {news && <NewsList news={news} />}
      </div>
    );
  }
  
  export default News;