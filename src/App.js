import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AppBody from "./components/AppBody";
import Notification from "./components/Notification";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import News from "./components/News";

function App() {
  return (
    <BrowserRouter>
      <AppBody>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </AppBody>
    </BrowserRouter>
  );
}

export default App;
