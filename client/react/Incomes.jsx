import React, { useEffect, useState } from 'react';
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
                console.log(incomes);
            }
        }); 
    }, [successfulPost]);

    // declaring input field states for adding an expense
    const [item, setItem] = useState('');
    const [amount, setAmt] = useState('');
    const [recurrence, setRec] = useState('');
    
    const addIncome = async () => {
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
            })
      console.log(result);
    }
    
    return (
        <div>
            {incomes}
            <div classname="inputs" id="input-div">
                <input type="text" placeholder="Income item" id="incomeItem" 
                onChange={e => setItem(e.target.value)}/>
                <input type="text" placeholder="Income amount" id="incomeAmt" 
                onChange={e => setAmt(e.target.value)}/>
                <input type="text" placeholder="Income recurrence" id="incomeRec" 
                onChange={e => setRec(e.target.value)}/>
            </div>
            <button onClick={addIncome}>Add Income</button>
        </div>    
    )
}

export default Incomes; ;