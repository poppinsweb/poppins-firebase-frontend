import { Routes, Route } from "react-router-dom";
import PageChildData from "../pages/userPages/PageChildData";
import IndependencePage from "../pages/cards/IndependencePage";
import EvaluationResultPage from "../pages/cards/EvaluationResultPage";
import { UserToken } from "../pages/userPages/UserToken";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/personales" element={<PageChildData />} />
      <Route path="/encuesta" element={<IndependencePage />} />
      <Route path="/resultados" element={<EvaluationResultPage />} />
      <Route path="/token" element={<UserToken />} />
    </Routes>
  );
};

export default UserRoutes;
