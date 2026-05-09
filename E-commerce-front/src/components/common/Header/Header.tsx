import { NavLink } from "react-router-dom";
import "./Header.css";
import HeaderBasket from "@/components/Ecommerce/HaaderBasket/HeaderBasket";
import HeaderWishlist from "@/components/Ecommerce/HeaderWishlist/HeaderWishlist";
import eCommerceLogo from "@/assets/eCommerce-logo.jpg";
import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import { logout } from "@/store/Auth/AuthSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.Auth);

  return (
    <header className="Header">
      <div className="container">
        <div className="headerContainer">
          <div className="headerBrand">
            <h1 className="headerLogo">
              <img src={eCommerceLogo} alt="E-Commerce Logo" />
            </h1>
          </div>

          <nav className="navbar navbar-expand-lg headerNavbar">
            <button
              className="navbar-toggler headerToggle"
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
              <ul className="navbar-nav headerNavMain">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link headerNavLink">
                    <span>Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="categories" className="nav-link headerNavLink">
                    <span>Categories</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="about-us" className="nav-link headerNavLink">
                    <span>About</span>
                  </NavLink>
                </li>
              </ul>
              <div className="headerActions">
                <ul className="navbar-nav headerNavAuth">
                  {isAuth ? (
                    <>
                      <li className="nav-item">
                        <span className="nav-link headerNavLink">
                          Hi, {user?.firstName}
                        </span>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link headerNavLink btn btn-link"
                          onClick={() => dispatch(logout())}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink to="login" className="nav-link headerNavLink">
                          <span>Login</span>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="register" className="nav-link headerNavLink">
                          <span>Register</span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                <div className="headerIcons">
                  <HeaderWishlist />
                  <HeaderBasket />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;