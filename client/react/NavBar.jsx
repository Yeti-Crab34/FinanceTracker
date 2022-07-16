import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {

  return (
    <> 
      <div className="nav">NavBar
        <Link className="nav-link" to="/">Dashboard</Link>
        <Link className="nav-link" to="/tracker">Project Tracker</Link>
        <Link className="nav-link" to="/content">Page 2</Link>
        <Link className="nav-link" to="/spongebob">A</Link>
        <Link className="nav-link" to="/login">Login</Link>
      </div>
    </>
  )
}

export default NavBar;