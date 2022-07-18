import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';

const Incomes = props => {
    const [incomes, setIncomes] = useState([]); 
    const [userID, setID] = useState('');

    /* 
        we use this successfulPost as a dependency for useEffect so that it runs everytime 
        a new expense is added so it can rerender with the new expense. This also runs 
        initially to display the expenses the user already had.
    */
    const [successfulPost, postSuccess] = useState('')
    useEffect(() => {
        console.log('useEffect of Incomes');
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
                console.log(res.data.currIncomes);
                const incomeArr = [];
                let id = 0;
                for(const income of res.data.currIncomes) {
                    incomeArr.push(
                        <div id={id++} className='incomeItem'>
                            <span className='incomeName'>{income.item}: </span>
                            <span className='incomeAmt'>{income.value}</span>
                            <br />
                            <span className='recurring'>Occurs {income.recurring}</span> 
                        </div>
                    );
                }
                setIncomes(incomeArr); 
                console.log('Incomes sate', incomes);
            }
        }); 
    }, [successfulPost]);

    // declaring input field states for adding an expense
    const [item, setItem] = useState('');
    const [amount, setAmt] = useState('');
    const [recurrence, setRec] = useState('');
    
    const addIncome = () => {
        if (item.length === 0) {alert('Please enter a valid item'); return;}
        if (!/^\d+\.{0,1}\d{0,2}$/.test(amount)) {alert('Please enter a valid amount'); return;}
        axios.post('http://localhost:3002/addIncome', 
            {
                item: item,
                amount: amount,
                recurrence: recurrence,
                id: userID,
            }).then((res) => {
                console.log('Successful addIncome');
                postSuccess(res);
                console.log(res);
            }).catch((err) => {console.log(err)});

        // clearing the input fields after successfully posting new income to database    
        const itemInput = document.getElementById('incomeItem');
        const amountInput = document.getElementById('incomeAmt');
        itemInput.value = '';
        amountInput.value = '';
    }

     // renders all the income a user has and the input fields for adding a new income
    return (
        <div className='income-page'>
            < NavBar />
             <div className='history-container'>
                {incomes}
            </div>
            <div className="input-div">
                <input type="text" placeholder="Income item" id="incomeItem" 
                onChange={e => setItem(e.target.value)}/>
                <input type="text" placeholder="Income amount" id="incomeAmt" 
                onChange={e => setAmt(e.target.value)}/>
                <select name='reoccurence' id="expenseRec" onChange={e => setRec(e.target.value)}>
                    <option value='Once'>Once</option>
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Monthly'>Monthly</option>
                    <option value='Annually'>Annually</option>
                </select>
                <button onClick={addIncome}>Add Income</button>
            </div>
        </div>    
    )
}

export default Incomes; ;