import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import axios from 'axios';

const IncomesDisplay = function (props) {
const {} = props;
const {} = data;
    


return (
    <div className='incomeItem'>
        <span className='incomeName'>{income.item} </span>
        <span className='incomeAmt'>{income.value}</span>
        <span className='recurring'>Occurs {income.recurring}</span> 
        <span><button id={income._id} className='editButton' onClick={async (e)=> await toggleEdit(e)}>Edit</button></span>
        <span><button id={income._id} className='deleteButton' onClick={deletePost}>Delete</button></span>
    </div>
)
}

export default IncomesDisplay; 