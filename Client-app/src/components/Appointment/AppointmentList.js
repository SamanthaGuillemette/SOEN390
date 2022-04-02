import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AppointmentList = ({ appointments }) => {
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
          {item.startDate}
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
