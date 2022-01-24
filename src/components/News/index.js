import NewsList from "./NewsList";
import { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => {return res.json()})
    .then(data => {
      setNews(data);
    })
  }, [])

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