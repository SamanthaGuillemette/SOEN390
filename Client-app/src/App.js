/**
 * @fileoverview This is the entry point of the application righ after the main 'index.js' file.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/firebase";
import Loading from "./components/Loading";
import Notifications from "./components/Notifications";
import QR from "./components/QR";
import ClientProfile from "./components/ClientProfile";
import SymptomsTable from "./components/SymptomsTable";
import Diary from "./components/Diary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./store/userInfoSlice";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./store/authSlice";
import DoctorInfo from "./components/DoctorInfo";
import Appointment from "./screens/Appointment";
import AppBody from "./components/AppBody";
import UpdateStatus from "./components/UpdateStatus";

function App() {
  // const [user, loading] = useAuthState(auth);

  const user = useSelector((state) => state.auth.userToken);
  const userEmail = useSelector((state) => state.auth.userEmail);
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
      return (
        <div>
          <Loading />
        </div>
      );
    }, 500);
  }

  return (
    <BrowserRouter>
      {user && (
        <AppBody>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Dashboard />} />
              <Route path="/qr" element={<QR />} />
              <Route path="/clientprofile" element={<ClientProfile />} />
              <Route path="/symptoms" element={<SymptomsTable />} />
              <Route path="/updates" element={<Notifications />} />
              <Route path="clientinbox" element={<Chat />} />
              <Route path="/mydoctor" element={<DoctorInfo />} />
              <Route path="/status" element={<UpdateStatus />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/diary" element={<Diary />} />
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
