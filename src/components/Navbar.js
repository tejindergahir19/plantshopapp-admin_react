import { Link } from "react-router-dom";
import COLORS from "../constant/COLORS";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link style={{
            color:COLORS.primary,
            fontWeight:"bold"
        }} className="navbar-brand" href="/dashboard">
          PlantShop APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/order">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/customer">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/chat">
                Chat
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Link className="btn btn-outline-success" to="/">
            
              Logout
          
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
