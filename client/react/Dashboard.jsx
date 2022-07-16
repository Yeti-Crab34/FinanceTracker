import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';

class Dashboard extends React.Component {
    constructor () {
        super();

        this.getName = this.getName.bind(this);
        this.getExpenses = this.getExpenses.bind(this); 
    }

    async getName() {
        
    }

    async getExpenses() {
        const data = (await fetch('/:user/expenses')).json(); //want value and created (date);
        const { deconstruct } = data;
    }



    render() {
        
        return (
            <>
                <div className='aboveNav'>
                    <h1>Finance Tracker</h1>
                    <h4>Hello (insert user here)</h4>
                </div>

                < NavBar />
                
                <div className="dashboardcontainer">
                    <div className="Graph">Graph</div>
                    <div className="expenses">Expenses</div>
                    <div className="incomes">Income</div>
                </div>
            </>

        )
    }
}

export default Dashboard; 