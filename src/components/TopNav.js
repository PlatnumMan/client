import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const TopNav = () => {
  const active = window.location.pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({ type: "LOGOUT_USER", payload: null });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className='navbar navbar-expand-sm navbar-light bg-light'>
      <Link className={`nav-link ${active === "/" && "active"}`} to={`/`}>
        Home
      </Link>

      {auth !== null && (
        <Link
          className={`nav-link ${active === "/dashboard" && "active"}`}
          to={`/dashboard`}
        >
          Dashboard
        </Link>
      )}

      {auth !== null && (
        <a className='nav-link pointer' onClick={logout}>
          Logout
        </a>
      )}

      {auth === null && (
        <>
          {" "}
          <Link
            className={`nav-link ${active === "/login" && "active"}`}
            to={`/login`}
          >
            Login
          </Link>
          <Link
            className={`nav-link ${active === "/register" && "active"}`}
            to={`/register`}
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
