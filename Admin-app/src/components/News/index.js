import NewsList from "./NewsList";
import useFetch from "./useFetch";

const News = () => {
  const { data: news } = useFetch('https://jsonplaceholder.typicode.com/posts')

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