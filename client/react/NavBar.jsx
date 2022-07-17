import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {

  return (
    <> 
      <div className="nav"> 
        <div><Link className="nav-link" to="/">Dashboard</Link></div>
        <div><Link className="nav-link" to="/tracker">Income</Link></div>
        <div><Link className="nav-link" to="/content">Expenses</Link></div>
        <div><Link className="nav-link" to="/spongebob">Net</Link></div>
        <div><Link className="nav-link" to="/login">Assets</Link></div>
        <div><Link className="nav-link" to="/login">Investments</Link></div>
        <div><Link className="nav-link" to="/login">Account</Link></div>
      </div>
    </>
  )
}

export default NavBar;