import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.token;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoute;
