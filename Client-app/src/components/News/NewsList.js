/**
 * @fileoverview This component takes care of the NewsList function.
 *
 */
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import "./News.css";

const NewsList = ({ news = [] }) => {
  return (
    <div className="news-list">
      {news.map((newsItem) => (
        <div className="News__Main__Content" key={newsItem?.id}>
          <Link to={`/news/${newsItem.id}`}>
            <h2 className="News__Details__Title">{newsItem?.title}</h2>
            <h3>by {newsItem?.author}</h3>
            <h3>{newsItem?.timestamp?.toDate()?.toLocaleString()}</h3>
            <br />
            <Divider color="#949be2" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
