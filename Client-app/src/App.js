import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { saveUser } from "./store/authSlice";
// import { useEffect } from "react";
// import { auth } from "./backend/firebase";
import Dashboard from "./components/Dashboard";
import ClientProfile from "./components/ClientProfile";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";

function App() {
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

  return (
    <BrowserRouter>
      {/* {user && ( */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
      </Routes>

      {/* )}
      {!user && (
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      )} */}
    </BrowserRouter>
  );
}

export default App;
