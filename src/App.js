import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import PatientProfile from "./screens/PatientProfile";
import AppBody from "./components/AppBody";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/firebase";
import Notifications from "./components/Notifications";
import QR from "./components/QR";

function App() {
  const [user] = useAuthState(auth);
  // const user = true; // FIXME: Just to bypass login, delete later

  return (
    <div>
      {user && (
        <BrowserRouter>
          <AppBody>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patientprofile" element={<PatientProfile />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/testing" element={<Notifications />} />
              <Route path="/qr" element={<QR />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AppBody>
        </BrowserRouter>
      )}
      {!user && (
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
