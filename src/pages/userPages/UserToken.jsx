import { LogoToken } from "../../components/token/LogoToken.jsx";
import { InfoToken } from "../../components/token/InfoToken.jsx";
import { TokenBox } from "../../components/token/TokenBox.jsx";
import { AdminToken } from "../../components/token/AdminToken.jsx";
import { useAuth } from "../../context/AuthProvider";

export function UserToken() {
  const { user } = useAuth();
  return (
    <>
      {user && user.admin === true ? (
        <div className="token-main-container">
          <AdminToken />
        </div>
      ) : (
        <>
          <div className="token-main-container">
            <InfoToken />
            {/* <InfoToken />
              <InfoToken /> */}
            <div className="container-info-token">
              <LogoToken />
            </div>
            <div className="row">
              <div className="col-md-10 token-card">
                <TokenBox />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
