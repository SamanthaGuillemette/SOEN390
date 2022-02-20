import Card from "@mui/material/Card";
import Calendar from "../../components/Calendar";

const Appointments = () => {
  return (
    <Card className="ui container statItem" sx={{bgcolor: "var(--background-secondary)", boxShadow: "none", color: "var(--text-inactive)"}}>
      <h1>Appointments</h1>
      <Calendar />
    </Card>
  );
};

export default Appointments;
