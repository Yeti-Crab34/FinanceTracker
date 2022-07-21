import React, { useEffect, useState } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Expenses from './Expenses.jsx';
import Incomes from './Incomes.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  // Global State for all components:
  const [userLoggedIn, changeLoginState] = useState(document.cookie.length > 0);
  const [expenses, changeExpenses] = useState([]);
  const [incomes, changeIncomes] = useState([]);
  const [name, changeName] = useState('');
  const [expensesList, changeExpensesList] = useState([]);
  const [incomesList, changeIncomesList] = useState([]);




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
              < Route path="/expenses" element={ < Expenses expensesList={expensesList} changeExpensesList={changeExpensesList}/> }/>
              < Route path="/income" element={< Incomes incomesList={incomesList} changeIncomesList={changeIncomesList}/>}/>
              < Route path="/assets" element={<div id="assets">Assets: < img src="yeticrab.jpeg"/> 
                <br/>
                <br/>
                <br/>
                <br/>
                <div>Stanley Chen</div>
                <div>Alex Cusick</div>
                <div>Roy Jiang</div>
                <div>David Kagan</div>
              </div>}/>
              < Route path="/" element={< Dashboard expenses={expenses} changeExpenses={changeExpenses} incomes={incomes} changeIncomes={changeIncomes} name={name} changeName={changeName}/>}/>
              < Route path="*" element={< Error />}/>
            </ Routes >
      
          </div>
      }
    </main>
  )
};

export default App;