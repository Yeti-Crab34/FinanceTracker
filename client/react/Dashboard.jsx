import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import axios from 'axios';

class Dashboard extends React.Component {
    constructor () {
        super();

        this.state = {
            name: ''
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
                this.setState({ 
                    name: res.data
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
                    <div className="expenses">Expenses</div>
                    <div className="incomes">Income</div>
                </div>
            </>

        )
    }
}

export default Dashboard; 