import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import { Chart, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'


const Dashboard = props => {
    const {expenses, changeExpenses, incomes, changeIncomes, name, changeName} = props;
    const [totalExpenses, changeTotalExpenses] = useState(0);
    const [totalIncomes, changeTotalIncomes] = useState(0);

    /* 
        After component mounts, we want it to grab user expenses and user incomes from database to display.
        Does the fetch request by passing in the user ID which is stored in a cookie created when a user logs in. 
    */ 
    useEffect(() => {
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        axios.get('http://localhost:3002/info', 
            {
                params: {
                    user_id: id,
                }
            },
        )
        .then((res, err) => {
            if(err) console.log('err:', err); 
            else {
                // creating expenses to update expenses state
                const expenseArr = [];
                for(const expense of res.data.currExpenses) {
                    expenseArr.push(
                        <div className='expenseItem'>
                            <span className='expenseName'>{expense.item}: </span>
                            <span className='expenseAmt'>{expense.value}</span>
                            <br />
                            <span className='recurring'>Date: {expense.created.slice(0, 10)}</span> 
                        </div>
                    );
                }
                // creating incomes to update incomes state
                const incomeArr = [];
                for(const income of res.data.currIncomes) {
                    incomeArr.push(
                        <div className="incomeItem">
                            <span className="expenseName">{income.item}: </span>
                            <span className="incomeAmt">{income.value}</span>
                            <br />
                            <span className="recurring">Date: {income.created.slice(0, 10)}</span>
                        </div>
                    );
                }
                let totalExpenses = 0;
                res.data.totalExpenses.forEach(expense => {
                    totalExpenses += parseInt(expense.value.slice(1).replace(/,/g, ''));
                });
                let totalIncomes = 0;
                res.data.totalIncomes.forEach(income => {
                    totalIncomes += parseInt(income.value.slice(1).replace(/,/g, '')); 
                });
                changeName(res.data.currUser);
                changeExpenses(expenseArr.reverse());
                changeIncomes(incomeArr.reverse());
                changeTotalExpenses(totalExpenses);
                changeTotalIncomes(totalIncomes);
            }
        }); 
    }, []);

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
                    <div className="chartWrapper">
                        <Doughnut data = {{
                        labels: ['Total Income', 'Total Expenses'],
                        datasets: [{
                            backgroundColor: ['#65E564', '#EE3F53'],
                            hoverBackground: ['#51fc59', '#f54545'],
                            data: [totalIncomes, totalExpenses]
                        }],  
                        }}
                        options={{
                            title:{
                                display: true,
                                text: 'Net',
                                fontSize: 26,                            
                            },
                            legend: {
                                display: true,
                                position: 'left',
                            },
                            aspectRatio: 1,
                            responsive: true,
                        }}>
                        </Doughnut>
                    </div>
                </div>
                {/* Rendering the expenses and incomes to display*/}
                <div className="expenses">
                    <div className="title">Expenses</div> 
                    {expenses}
                </div>
                <div className="incomes">
                    <div className='title'>Incomes</div>
                    {incomes}
                </div>
            </div>
        </>
    )
}

export default Dashboard; 