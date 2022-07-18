import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';

const Expenses = props => {
    const [expenses, setExpenses] = useState([]); 
    const [userID, setID] = useState('');
    
    /* 
        we use this successfulPost as a dependency for useEffect so that it runs everytime 
        a new expense is added so it can rerender with the new expense. This also runs 
        initially to display the expenses the user already had.
    */
    const [successfulPost, postSuccess] = useState('')
    useEffect(() => {
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        setID(id);
        // Get request for expenses of this account:
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
                const expenseArr = [];
                let id = 0;
                for(const expense of res.data.currExpenses) {
                    expenseArr.push(
                        <div id={id++} className='expenseItem'>
                            <span className='expenseName'>{expense.item} </span>
                            <span className='expenseAmt'>{expense.value}</span>
                            <span className='recurring'>Occurs {expense.recurring}</span> 
                        </div>
                    );
                }
                setExpenses(expenseArr); 
            }
        }); 
    }, [successfulPost]);

    // declaring input field states for adding an expense
    const [item, setItem] = useState('');
    const [amount, setAmt] = useState('');
    const [recurrence, setRec] = useState('');

    const addExpense = () => {
        if (item.length === 0) {alert('Please enter a valid item'); return;}
        if (!/^\d+\.{0,1}\d{0,2}$/.test(amount)) {alert('Please enter a valid amount'); return;}
        // posting the expense to server
        axios.post('http://localhost:3002/addExpense', 
            {
                item: item,
                amount: amount,
                recurrence: recurrence,
                id: userID,
            }).then((res) =>  postSuccess(res))
            .catch((err) => {console.log(err)});

        // clearing the input fields after successfully posting new expense to database    
        const itemInput = document.getElementById('expenseItem');
        const amountInput = document.getElementById('expenseAmt');
        itemInput.value = '';
        amountInput.value = '';
    }
    
    // renders all the expenses a user has and the input fields for adding a new expense
    return (
        <div className='expenses-page'>
            < NavBar />
            <div className='history-container'>
                {expenses}  
            </div>
            <div className="input-div">
                <label for="expenseItem">Expense Name: </label>
                <input type="text" name="expenseItem" id="expenseItem" placeholder="Expense name"
                onChange={e => setItem(e.target.value)}/>
                <label for="expenseAmount">Amount: </label>
                <input type="text" name="expenseAmount" id="expenseAmt" placeholder="Expense amount"
                onChange={e => setAmt(e.target.value)}/>
                <label for="reoccurence">Reoccuring? </label>
                <select name='reoccurence' id="expenseRec" onChange={e => setRec(e.target.value)}>
                    <option value='Once'>Once</option>
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Monthly'>Monthly</option>
                    <option value='Annually'>Annually</option>
                </select>
                <button onClick={addExpense}>Add Expense</button>
            </div>
        </div>    
    )
}

export default Expenses; 