/**
 * @fileoverview This component takes care of the NewsList function.
 *
 */
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import "./News.css";

const NewsList = ({ news = [] }) => {
  console.log(news);
  var todayDate = new Date();
  var date =
    todayDate.getMonth() +
    1 +
    "/" +
    todayDate.getDate() +
    "/" +
    todayDate.getFullYear();

  return (
    <div className="news-list">
      {news.map((newsItem) => (
        <div className="News__Main__Content" key={newsItem.id}>
          <Link to={`/news/${newsItem.id}`}>
            <h2 className="News__Details__Title">{newsItem.title}</h2>
            <p className="News__Details__Body">{date}</p>
            <p className="News__Details__Body"> {newsItem.body}</p>
            <br />
            <Divider color="#949be2" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
