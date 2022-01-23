import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import AppBody from "./components/AppBody";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
import Notifications from "./components/Notifications";

function App() {
  return (
    <BrowserRouter>
      <AppBody>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/testing" element={<Notifications />} />
        </Routes>
      </AppBody>
    </BrowserRouter>
  );
}

export default App;
