import React, { useEffect, useState } from 'react';
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
        console.log('useEffect of Expenses');
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        setID(id);
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
                let id = 0;
                for(const expense of res.data.currExpenses) {
                    expenseArr.push(
                        <div id={id++} className='expenseItem'>
                            <span className='expenseName'>{expense.item}: </span>
                            <span className='expenseAmt'>{expense.value}</span>
                            <br />
                            <span className='recurring'>Occurs {expense.recurring}</span> 
                        </div>
                    );
                }
                setExpenses(expenseArr); 
                console.log('Expense state', expenses);
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
            }).then((res) => {
                console.log('Successful addExpense')
                postSuccess(res);
                console.log(res);
            }).catch((err) => {console.log(err)});

        // clearing the input fields after successfully posting new expense to database    
        const itemInput = document.getElementById('expenseItem');
        const amountInput = document.getElementById('expenseAmt');
        itemInput.value = '';
        amountInput.value = '';
    }
    
    return (
        // renders all the expenses a user has and the input fields for adding a new expense
        <div className='expenses-page'>
            {expenses}
            <div className="inputs" id="input-div">
                <input type="text" placeholder="Expense item" id="expenseItem" 
                onChange={e => setItem(e.target.value)}/>
                <input type="text" placeholder="Expense amount" id="expenseAmt" 
                onChange={e => setAmt(e.target.value)}/>
                <select name='reoccurence' id="expenseRec" onChange={e => setRec(e.target.value)}>
                    <option value='Once'>Once</option>
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Monthly'>Monthly</option>
                    <option value='Annually'>Annually</option>
                </select>
            </div>
            <button onClick={addExpense}>Add Expense</button>
        </div>    
    )
}

export default Expenses; 