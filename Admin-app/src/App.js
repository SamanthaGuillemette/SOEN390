import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import PatientProfile from "./components/PatientProfile";
import AppBody from "./components/AppBody";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients";
import Inbox from "./screens/Inbox";
import { auth } from "./backend/firebase";
import Notifications from "./components/Notifications";
import QR from "./components/QR";
import News from "./components/News";
import NewsDetails from "./components/News/NewsDetails";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser, selectUserEmail, selectUserToken } from "./store/authSlice";
import { useEffect } from "react";
import Event from "./components/Event";
import EventDetails from "./components/Event/EventDetails";
import { fetchUserInfo } from "./store/userInfoSlice";

function App() {
  const user = useSelector(selectUserToken);
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  /**
   * This function will run as soon as the App loads
   * @returns {void}
   */
  useEffect(() => {
    // Save user token & user email to redux store (for logged in user)
    onAuthStateChanged(auth, (userObj) => {
      if (userObj) {
        dispatch(saveUser(userObj.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });

    // Fetch user info from database to store using his/her email
    dispatch(fetchUserInfo(userEmail));
  }, [dispatch, userEmail]);

  // Added setTimeout() to show loading screen for 500ms, ottherise it'll keep loading
  if (userEmail == null) {
    setTimeout(() => {
      return <h3>Loading</h3>;
    }, 500);
  }

  return (
    <BrowserRouter>
      {user && (
        <AppBody>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patientprofile/:key" element={<PatientProfile />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/testing" element={<Notifications />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetails />} />{" "}
            <Route path="/event" element={<Event />} />
            <Route path="/event/:id" element={<EventDetails />} />{" "}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AppBody>
      )}
      {!user && (
        <Routes>
          <Route path="*" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
