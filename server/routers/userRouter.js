const express = require('express');
const userRouter = express.Router();


const userController = require('../controllers/userController');

userRouter.post('/signup', userController.createUser, (req, res) => {
    return res.send(res.locals.newUser).json();
});


userRouter.post('/login', userController.verifyUser, (req, res) => {

});


module.exports = userRouter;