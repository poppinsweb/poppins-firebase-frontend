import { Routes, Route } from "react-router-dom";
import UserList from "../pages/admin/UserList";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PageChildData from "../pages/userPages/PageChildData";
import IndependencePage from "../pages/cards/IndependencePage";
import EvaluationResultPage from "../pages/cards/EvaluationResultPage";
import { UserToken } from "../pages/userPages/UserToken";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/lista" element={<UserList />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/personales" element={<PageChildData />} />
      <Route path="/encuesta" element={<IndependencePage />} />
      <Route path="/resultados" element={<EvaluationResultPage />} />
      <Route path="/token" element={<UserToken />} />
    </Routes>
  );
};

export default AdminRoutes;
