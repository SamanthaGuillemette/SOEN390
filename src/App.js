import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import AppBody from "./components/AppBody";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
import './App.css';

function App() {
  return (
     <BrowserRouter>
       <AppBody>
         <Routes>
           <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
           <Route path="/" element={<Dashboard />} />
           <Route path="/appointments" element={<Appointments />} />
           <Route path="/patients" element={<Patients />} />
           <Route path="/inbox" element={<Inbox />} />
         </Routes>
       </AppBody>
     </BrowserRouter>
  );
}

export default App;
