/**
 * @fileoverview This is the entry point of the application righ after the main 'index.js' file.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { auth } from "./backend/firebase";
import Loading from "./components/Loading";
import Notifications from "./components/Notifications";
import QR from "./components/QR";
import ClientProfile from "./components/ClientProfile";
import SymptomsTable from "./components/SymptomsTable";
import Diary from "./components/Diary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorInfo,
  fetchUserInfo,
  // selectDoctorInfoDetails,
  selectUserInfoDetails,
} from "./store/userInfoSlice";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser, selectUserEmail, selectUserToken } from "./store/authSlice";
import DoctorInfo from "./components/DoctorInfo";
import Appointment from "./components/Appointment";
import AppBody from "./components/AppBody";
import UpdateStatus from "./components/UpdateStatus";
import AppointmentDetails from "./components/Appointment/AppointmentDetails";

function App() {
  const user = useSelector(selectUserToken);
  const userEmail = useSelector(selectUserEmail);
  const userInfoDetails = useSelector(selectUserInfoDetails);
  const assignedDoctor = userInfoDetails?.assignedDoctor;

  // DEBUG: Test if user has 'assignedDoctor' property
  // console.log("===> Assigned doctor email: ", assignedDoctor);
  // console.log("===> Doctor info: ", useSelector(selectDoctorInfoDetails));

  // Create reference to the 'dispatch' function --> to send away an action to the 'Store'
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

    // If user has 'assignedDoctor', fetch the Doctor's info
    if (assignedDoctor) {
      dispatch(fetchDoctorInfo(assignedDoctor));
    }

    // The array below means whenever any of those values changes, this useEffect() will re-run
  }, [dispatch, userEmail, assignedDoctor]);

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
            <Route
              path="/appointment/:appointmentId"
              element={<AppointmentDetails />}
            />
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
