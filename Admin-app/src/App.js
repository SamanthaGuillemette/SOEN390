import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import PatientProfile from "./components/PatientProfile";
import AppBody from "./components/AppBody";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/firebase";
import Notifications from "./components/Notifications";
import QR from "./components/QR";
import News from "./components/News";
import NewsDetails from "./components/News/NewsDetails";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./store/authSlice";
import { useEffect } from "react";

function App() {
  // const [user] = useAuthState(auth);
  const user = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userObj) => {
      if (userObj) {
        dispatch(saveUser(userObj.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [dispatch]);

  const renderIfLoggedIn = () => {
    if (user) {
      return (
        <AppBody>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patientprofile" element={<PatientProfile />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/testing" element={<Notifications />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />{" "}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AppBody>
      );
    } else {
      return (
        <Routes>
          <Route path="*" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      );
    }
  };

  return (
    <BrowserRouter>
      {/* {user && (
        <AppBody>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patientprofile" element={<PatientProfile />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/testing" element={<Notifications />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />{" "}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppBody>
      )} */}

      {/* {!user && (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      )} */}

      {renderIfLoggedIn()}
    </BrowserRouter>
  );
}

export default App;
