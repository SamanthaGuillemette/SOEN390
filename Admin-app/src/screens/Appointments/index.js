import Card from "@mui/material/Card";
import Calendar from "../../components/Calendar";

const Appointments = () => {
  return (
    <Card className="ui container statItem" sx={{bgcolor: "#1e1e1e"}}>
      <h1>Appointments</h1>
      <Calendar />
    </Card>
  );
};

export default Appointments;
