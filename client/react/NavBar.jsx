import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = props => {
  /*
    Last Link in NavBar is logout button. This is the onClick function for the button.
    Logout works by setting the cookie to expire on 1970 making the cookie stored during login
    invalid. Redirects to login page. 
  */ 
  const logOut = () => {
    document.cookie = "SSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  }
  /* 
    Defining routes for react-router for navBar. Links to different routes where we render components 
  */
  return (
    <> 
      <div className="nav" data-testid='2'> 
        <p data-testid='3'>Hello!</p>
        <div data-testid='4'><Link className="nav-link" to="/">Dashboard</Link></div>
        <div><Link className="nav-link" to="/income">Income</Link></div>
        <div><Link className="nav-link" to="/expenses" data-testid='1'>Expenses</Link></div>
        <div><Link className="nav-link" to="/assets">Assets/Investments</Link></div>
        <div><Link className="nav-link" to="/" onClick={logOut}>Logout</Link></div>
      </div>
    </>
  )
}

export default NavBar;