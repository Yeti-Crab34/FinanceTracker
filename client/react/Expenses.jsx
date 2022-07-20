import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';

const Expenses = (props) => {
    const {expensesList, changeExpensesList} = props;
    console.log('Props: ', props)
    const [userID, setID] = useState('');
    const [successfulPost, postSuccess] = useState('')
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);
    const [editId, setEditId] = useState('');
  
    const toggleEdit = async (e) => {
        setEditId(e.target.id);
      };
    
      const deletePost = async (e) => {
        // console.log(e.target.id);
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
        //axios delete request passing in id as a param
        try {
          const fetchData = async () => {
            const axiosDelete = await axios.delete(
              `http://localhost:3002/removeExpense/${e.target.id}`
            );
          };
          const fetched = fetchData();
          setDeleted(!deleted);
        } catch (error) {
          console.log('Deletion Error');
        }
      };
      const submitEdit = (e) => {
        e.preventDefault();
        const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
    
        const expenseName = e.target[0].value
          ? e.target[0].value
          : e.target[0].defaultValue;
        const expenseAmt =
          e.target[1].value || isNaN(e.target[1].value)
            ? e.target[1].value
            : e.target[1].defaultValue;
        const recurring = e.target[2].value
          ? e.target[2].value
          : e.target[2].defaultValue;
    
        try {
          axios.patch(
            `http://localhost:3002/updateExpense/${parseInt(e.target.id)}`,
            {
              item: expenseName,
              value: Number(expenseAmt.replace(/[^0-9.-]+/g, '')),
              recurring: recurring,
            }
          );
        } catch (error) {
          console.log('Edit Error');
        }
    
        setEdited(!edited);
        cancelEdit();
      };
    
      const cancelEdit = (e) => {
        try {
          setEditId('');
        } catch (error) {
          console.log('Edit Error');
        }
      };
    /* 
        we use this successfulPost as a dependency for useEffect so that it runs everytime 
        a new expense is added so it can rerender with the new expense. This also runs 
        initially to display the expenses the user already had.
    */
  //----------Use Effect-----------------------------------------
  useEffect(() => {
    const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
    setID(id);

    // Get request for expenses of this account:
    //Only make this request IF we are not in edit
    //if (!editMode) then do get request
    axios
      .get('http://localhost:3002/info', {
        params: {
          user_id: id,
        },
      })
      .then((res, err) => {
        if (err) console.log('err:', err);
        else {
          changeExpensesList(res.data.currExpenses);
        }
      });
  }, [successfulPost, deleted, edited]);
  //---------------------------------------------------

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
            })
            .then((res) => {
                console.log('Post Success true!');
                postSuccess(true);
              })
              .catch((err) => {
                console.log(err);
              });
        
        // clearing the input fields after successfully posting new expense to database    
        const itemInput = document.getElementById('expenseItem');
        const amountInput = document.getElementById('expenseAmt');
        itemInput.value = '';
        amountInput.value = '';
    }
      //   CREATING THE NEW DIV - THIS PART CAN BE PUT INTO A SEPARATE COMPONENT!!!
  const expenseArr = [];
//   console.log('Expenses: ', expenses);
  for (const expense of expensesList) {
    if (expense._id !== parseInt(editId)) {
      expenseArr.push(
        <div className="expenseItem">
          <span className="expenseName">{expense.item} </span>
          <span className="expenseAmt">{expense.value}</span>
          <span className="recurring">Occurs {expense.recurring}</span>
          <span className="expenseDate">{expense.created.slice(0,10)}</span>
          <span>
            <button
              id={expense._id}
              className="editButton"
              onClick={async (e) => await toggleEdit(e)}
            >
              Edit
            </button>
          </span>
          <span>
            <button
              id={expense._id}
              className="deleteButton"
              onClick={deletePost}
            >
              Delete
            </button>
          </span>
        </div>
      );
    } else {
      console.log('Editing Mode');
      expenseArr.push(
        <form id={expense._id} onSubmit={submitEdit}>
          <div className="expenseItem">
            <input
              className="expenseName"
              placeholder={expense.item}
              defaultValue={expense.item}
            />
            <input
              className="expenseAmt"
              placeholder={expense.value}
              defaultValue={Number(expense.value.replace(/[^0-9.-]+/g, ''))}
            />
            <select
              name="reoccurence"
              id="expenseRec"
              defaultValue="Once"
              onChange={(e) => setRec(e.target.value)}
            >
              <option value="Once">Once</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
            <span className="expenseDate">{expense.created.slice(0,10)}</span>

            <span>
              <button id={expense._id} type="submit" className="editButton">
                Confirm
              </button>
            </span>

            <span>
              <button
                id={expense._id}
                className="cancelButton"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </span>
          </div>
        </form>
      );
    }
  }
    // renders all the expenses a user has and the input fields for adding a new expense
    return (
        <div className='expenses-page'>
            < NavBar />
            <div className='history-container'>{expenseArr}</div>
            <div className="input-div">
                <label >Expense Name: </label>
                <input type="text" name="expenseItem" id="expenseItem" placeholder="Expense name"
                onChange={e => setItem(e.target.value)}/>
                <label >Amount: </label>
                <input type="text" name="expenseAmount" id="expenseAmt" placeholder="Expense amount"
                onChange={e => setAmt(e.target.value)}/>
                <label >Reoccuring? </label>
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