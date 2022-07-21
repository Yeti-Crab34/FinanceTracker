const User = require('../models/models.js');

const income_expenseController = {};

//this gets information about expenses and income from our user by querying the db for our user id, and then using that to get that information
//and stores it in res.locals.
income_expenseController.getUser = async (req, res, next) => {
  try {
    const target_id = req.query.user_id;
    const sqlQuery = `SELECT * FROM Users WHERE _id='${target_id}'`;
    const currUser = await User.query(sqlQuery);
    res.locals.currUser = currUser.rows[0].fullname;
    return next();
  } catch {
    console.log('caught');
    return next('could not get user');
  }
};

income_expenseController.getIncome = async (req, res, next) => {
  try {
    const target_id = req.query.user_id;
    const incQuery = `SELECT * FROM Income WHERE user_id=${target_id} ORDER BY created ASC` ;
    const incomes = await User.query(incQuery);
    const totalIncQuery = `SELECT value FROM Income WHERE user_id=${target_id}` ;
    const totalInc = await User.query(totalIncQuery);
    res.locals.currIncomes = incomes.rows;
    res.locals.totalIncomes = totalInc.rows;
    return next();
  } catch {
    console.log('caught');
    return next('could not get user');
  }
};

income_expenseController.getExpenses = async (req, res, next) => {
  try {
    const target_id = req.query.user_id;
    const expQuery = `SELECT * FROM Expense WHERE user_id=${target_id} ORDER BY created ASC` ;
    const expenses = await User.query(expQuery);
    const totalExpQuery = `SELECT value FROM Expense WHERE user_id=${target_id}`;
    const totalExp = await User.query(totalExpQuery);

    res.locals.currExpenses = expenses.rows;
    res.locals.totalExpenses = totalExp.rows;
    return next();
  } catch {
    console.log('caught');
    return next('could not get user');
  }
};



//inserts new expenses into the expense db
income_expenseController.addExpense = async (req, res, next) => {
  try {
    const { item, amount, recurrence, id, created } = req.body;
    const params = [item, recurrence, amount, created, id];
    const sqlQuery = `
      INSERT INTO Expense (item, recurring, value, created, user_id) 
      VALUES ($1, $2, $3, $4, $5);
      `;
    const expQuery = await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to add expense');
  }
};

// adding functionality to update an expense
income_expenseController.updateExpense = async (req, res, next) => {
  try {
    const { itemID } = req.params;
    const { item, value, recurring } = req.body;
    const params = [value, recurring, item, itemID];
    const sqlQuery = `
      UPDATE Expense SET value = $1, recurring = $2, item = $3 WHERE _id = $4;`;
    await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to update expense');
  }
};

// adding functionality to remove expense
income_expenseController.removeExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = [id];
    // console.log('item', item, 'user_id', user_id);
    const sqlQuery = `DELETE FROM Expense WHERE _id = $1;`;
    await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to remove expense');
  }
};

//adds income to the income db
income_expenseController.addIncome = async (req, res, next) => {
  try {
    const { item, amount, recurrence, id, created } = req.body;
    const params = [item, recurrence, amount, created, id];
    const sqlQuery = `
      INSERT INTO Income (item, recurring, value, created, user_id) 
      VALUES ($1, $2, $3, $4, $5);
      `;
    const incQuery = await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to add income');
  }
};

// adding functionality to update an income
income_expenseController.updateIncome = async (req, res, next) => {
  try {
    const { itemID } = req.params;
    const { item, value, recurring } = req.body;
    const params = [value, recurring, item, itemID];
    const sqlQuery = `
      UPDATE Income SET value = $1, recurring = $2, item = $3 WHERE _id = $4;`;
    await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to update income');
  }
};

// adding functionality to remove income
income_expenseController.removeIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = [id];
    // console.log('item', item, 'user_id', user_id);
    const sqlQuery = `DELETE FROM Income WHERE _id = $1;`;
    await User.query(sqlQuery, params);
    return next();
  } catch {
    return next('Error: Unable to remove income');
  }
};

module.exports = income_expenseController;
