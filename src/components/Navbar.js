import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const offcanvasRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeOffcanvas = () => {
    if (offcanvasRef.current) {
      offcanvasRef.current.classList.remove('show');
      document.body.classList.remove('offcanvas-open');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target) && !event.target.closest('[data-bs-toggle="offcanvas"]')) {
        closeOffcanvas();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header-wrapper">
      <div className="header-content bg-dark">
        <div className="container">
          <div className="row align-items-center gx-4">
            <div className="col-auto">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="mobile-toggle-menu d-inline d-xl-none d-lg-none"
                  onClick={() => {
                    if (offcanvasRef.current) {
                      offcanvasRef.current.classList.toggle('show');
                      document.body.classList.toggle('offcanvas-open');
                    }
                  }}
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGRJREFUSEvtk1kOABAQQ/Vgbu9e49sSo5lUQvguXV4giQ/E76dv4C58fiIzMzfWQgCgCT00kBtE0s/unmcgb8Ay6KH2AcOQaQP5RPcbOJAzgMK0ZCHHDZh0O9oHf/JObUZz/0QVtgcaGa1XxmsAAAAASUVORK5CYII="
                    alt="Menu"
                  />
                </div>
                <div className="logo">
                  <Link to="/">
                    <img
                      src="assets/images/logo-icon.png"
                      className="logo-icon"
                      alt="Logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl order-4 order-xl-0">
              <div className="d-flex align-items-center justify-content-end gap-3 d-none d-sm-block">
                <ul className="flex-container ulmenu">
                  <li><Link to="/" onClick={closeOffcanvas}>Home</Link></li>
                  <li><Link to="/all-ads" onClick={closeOffcanvas}>Rooms</Link></li>
                  <li><Link to={userName ? "/post" : "/login"} onClick={closeOffcanvas}>Post Your Ad</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-auto ms-auto">
              <div className="top-cart-icons">
                <nav className="navbar navbar-expand">
                  <ul className="navbar-nav">
                    {userName ? (
                      <>
                        <li className="nav-item dropdown" ref={dropdownRef}>
                          <button
                            className="nav-link btn btn-link text-white dropdown-toggle"
                            onClick={toggleDropdown}
                          >
                            Welcome, {userName}
                          </button>
                          <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}>
                            <li>
                              <Link to="/profile" className="dropdown-item" onClick={closeOffcanvas}>Profile</Link>
                            </li>
                            <li>
                              <Link to="/user-ads" className="dropdown-item" onClick={closeOffcanvas}>My Ads</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <button className="dropdown-item" onClick={() => { handleLogout(); closeOffcanvas(); }}>
                                Logout
                              </button>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item">
                        <Link to="/login" className="nav-link cart-link" onClick={closeOffcanvas}>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAchJREFUSEu1lTtPVUEUhb8VaxOJRo1EGwosrfgBxhcaSyFW/AITgiRYGeiESLSwpwUt1Uh4WdraGQsaDChGo1FLyPLsZCDXwx3mesidds5e336s2Ud0+ajL+nQEsH27SmQS6EsJrQMPJb0uJVgE2J4AHmWExiXNHgY5FGD7OrAIfAECtJTErgHTwFngiqTVHKQEWA4BYFjS81YR20PAAvBG0s2mgB/ACeC4pD81wEngG7AlqbcpYBs4DZyS9D0D2JYUrWp7Si2Knl8FhiS9yLRoUdJgU0DrkMeBmMmxBJ0BzhxpyJGV7TEgxEK49ewCYdOnjW26F2i7H7gPhD13gLVq8LOSPh75oZUESvfZIdsOe0bWA8Cl5KZWva/Ae+BdquZ3O1hbgO1wxVwaYinJuN8CRiSt1D8+ALB9C3iVPnwJTAHrkn7WbBoVxvKL+4iJMygpVsv++Qdgu6daCx9S5tOSHnSSvu3HqZ2fgYuSfu3F1QGjwBPgraTLnYgnK4dOPMrYW/ckPcsBYqHdKT2edmDbN2LxVRXMV/a9mwNsAOeBnnrPS9XYPgdsAp8kXcgBHBeSij+iTBUH4hsJlarJuuh/Ajv9tusV/AXpWpsZNntrxAAAAABJRU5ErkJggg=="
                            alt="Cart"
                          />
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="primary-menu">
        <nav className="navbar w-100 navbar-dark container mb-0 p-0">
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            ref={offcanvasRef}
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <img src="assets/images/logo-icon.png" width="100" alt="Logo" />
              </div>
              <button
                type="button"
                className="btn-close text-reset"
                onClick={closeOffcanvas}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body primary-menu menutextcolor">
              <ul className="navbar-nav justify-content-center flex-grow-1 gap-1">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeOffcanvas}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-ads" onClick={closeOffcanvas}>Rooms</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/post" onClick={closeOffcanvas}>Post Your Ad</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
