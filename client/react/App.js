import React from 'react';
import NavBar from './NavBar.js';
import Login from './Login.js';
import Register from './Register.js';
import Content from './Content.js';
import Error from './Error.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <main className='App'>
    <h1 className='App-title'>Some logo here</h1>
    < BrowserRouter >
      < NavBar />
      < Routes >
        < Route path="/register" element={< Register />}/>
        < Route path="/tracker" element={< Tracker />}/>
        < Route path="/login" element={< Login />}/>
        < Route path="/content" element={< Content />}/>
        < Route path="/" element={<h1 className='homepage'>HomePage</h1>}/>
        < Route path="*" element={< Error />}/>
      </ Routes >
    </ BrowserRouter >
  </main>
);

export default App;