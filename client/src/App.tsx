import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import HomeLayout from "./layouts/HomeLayout";
import CreateJob from "./pages/CreateJob";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import Signup from "./pages/Signup";
import VerfiyOtp from "./pages/VerfiyOtp";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
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
          <Route
            path="/settings"
            element={<HomeLayout children={<Settings />} />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
