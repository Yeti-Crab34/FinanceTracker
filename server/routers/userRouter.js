const express = require('express');
const userRouter = express.Router();


const userController = require('../controllers/userController');

userRouter.post('/signup', userController.createUser, (req, res) => {
    // TO DO REDIRECT TO DASHBOARD PAGE
    return res.status(200).send('Created new user!').json();
});

userRouter.post('/login', userController.verifyUser, (req, res) => {
    // TO DO REDIRECT TO DASHBOARD PAGE
    return res.send('found user!');
});


module.exports = userRouter;