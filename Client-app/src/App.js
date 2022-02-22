import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { saveUser } from "./store/authSlice";
// import { useEffect } from "react";
// import { auth } from "./backend/firebase";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import QR from "./components/QR";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./backend/firebase";
import Loading from "./components/Loading";
import ClientProfile from "./components/ClientProfile";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import Symptoms from "./screens/Symptoms";

function App() {
  const [user, loading] = useAuthState(auth);

  // const user = useSelector((state) => state.auth.userToken);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userObj) => {
  //     if (userObj) {
  //       dispatch(saveUser(userObj.refreshToken));
  //     } else {
  //       dispatch(saveUser(undefined));
  //     }
  //   });
  // }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    // <BrowserRouter>
    //   {/* {user && ( */}

    //   <Routes>
    //     <Route path="/" element={<Dashboard />} />
    //     <Route path="*" element={<Dashboard />} />
    //   </Routes>

    //   {/* )}
    //   {!user && (
    //   <Routes>
    //     <Route path="*" element={<SignIn />} />
    //     <Route path="/signin" element={<SignIn />} />
    //     <Route path="/signup" element={<SignUp />} />
    //   </Routes>
    //   )} */}
    // </BrowserRouter>

    <BrowserRouter>
      {user && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/clientprofile" element={<ClientProfile />} />
            <Route path="/symptoms" element={<Symptoms />} />
          </Routes>
          <BottomNav />
        </>
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
