import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import CreateJob from "./pages/CreateJob";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerfiyOtp from "./pages/VerfiyOtp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout children={<Signup />} />} />
        <Route
          path="/verify/otp"
          element={<HomeLayout children={<VerfiyOtp />} />}
        />
        <Route path="/login" element={<HomeLayout children={<Login />} />} />
        <Route
          path="/dashboard"
          element={<HomeLayout children={<Dashboard />} />}
        />
        <Route
          path="/dashboard/create"
          element={<HomeLayout children={<CreateJob />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
