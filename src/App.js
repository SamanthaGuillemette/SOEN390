import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
=======
import Dashboard from "./screens/Dashboard";
>>>>>>> main
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
<<<<<<< HEAD
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
=======
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/inbox" element={<Inbox />} />
>>>>>>> main
        </Routes>
      </AppBody>
    </BrowserRouter>
  );
}

export default App;
