import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import { Chart, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'



class Dashboard extends React.Component {
    constructor () {
        super();

        this.state = {
            name: '',
            expenses: [],
            incomes: [],
            totalExpenses: 0,
            totalIncomes: 0,
        }

    }

    /* 
        After component mounts, we want it to grab user expenses and user incomes from database to display
    */ 
    componentDidMount() {
        console.log('mounting');
        console.log(document.cookie);
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        console.log("id:", id);
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
                console.log(res.data.currExpenses);
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
                this.setState({ 
                    name: res.data.currUser,
                    expenses: expenseArr.reverse(),
                    incomes: incomeArr.reverse(),
                    totalExpenses: totalExpenses,
                    totalIncomes: totalIncomes,
                })
            }
        }); 
    }

    render() {
        return (
            <>  
                {/* renders the app logo and welcome message above navBar */ }
                <div className='aboveNav'>
                    <span className="titleName">Finance Tracker</span>
                    <span className="greeting">Hello, { this.state.name }</span>
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
                                data: [this.state.totalIncomes, this.state.totalExpenses]
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
                        {this.state.expenses}
                    </div>
                    <div className="incomes">
                        <div className='title'>Incomes</div>
                        {this.state.incomes}
                    </div>
                </div>
            </>

        )
    }
}

export default Dashboard; 