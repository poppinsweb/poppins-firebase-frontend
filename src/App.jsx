import { useAuth } from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import LandingPage from "./pages/home/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import { PrivacityPage } from "./pages/home/landingPages/footerPages/PrivacityPage";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      {user && user.admin ? (
        <AdminRoutes />
      ) : (
        user && <UserRoutes />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacity" element={<PrivacityPage />} />
        <Route path="/login" element={<PrivateRoute element={<LoginPage />} redirectTo="/" />} />
      </Routes>
    </>
  );
}

