import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import Profile from "./components/Profile";

import AppBody from "./components/AppBody";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";

function App() {
  return (
    <BrowserRouter>
      <AppBody>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />
      

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/inbox" element={<Inbox />} />

        </Routes>
      </AppBody>
    </BrowserRouter>
  );
}

export default App;
