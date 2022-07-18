const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');


userRouter.post('/signup', 
    userController.createUser, 
    cookieController.setUserSSIDCookie, (req, res) => {
    console.log('done with middleware chain, about to send response to frontend');
    return res.status(200).send(true).json();
});

userRouter.post('/login', 
    userController.verifyUser, 
    cookieController.setUserSSIDCookie, (req, res) => {
        return res.status(200).send(true).json();
});

userRouter.get('/info', (req, res, next) => {console.log(req.query.user_id); return next()}, userController.getUser, (req, res) => {

    return res.status(200).send(res.locals); 
});

userRouter.post('/addExpense', userController.addExpense, (req, res) => {
    console.log('add expense successful on backend');
    return res.status(200).send('success'); 
});

userRouter.post('/addIncome', userController.addIncome, (req, res) => {
    return res.status(200);
})


module.exports = userRouter;