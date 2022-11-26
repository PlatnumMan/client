import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({ type: "LOGOUT_USER", payload: null });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className='nav bg-light d-flex justify-content-between'>
      <Link className='nav-link' to={`/`}>
        Home
      </Link>
      {auth !== null && (
        <f className='nav-link pointer' onClick={logout}>
          Logout
        </f>
      )}

      {auth === null && (
        <>
          {" "}
          <Link className='nav-link' to={`/login`}>
            Login
          </Link>
          <Link className='nav-link' to={`/register`}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
