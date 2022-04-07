import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const AppointmentList = ({ appointments }) => {
  let navigate = useNavigate();

  /**
   * Handle single appointment click (navigates to detail page)
   * @param  {Ojbect} item
   */
  const handleAppointmentClick = (item) => {
    navigate(`/appointment/${item.id}`);
  };

  // Render a list of appointments from 'AppointmentHistory'
  const renderListItem = () => {
    return appointments.map((item) => (
      <div key={item.id} className="appointment-listItem">
        <CheckCircleIcon color={item.confirmation ? "success" : "warning"} />

        <h3
          className={
            item.finish
              ? "appointment-listItem_finished"
              : "appointment-listItem_active"
          }
          onClick={() => handleAppointmentClick(item)}
        >
          {item.title}
        </h3>

        <p
          className={
            item.finish
              ? "appointment-listItem_finished"
              : "appointment-listItem_active"
          }
        >
          {new Date(item.startDate).toDateString()}
        </p>
      </div>
    ));
  };

  return (
    <>
      <h2 className="appointment-appointmentHistory">Appointment History</h2>
      <ul>{renderListItem()}</ul>
    </>
  );
};

export default AppointmentList;
