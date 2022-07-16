const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

userRouter.post('/signup', 
    userController.createUser, 
    cookieController.setUserSSIDCookie, (req, res) => {
        // TO DO REDIRECT TO DASHBOARD PAGE
        return res.status(200).send(true).json();
});

userRouter.post('/login', 
    userController.verifyUser, 
    cookieController.setUserSSIDCookie, (req, res) => {
        // TO DO REDIRECT TO DASHBOARD PAGE
        return res.status(200).send(true).json();
});

userRouter.get('/info', userController.getUser, (req, res) => {
    return res.status(200).send(); // wait
});


module.exports = userRouter;