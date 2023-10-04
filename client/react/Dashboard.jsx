import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import { Chart, Doughnut } from 'react-chartjs-2';
import DoughnutComponent from './Charts/Doughnut.jsx'
import LineComponent from './Charts/LineChart.jsx';
import 'chart.js/auto'


const Dashboard = props => {
    const {expensesList, changeExpensesList, incomesList, changeIncomesList, name, changeName} = props;
    const [totalExpenses, changeTotalExpenses] = useState(0);
    const [totalIncomes, changeTotalIncomes] = useState(0);
    const [chart, setChart] = useState('');

    /* 
        After component mounts, we want it to grab user expenses and user incomes from database to display.
        Does the fetch request by passing in the user ID which is stored in a cookie created when a user logs in. 
    */ 
    useEffect(() => {
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        const getUser = () => {
         axios.get('http://localhost:3002/infoUser', 
            {
                params: {
                    user_id: id,
                }
            },
        )
        .then((res, err) => {
            if(err) console.log('err:', err); 
            else {
              changeName(res.data.currUser);
            }});
          }
        const getIncome = () => {
         axios.get('http://localhost:3002/infoIncome',
            {
              params: {
                user_id: id
              }
            }
        )
        .then((res, err) => {
          if(err) console.log('err:', err); 
          else {
            changeIncomesList(res.data.currIncomes);
            let totalIncomes = 0;
            res.data.totalIncomes.forEach(income => {
                totalIncomes += parseInt(income.value.slice(1).replace(/,/g, '')); 
            });
            changeTotalIncomes(totalIncomes);

          }});
        }
      const getExpenses = () => {
       axios.get('http://localhost:3002/infoExpenses',
          {
            params: {
              user_id: id
            }
          }
      )
      .then((res, err) => {
        if(err) console.log('err:', err); 
        else {
          changeExpensesList(res.data.currExpenses);
          let totalExpenses = 0;
          res.data.totalExpenses.forEach(income => {
              totalExpenses += parseInt(income.value.slice(1).replace(/,/g, '')); 
          });
          changeTotalExpenses(totalExpenses);

        }});
      }
      getUser();
      getIncome();
      getExpenses();
    }, [chart]);

    const handleChartChange = (e) => {
      setChart(e.target.value);
    }



    const expenseArr = [];
    for(const expense of expensesList) {
        expenseArr.push(
            <div className='expenseItem'>
                <span className='expenseName'>{expense.item}: </span>
                <span className='expenseAmt'>{expense.value}</span>
                <br />
                <span className='recurring'>Date: {expense.created.slice(0, 10)}</span> 
            </div>
        );
    }

    const incomeArr = [];
    for(const income of incomesList) {
        incomeArr.push(
            <div className="incomeItem">
                <span className="expenseName">{income.item}: </span>
                <span className="incomeAmt">{income.value}</span>
                <br />
                <span className="recurring">Date: {income.created.slice(0, 10)}</span>
            </div>
        );
    }
    // changeExpenses(expenseArr.reverse());
    // changeIncomes(incomeArr.reverse());



    return (
        <>  
            {/* renders the app logo and welcome message above navBar */ }
            <div className='aboveNav'>
                <span className="titleName">Finance Tracker</span>
                <span className="greeting">Hello, { name }</span>
            </div>

            {/* rendering the navBar */}
            < NavBar />
            
            <div className="dashboardcontainer">
                {/* Rendering the graph for the dashboard via chartJS*/}
                
                <div className="Graph">

                <div className="charts">
                  <div className="title">Chart Types</div>
                  <div className='select'>
                    <select onChange={handleChartChange}>
                      <option value={'Doughnut'}>Doughnut</option>
                      <option value={'Line'}>Line</option>
                      <option value={'Bar'}>Bar</option>
                      <option value= {'Area'}>Area</option>
                      </select> 
                  </div>
                </div>
                {
                  (() => {
                    console.log(chart)
                    if (chart === 'Doughnut') return <DoughnutComponent totalIncomes={totalIncomes} totalExpenses={totalExpenses}/>;
                    else if (chart === 'Line') return <LineComponent incomesList={incomesList} expensesList={expensesList}/>;
                    else if (chart === 'Bar') return <h1>Bar</h1>
                    else if (chart === 'Area') return <h1>Area</h1>
                    else return <DoughnutComponent totalIncomes={totalIncomes} totalExpenses={totalExpenses}/>;
                  })()

                }
                </div>
                {/* Rendering the expenses and incomes to display*/}
                <div className="expenses">
                    <div className="title">Expenses</div> 
                    {expenseArr}
                </div>
                <div className="incomes">
                    <div className='title'>Incomes</div>
                    {incomeArr}
                </div>
            </div>
        </>
    )
}

export default Dashboard; 