import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import DatePicker from "react-datepicker";

const Incomes = (props) => {
  const { incomesList, changeIncomesList } = props;
  // console.log('Props: ', props)

  const [userID, setID] = useState('');
  const [successfulPost, postSuccess] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editId, setEditId] = useState('');
  const [startDate, setStartDate] = useState(new Date());

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
          `http://localhost:3002/removeIncome/${e.target.id}`
        );
      };
      const fetched = fetchData();
      setDeleted(!deleted);
    } catch (error) {
      console.log('Deletion Error');
    }
  };

  //SUBMIT EDIT CHANGES
  const submitEdit = (e) => {
    e.preventDefault();
    const id = document.cookie.slice(document.cookie.indexOf('=') + 1);
    //grab the new values
    // console.log('e: ', e);

    const incomeName = e.target[0].value
      ? e.target[0].value
      : e.target[0].defaultValue;
    const incomeAmt =
      e.target[1].value || isNaN(e.target[1].value)
        ? e.target[1].value
        : e.target[1].defaultValue;
    const recurring = e.target[2].value
      ? e.target[2].value
      : e.target[2].defaultValue;

    // console.log(parseInt(e.target.id));

    try {
      if (incomeName.length === 0) {alert('Please enter a valid item'); return;}
      if (!/^\d+\.{0,1}\d{0,2}$/.test(incomeAmt)) {alert('Please enter a valid amount'); return;}
      axios.patch(
        `http://localhost:3002/updateIncome/${parseInt(e.target.id)}`,
        {
          item: incomeName,
          value: Number(incomeAmt.replace(/[^0-9.-]+/g, '')),
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
      .get('http://localhost:3002/infoIncome', {
        params: {
          user_id: id,
        },
      })
      .then((res, err) => {
        if (err) console.log('err:', err);
        else {
          changeIncomesList(res.data.currIncomes);
        }
      });
  }, [successfulPost, deleted, edited]);
  //---------------------------------------------------

  // declaring input field states for adding an expense
  const [item, setItem] = useState('');
  const [amount, setAmt] = useState('');
  const [recurrence, setRec] = useState('Once');

  const addIncome = () => {
    if (item.length === 0) {
      alert('Please enter a valid item');
      return;
    }
    if (!/^\d+\.{0,1}\d{0,2}$/.test(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    axios
      .post('http://localhost:3002/addIncome', {
        item: item,
        amount: amount,
        recurrence: recurrence,
        id: userID,
        created: startDate
      })
      .then((res) => {
        console.log('Post Success true!');
        postSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });

    // clearing the input fields after successfully posting new income to database
    const itemInput = document.getElementById('incomeItem');
    const amountInput = document.getElementById('incomeAmt');
    itemInput.value = '';
    amountInput.value = '';
  };

  //   CREATING THE NEW DIV - THIS PART CAN BE PUT INTO A SEPARATE COMPONENT!!!
  const incomeArr = [];
  // console.log('IncomesList: ', incomesList)
  for (const income of incomesList) {
    // console.log('Income: ', income);
    if (income._id !== parseInt(editId)) {
      incomeArr.push(
        <div className="incomeItem">
          <span className="incomeName">{income.item} </span>
          <span className="incomeAmt">{income.value}</span>
          <span className="recurring">Occurs {income.recurring}</span>
          <span className="incomeDate">{income.created.slice(0,10)}</span>
          <span>
            <button
              id={income._id}
              className="editButton"
              onClick={async (e) => await toggleEdit(e)}
            >
              Edit
            </button>
          </span>
          <span>
            <button
              id={income._id}
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
      incomeArr.push(
        <form id={income._id} onSubmit={submitEdit}>
          <div className="incomeItem">
            <input
              className="incomeName"
              placeholder={income.item}
              defaultValue={income.item}
            />
            <input
              className="incomeAmt"
              placeholder={income.value}
              defaultValue={Number(income.value.replace(/[^0-9.-]+/g, ''))}
            />
            <select
              name="reoccurence"
              id="expenseRec"
              onChange={(e) => setRec(e.target.value)}
            >
              <option value="Once">Once</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
            <span className="incomeDate">{income.created.slice(0,10)}</span>

            <span>
              <button id={income._id} type="submit" className="editButton">
                Confirm
              </button>
            </span>

            <span>
              <button
                id={income._id}
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


  // renders all the income a user has and the input fields for adding a new income
  return (
    <div className="income-page">
      <NavBar />
      <div className="history-container">{incomeArr}</div>
      <div className="input-div">
        <label>Income Name: </label>
        <input
          type="text"
          name="incomeName"
          placeholder="Income item"
          id="incomeItem"
          onChange={(e) => setItem(e.target.value)}
        />
        <label>Amount: </label>
        <input
          type="text"
          name="incomeAmount"
          placeholder="Income amount"
          id="incomeAmt"
          onChange={(e) => setAmt(e.target.value)}
        />
        <label>Date: </label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
        <label>Reoccuring? </label>
        <select
          name="reoccurence"
          id="expenseRec"
          defaultValue="-"
          onChange={(e) => setRec(e.target.value)}>
          <option value="Once">Once</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Annually">Annually</option>

        </select>
        <button onClick={addIncome}>Add Income</button>
      </div>
    </div>
  );
};

export default Incomes;
