const User = require('../models/models.js');
const bcrypt = require('bcrypt');

const userController = {};


/**
* createUser - create and save a new User into the database.
*/
userController.createUser = async (req, res, next) => {
  try {
    const { fullname, password, email } = req.body;

    //hash pw
    const hashedPW = await bcrypt.hash(password, 10);

    /* for sqlQuery involving insert need to insert through $params not string literals */
    const params = [ fullname, hashedPW, email ];
    const sqlQuery = `
      INSERT INTO users (fullname, password, email) 
      VALUES ($1, $2, $3) RETURNING *;`;
    
    const createdUser = await User.query(sqlQuery, params);
    res.locals.user_id = createdUser.rows[0]._id;
    next();
  }
  catch (err) {
    next ({
      log: 'Error at middleware userController',
      status: 501,
      message: {
          err: `Error has occured while signing up.`,
      },
  })
  }
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    //checking if both fields are filled in

    if (email === undefined || password === undefined) {
      // redirect to sign up page
    }
    console.log(email, password);
    
    const sqlQuery = `SELECT * FROM users WHERE email='${email}';`

    const verifiedUser = await User.query(sqlQuery);

    //this occurs if the user is not found in our database -- the rows property on the returned query is an empty array
    if (verifiedUser.rows.length === 0) {
      console.log('Wrong email/password');  
      res.redirect(400, '/');
    }
    //if the user is found in our database from our query
    else {
      const verifyPW = await bcrypt.compare(password, verifiedUser.rows[0].password) //this returns a boolean
      if (verifyPW) {
        res.locals.user_id = verifiedUser.rows[0]._id;
        next();
      }
      else {
        console.log('Wrong email/password');
        res.redirect(400, '/');
      } 
    };
  }
  catch (err) {
    next ('global error handler')
  }
};

//this gets information about expenses and income from our user by querying the db for our user id, and then using that to get that information
//and stores it in res.locals.
userController.getUser = async (req, res, next) => { 
  try { 
    const target_id = req.query.user_id;
    console.log(target_id);
    const sqlQuery = `SELECT * FROM Users WHERE _id='${target_id}'`
    const currUser = await User.query(sqlQuery);
    //console.log(currUser.rows[0]);
    const expQuery = `SELECT * FROM Expense WHERE user_id=${target_id}`
    const expenses = await User.query(expQuery); 
    //console.log(expenses.rows);
    const incQuery = `SELECT * FROM Income WHERE user_id=${target_id}`
    const incomes = await User.query(incQuery);
    const totalIncQuery = `SELECT value FROM Income WHERE user_id=${target_id}`
    const totalExpQuery = `SELECT value FROM Expense WHERE user_id=${target_id}`
    const totalInc = await User.query(totalIncQuery);
    const totalExp = await User.query(totalExpQuery);  
    res.locals.currUser = currUser.rows[0].fullname; 
    res.locals.currExpenses = expenses.rows;
    res.locals.currIncomes = incomes.rows;
    
    res.locals.totalExpenses = totalExp.rows;
    res.locals.totalIncomes = totalInc.rows; 
    return next();
  }
  catch {
    console.log('caught');
    return next('could not get user');
  }
}

//inserts new expenses into the expense db
userController.addExpense = async(req, res, next) => {
  try {
    const { item, amount, recurrence, id } = req.body;
    const params = [item, recurrence, amount, new Date(), id]; 
    const sqlQuery = `
      INSERT INTO Expense (item, recurring, value, created, user_id) 
      VALUES ($1, $2, $3, $4, $5);
      `;
    const expQuery = await User.query(sqlQuery, params); 
    return next();
  }
  catch {
    return next('could not add expense')
  }
}

// adding functionality to update an expense
userController.updateExpense = async (req, res, next) => {
  try {
    const { item, amount, recurrence, id } = req.body;
    const params = [item, recurrence, amount, new Date(), id]; 
    const sqlQuery = `
      UPDATE Expense SET amount = amount, recurrence = recurrence, id = id WHERE item = item;
      `;
    const expQuery = await User.query(sqlQuery, params); 
    return next();
  }
  catch {
    return next('could not update expense')
  }
}

// adding functionality to remove expense
userController.removeExpense = async (req, res, next) => {
  try {
    const { id } = req.body;
    // line below is probably incorrect
    const sqlQuery = `DELETE FROM Expense WHERE {id}=item;`;
    const remExpQuery = await User.query(sqlQuery)
    return next();
  } catch {
    return next('could not remove expense')
  }
}

//adds income to the income db
userController.addIncome = async(req, res, next) => {
  try {
    const { item, amount, recurrence, id } = req.body;
    const params = [item, recurrence, amount, new Date(), id]; 
    const sqlQuery = `
      INSERT INTO Income (item, recurring, value, created, user_id) 
      VALUES ($1, $2, $3, $4, $5);
      `;
    const incQuery = await User.query(sqlQuery, params); 
    return next();
  }
  catch {
    return next('could not add income')
  }
}

// adding functionality to update an income
userController.updateIncome = async (req, res, next) => {
  try {
    const { item, amount, recurrence, id } = req.body;
    const params = [item, recurrence, amount, new Date(), id]; 
    const sqlQuery = `
      UPDATE Income SET amount = amount, recurrence = recurrence, id = id WHERE item = item;
      `;
    const expQuery = await User.query(sqlQuery, params); 
    return next();
  }
  catch {
    return next('could not update income')
  }
}

// adding functionality to remove income
userController.removeIncome = async (req, res, next) => {
  try {
    const { id } = req.body;
        // line below is probably incorrect
    const sqlQuery = `DELETE FROM Income WHERE {id}=item;`;
    const remIncQuery = await User.query(sqlQuery)
    return next();
  } catch {
    return next('Error: Was not able to remove income')
  }
}

module.exports = userController;


