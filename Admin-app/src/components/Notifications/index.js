const Notifications = () => {
  return (
    <>
      <div
        className="ui relaxed divided list"
        style={{ backgroundColor: "var(--text-primary)" }}
      >
        <h1>Notifications component</h1>

        <div className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            <div className="header">Semantic-Org/Semantic-UI</div>
            <div className="description">Updated 10 mins ago</div>
          </div>
        </div>
        <div className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            <div className="header">Semantic-Org/Semantic-UI-Docs</div>
            <div className="description">Updated 22 mins ago</div>
          </div>
        </div>
        <div className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            <div className="header">Semantic-Org/Semantic-UI-Meteor</div>
            <div className="description">Updated 34 mins ago</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
