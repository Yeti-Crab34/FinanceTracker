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

  useEffect(() => {
    changeLoginState(document.cookie.length > 0);
  });


  return (
    <main className='App'>
      {
      //If user is not logged in,
      !userLoggedIn
        // Render the login page,
        ? <> 
            <h1 className='app-title' >
              <span className='big-letter'>F</span>INANCE 
              <span className='big-letter'>U</span>SAGE
              <span className='big-letter'>C</span>HARTS
            </h1>
            < Login userLoggedIn={userLoggedIn} changeLoginState={changeLoginState}/>
          </>
        // Otherwise render the Dashboard
        : <div className='homepage'>
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