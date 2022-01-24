const NewsList = ({news}) => {
    console.log(news);

    return (
        <div className="news-list">
            {news.map(newsItem => (
                <div className="news-item" key={newsItem.id}>
                    <h2>{ newsItem.title}</h2>
                    <p>{ Date.now().toString() } </p>
                    <p> { newsItem.body}</p>
                    <br />
                </div>
            ))}
        </div>
      );
}
 
export default NewsList;