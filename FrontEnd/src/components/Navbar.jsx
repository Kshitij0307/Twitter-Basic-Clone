import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Twitter
          </a>
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
              <li className="nav-item">
                <Link to={'/'} className="nav-link active" aria-current="page" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link" href="#">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link" href="#">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/logout'} className="nav-link" aria-disabled="true">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
