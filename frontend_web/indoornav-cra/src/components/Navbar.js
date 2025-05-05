import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown'; // Assuming Dropdown.js is in the same directory

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false); // State for the Campus Maps dropdown

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  // New function to toggle the dropdown on click in mobile view
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

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

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
                  onClick={toggleDropdownMobile} // Add onClick for mobile
              >
                <Link
                    to=''
                    className='nav-links'
                    // onClick={closeMobileMenu}
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
              <li>
                <Link
                    to='/sign-up'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} {/* Keep your Sign Up button */}
          </div>
        </nav>
      </>
  );
}

export default Navbar;