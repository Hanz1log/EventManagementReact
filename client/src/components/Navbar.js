import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (!isAuthPage && savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDark(true);
    } else {
      document.body.classList.remove('dark-mode');
      setIsDark(false);
    }
  }, [location.pathname]);

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  function toggleTheme() {
    if (isDark) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <a className="navbar-brand text-light fw-bold" href="/">EventHorizon</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: 'white' }}></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="/home">Book</a></li>
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/about">About</a>
                </li>
              </>
            )}
            {!isAuthPage && (
              <li className="nav-item ms-2">
                <button className="btn btn-sm btn-outline-light" onClick={toggleTheme}>
                  {isDark ? '☀ Light' : '🌙 Dark'}
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
