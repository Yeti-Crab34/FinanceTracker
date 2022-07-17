import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import axios from 'axios';

class Dashboard extends React.Component {
    constructor () {
        super();

        this.state = {
            name: '',
            expenses: [],
            incomes: []
        }

        //this.getName = this.getName.bind(this);
        this.getExpenses = this.getExpenses.bind(this); 
    }

    async getExpenses() {
        const data = (await fetch('/:user/expenses')).json(); //want value and created (date);
        const { deconstruct } = data;
    }

    componentDidMount() {
        console.log('mounting');
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
                console.log(res.data.currExpenses);
                const expenseArr = [];
                for(const expense of res.data.currExpenses) {
                    expenseArr.push(
                        <div className='expenseItem'>
                            <span className='expenseName'>{expense.item}: </span>
                            <span className='expenseAmt'>{expense.value}</span>
                            <br />
                            <span className='recurring'>Occurs {expense.recurring}</span> 
                        </div>
                    );
                }
                const incomeArr = [];
                for(const income of res.data.currIncomes) {
                    incomeArr.push(
                        <div className="incomeItem">
                            <span className="expenseName">{income.item}: </span>
                            <span className="incomeAmt">{income.value}</span>
                            <br />
                            <span className="recurring">Occurs {income.recurring}</span>
                        </div>
                    );
                }
                this.setState({ 
                    name: res.data.currUser,
                    expenses: expenseArr,
                    incomes: incomeArr,
                })
            }
            
        }); 
    }

    render() {
        return (
            <>
                <div className='aboveNav'>
                    <h1>Finance Tracker</h1>
                    <h4>Hello { this.state.name }</h4>
                </div>

                < NavBar />
                
                <div className="dashboardcontainer">
                    <div className="Graph">Graph</div>
                    <div className="expenses">{this.state.expenses}</div>
                    <div className="incomes">{this.state.incomes}</div>
                </div>
            </>

        )
    }
}

export default Dashboard; 