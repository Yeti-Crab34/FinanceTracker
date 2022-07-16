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
      VALUES ($1, $2, $3);`;
    
    const createdUser = await User.query(sqlQuery, params);
    next();
  }
   /* 
      How do we error handle two different async functions with one catch block?
    */
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

    const sqlQuery = `SELECT * FROM users WHERE email='${email}';`

    const verifiedUser = await User.query(sqlQuery);
    if (verifiedUser.rows.length === 0) {
      console.log('Wrong email/password'); 
      res.redirect(400, '/');
    }
    else {
      const verifyPW = await bcrypt.compare(password, verifiedUser.rows[0].password)
      if (verifyPW) {
        console.log('verified user');
        next();
      }// TO DO else redirect to sign up page
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


module.exports = userController;


