import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import AppBody from "./components/AppBody";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './backend/firebase';
import Notifications from "./components/Notifications";

function App() {
  const [
    user,
    loading,
    error,
  ] = useAuthState(auth);

  // if(!user){
  //   return(
  //     <BrowserRouter>
  //        <Routes>
  //          <Route path="/" element={<SignIn />} />
  //          <Route path="/signup" element={<SignUp />} />
  //        </Routes>
  //    </BrowserRouter>
  //   )
  // }else{
    
  // }
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
          <Route path="/testing" element={<Notifications />} />
        </Routes>
      </AppBody>
    </BrowserRouter>
 );
}

export default App;
