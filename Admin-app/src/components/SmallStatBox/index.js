import "./SmallStatBox.css";

const SmallStatBox = ({ icon, number, description }) => {
  return (
    <div className="statDetailGroup">
      {icon}
      <div className="statTextContainer">
        <h2 className="ui large header statNumber">{number}</h2>
        <div className="statDesc">{description}</div>
      </div>
    </div>
  );
};

export default SmallStatBox;
