import React, { useEffect, useState } from 'react';
// import Content from './Content.js';
// import Error from './Error.js';
import NavBar from './NavBar.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  const [userLoggedIn, changeLoginState] = useState(false);

  useEffect(() => {
    console.log('login: ' + userLoggedIn);
  });

  return (
    <main className='App'>
      {/* {!userLoggedIn  */}
      {!userLoggedIn
        ? <> 
            <h1 className='app-title' >Finance Tracker App</h1>
            < Login userLoggedIn={userLoggedIn} changeLoginState={changeLoginState}/>
          </>
        : <>
            < NavBar />
            < Routes >
              {/* < Route path="/tracker" element={< Tracker />}/> */}
              < Route path="/content" element={< div />}/>
              < Route path="/" element={<h1 className='homepage'>Dashboard</h1>}/>
              < Route path="*" element={< Error />}/>
            </ Routes >
            < Dashboard />
          </>
      }
    </main>
  )
};

export default App;