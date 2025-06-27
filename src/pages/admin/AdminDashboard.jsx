import "../../styles/admin/admin.css";

export default function AdminDashboard() {
  return (
    <>
      <div className="container main-container">
        <h1 className="title-panel">Panel del Administrador Poppins</h1>
        <div className="">
        </div>
        <div className="">
          <AdminQuestionFilter />
        </div>
        <button className="btn btn-primary filter-btn btn-color">
          Filtrar
        </button>
      </div>
    </>
  );
}
