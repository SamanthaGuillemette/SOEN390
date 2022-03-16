/**
 * @fileoverview This component takes care of the SmallStatBox function.
 *
 */
import "./SmallStatBox.css";

const SmallStatBox = ({ icon, number, description }) => {
  return (
    <div data-testid = "statbox1" className="STAT__BOX">
      {icon}
      <div className="STAT__text__container">
        <h2 className="STAT__number">{number}</h2>
        <div className="STAT__desc">{description}</div>
      </div>
    </div>
  );
};

export default SmallStatBox;
