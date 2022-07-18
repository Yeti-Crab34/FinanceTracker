import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Expenses = props => {
    const [expenses, setExpenses] = useState([]); 
    const [userID, setID] = useState('');
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
                setExpenses(expenseArr); 
                console.log(expenses);
            }
        }); 
    }, []);


    const [item, setItem] = useState('');
    const [amount, setAmt] = useState('');
    const [recurrence, setRec] = useState('');
    
    const addExpense = async () => {
      const result = await axios.post('http://localhost:3002/addExpense', 
            {
                item: item,
                amount: amount,
                recurrence: recurrence,
                id: userID,
            })
      console.log(result);
    }
    
    return (
        <div>
            {expenses}
            <div classname="inputs" id="input-div">
                <input type="text" placeholder="Expense item" id="expenseItem" 
                onChange={e => setItem(e.target.value)}/>
                <input type="text" placeholder="Expense amount" id="expenseAmt" 
                onChange={e => setAmt(e.target.value)}/>
                <input type="text" placeholder="Expense recurrence" id="expenseRec" 
                onChange={e => setRec(e.target.value)}/>
            </div>
            <button onClick={addExpense}>Add Expense</button>
        </div>    
    )
}

export default Expenses; 