/**
 * @fileoverview This component takes care of the SmallStatBox function.
 *
 */
import "./SmallStatBox.css";

const SmallStatBox = ({ icon, number, description }) => {
  return (
    <div data-testid = "statbox1" className="statDetailGroup">
      {icon}
      <div className="statTextContainer">
        <h2 className="ui large header statNumber">{number}</h2>
        <div className="statDesc">{description}</div>
      </div>
    </div>
  );
};

export default SmallStatBox;
