import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';

const Incomes = props => {
    const {incomes, changeIncomes} = props;
    const [userID, setID] = useState('');
    const [successfulPost, postSuccess] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editID, setEditID] = useState('');

    //NEW UD OPERATIONS
    const test = () => {
        setEditID(56);
    }

    const toggleEdit = async (e) => {
        setEditMode = true;
        setEditID(e.target.id);
        // console.log('Income ID is: ', income._id)
        // console.log('Edit mode: ', editMode);
        console.log('Edit ID is: ', editID);
    }

    const deletePost = (e) => {
        console.log(e.target.id);
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
        //axios delete request passing in id as a param
        try {
            axios.delete('http://localhost:3002/income/delete', 
            {
                params: {
                    user_id: id,
                    income_id: e.target.id
                }
            },
        )
        } catch (error) {
            console.log('Deletion Error')
        }
    }

    //SUBMIT EDIT CHANGES
    const submitEdit = (e) => {
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
        try {
            axios.patch('http://localhost:3002/income/update', 
            {
                params: {
                    user_id: id,
                    income_id: e.target.id
                }
            },
        )
        } catch (error) {
            console.log('Edit Error')
        }

    }

    /* 
        we use this successfulPost as a dependency for useEffect so that it runs everytime 
        a new expense is added so it can rerender with the new expense. This also runs 
        initially to display the expenses the user already had.
    */
    useEffect(() => {
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1); 
        setID(id);

        // Get request for expenses of this account:
        //Only make this request IF we are not in edit
        //if (!editMode) then do get request
        axios.get('http://localhost:3002/info', 
            {
                params: {
                    user_id: id,
                }
            },
        )
        .then((res, err) => {
            if(err) console.log('err:', err); 
            //else incomes = res.data.currIncomes;
            //else incomeArray.push()
            else {
                console.log('rerendering incomeArray')
                const incomeArr = [];
                for(const income of res.data.currIncomes) {
                    console.log('income being pushed to incomeArray', income)
                    if (income._id !== editID) {
                    incomeArr.push(
                        <div className='incomeItem'>
                            <span className='incomeName'>{income.item} </span>
                            <span className='incomeAmt'>{income.value}</span>
                            <span className='recurring'>Occurs {income.recurring}</span> 
                            <span><button id={income._id} className='editButton' onClick={async (e)=> await toggleEdit(e)}>Edit</button></span>
                            <span><button id={income._id} className='deleteButton' onClick={deletePost}>Delete</button></span>
                        </div>
                    );
                    } else {
                        console.log('hi');
                    incomeArr.push(
                        <div className='incomeItem'>
                        <input className='incomeName'>{income.item} </input>
                        <input className='incomeAmt'>{income.value}</input>
                        <input className='recurring'>Occurs {income.recurring}</input> 
                        <span><button id={income._id} className='editButton' onClick={toggleEdit}>Confirm</button></span>
                        <span><button id={income._id} className='deleteButton' onClick={deletePost}>Cancel</button></span>
                    </div>
                    )
                    }
                }
                changeIncomes(incomeArr); 
            }
        }); 


    }, [successfulPost, editID]);

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
            }).then((res) => postSuccess(true)) 
            .catch((err) => {console.log(err)});

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
                <label >Income Name: </label>
                <input type="text" name="incomeName" placeholder="Income item" id="incomeItem" 
                onChange={e => setItem(e.target.value)}/>
                <label >Amount: </label>
                <input type="text" name="incomeAmount" placeholder="Income amount" id="incomeAmt" 
                onChange={e => setAmt(e.target.value)}/>
                <label >Reoccuring? </label>
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

export default Incomes; 