import React, { useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import './NavbarStyles.css';
import { Logout } from './Logout';
import { useAuth } from './AuthContext';

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      setIsMobile(window.innerWidth < 769);
    };

    setResponsiveness();

    window.addEventListener('resize', setResponsiveness);

    return () => {
      window.removeEventListener('resize', setResponsiveness);
    };
  }, []);

  return (
    <nav>
      <div className='nav-container'>
        <div id="logo">
          <a href="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="logotext">BarakoSkoniai</span>
          </a>
        </div>

        {isMobile ? (
          <div>
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
              ☰
            </div>
            <ul className={`button-list ${showMobileMenu ? 'show' : ''}`}>
              <li><a href="/explore">Explore recipes</a></li>
              <li><a href="/new">Generate with AI</a></li>
              {isAuthenticated ? (
                <>
                  <li><a href="/Users">Profile</a></li>
                  <li><a href="/" onClick={() => { Logout(); setShowMobileMenu(false); }}>Logout</a></li>
                </>
              ) : (
                <>
                  <li><a href="/Register">Sign Up</a></li>
                  <li><a href="/Login">Sign In</a></li>
                </>
              )}
            </ul>
          </div>
        ) : (
          <div id="navbar">
            <ul className="button-list">
              <li><a className="nav-button text-button" href="/explore">Explore recipes</a></li>
              <li><a className="nav-button text-button" href="/new">Generate with AI</a></li>
              {isAuthenticated ? (
                <>
                  <li><a className="nav-button signup-button" href="/Users">Profile</a></li>
                  <li><a className="nav-button signin-button" href="/" onClick={() => Logout()}>Logout</a></li>
                </>
              ) : (
                <>
                  <li><a className="nav-button signup-button" href="/Register">Sign Up</a></li>
                  <li><a className="nav-button signin-button" href="/Login">Sign In</a></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
