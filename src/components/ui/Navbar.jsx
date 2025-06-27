import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../styles/App.css";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link" to="/">PoppinsEduca</NavLink>
        {/* ESTE TITULO PUEDE DEVOLVER AL USUARIO A LA PAGINA WEB */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Enlaces comunes */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            {/* Enlaces para usuarios no logueados */}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Ingresar
                  </NavLink>
                </li>
              </>
            )}

            {/* Enlaces para admin */}
            {user && user.admin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/crear">
                    Crear usuario
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/lista">
                    Lista
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/token">
                    Token
                  </NavLink>
                </li>
              </>
            )}

            {/* Enlaces para usuarios logueados */}
            {user && !user.admin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/token">
                    Token
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        <div
          className="d-flex ms-auto align-items-center gap-2 mt-2 mt-lg-0"
        >
          <span className="nav-item nav-link text-primary">
            {user?.email}
          </span>
          {user ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-outline-success" onClick={handleLogIn}>
              Login
            </button>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}
