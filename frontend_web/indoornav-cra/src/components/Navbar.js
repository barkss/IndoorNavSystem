import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCaretDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown'; // Assuming Dropdown.js is in the same directory

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false); // State for the Campus Maps dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const toggleDropdownMobile = () => {
    if (window.innerWidth < 960) {
      setDropdown(!dropdown);
    }
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
    // Check for JWT on component mount and whenever localStorage changes
    const handleStorageChange = () => {
      const jwtToken = localStorage.getItem('jwtToken');
      setIsLoggedIn(!!jwtToken);
    };

    handleStorageChange(); // Initial check
    window.addEventListener('storage', handleStorageChange); // Listen for changes in localStorage

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Clean up the event listener
    };
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove the JWT
    setIsLoggedIn(false);
    setProfileDropdown(false);
    navigate('/sign-in'); // Redirect to sign-in page after logout
    closeMobileMenu();
  };

  return (
      <>
        <nav className='navbar' style={{ zIndex: 1002 }}>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              CIT-U Wild Map
              <FontAwesomeIcon icon={faMapLocationDot} className="icon-space" />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-xmark' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li
                  className='nav-item'
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onClick={toggleDropdownMobile}
              >
                <Link
                    to=''
                    className='nav-links'
                >
                  Campus Maps <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
                </Link>
                {dropdown && <Dropdown />}
              </li>
              <li className='nav-item'>
                <Link
                    to='/draw-navigation'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                  Search Location
                </Link>
              </li>

              {/* Profile Icon and Dropdown */}
              <li className='nav-item profile-icon' onClick={toggleProfileDropdown}>
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                <ul className={`profile-dropdown-menu ${profileDropdown ? 'show' : ''}`}>
                  <li>
                    <Link to='/profile' className='profile-dropdown-item' onClick={() => { closeMobileMenu(); setProfileDropdown(false); }}>
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link to='/profile-manager' className='profile-dropdown-item' onClick={() => { closeMobileMenu(); setProfileDropdown(false); }}>
                      User Profile Manager
                    </Link>
                  </li>

                  <li>
                    {isLoggedIn ? (
                        <button className='profile-dropdown-item logout-button' onClick={handleLogout}>
                          Logout
                        </button>
                    ) : (
                        <Link to='/sign-in' className='profile-dropdown-item' onClick={() => { closeMobileMenu(); setProfileDropdown(false); }}>
                          Login
                        </Link>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </>
  );
}

export default Navbar;