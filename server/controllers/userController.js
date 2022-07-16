const User = require('../models/models.js');
const bcrypt = require('bcrypt');

const userController = {};


/**
* createUser - create and save a new User into the database.
*/
userController.createUser = async (req, res, next) => {
  console.log('just entered createUser');
  try {
    // console.log('The body is:', req.body);
    const { fullname, password, email } = req.body;

    /* 
      How do we error handle two different async functions with one catch block?
    */
    //hash pw
    const hashedPW = await bcrypt.hash(password, 10);
    // console.log(hashedPW);
    const sqlQuery = `
      INSERT INTO users (fullname, password, email) 
      VALUES (${fullname}, ${password}, ${email});`;
    
    console.log('querying the database');
    const createdUser = await User.query(sqlQuery);
    console.log('finished querying the database'); 
    console.log(createdUser);
    
    res.locals.newUser = createdUser;
    console.log('were going back to the router');
    next();
  }
  catch (err) {
    next ('global error handler')
  }
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {

};


module.exports = userController;
