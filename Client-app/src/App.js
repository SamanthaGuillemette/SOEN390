import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Chatting from "./screens/Chatting";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/firebase";
import Loading from "./components/Loading";
import Notifications from "./screens/Notifications";
import QR from "./screens/QR";
import ClientProfile from "./screens/Profile";
import Symptoms from "./screens/Symptoms";
import Diary from "./screens/Diary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./store/userInfoSlice";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./store/authSlice";
import MyDoctor from "./screens/MyDoctor";

function App() {
  // const [user, loading] = useAuthState(auth);

  const user = useSelector((state) => state.auth.userToken);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  // This function will run as soon as the App loads
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/clientprofile" element={<ClientProfile />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="clientinbox" element={<Chatting />} />
          <Route path="/mydoctor" element={<MyDoctor />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
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
