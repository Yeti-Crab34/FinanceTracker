import React, { useEffect, useState } from 'react';
// import Content from './Content.js';
// import Error from './Error.js';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Expenses from './Expenses.jsx';
import Incomes from './Incomes.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  const [userLoggedIn, changeLoginState] = useState(document.cookie.length > 0);

  /* 
    Sets login state by checking to see if a cookie exists. 
    Should probably refactor this to check if the specific user ID cookie exists. 
   */
  useEffect(() => {
    changeLoginState(document.cookie.length > 0);
  });


  /* 
    Renders the login page or the home dashboard 
    This is a return using a ternary operator to render either the login/signup page or the dashboard
    based on the userLoggedIn state. 
  */
  return (
    <main className='App'>
      {
      //If user is not logged in,
      !userLoggedIn
        // Render the login page,
        ? <> 
            <div id='city-background' />
            <h1 className='app-title' >
              <img src='YetiGetiCash.png' />
              FINANCE USAGE CHARTS KIT
            </h1>
            < Login userLoggedIn={userLoggedIn} changeLoginState={changeLoginState}/>
          </>
        // Otherwise render the Dashboard
        : <div className='homepage'>
            <div id='background'/>
            {/*< NavBar />*/}
            < Routes >
              {/* < Route path="/" element={< />}/> */}
              < Route path="/expenses" element={ < Expenses /> }/>
              < Route path="/income" element={< Incomes />}/>
              < Route path="/assets" element={< div />}/>
              < Route path="/net" element={< div />}/>
              < Route path="/investments" element={< div />}/>
              < Route path="/" element={< Dashboard />}/>
              < Route path="*" element={< Error />}/>
            </ Routes >
      
          </div>
      }
    </main>
  )
};

export default App;