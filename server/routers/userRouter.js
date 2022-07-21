const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const income_expenseController = require('../controllers/income_expenseController');

userRouter.post(
  '/signup',
  userController.createUser,
  cookieController.setUserSSIDCookie,
  (req, res) => {
    return res.status(200).send(true).json();
  }
);

userRouter.post(
  '/login',
  userController.verifyUser,
  cookieController.setUserSSIDCookie,
  (req, res) => {
    return res.status(200).send(true).json();
  }
);

userRouter.get('/info', income_expenseController.getUser, (req, res) => {
  return res.status(200).send(res.locals);
});

userRouter.post(
  '/addExpense',
  income_expenseController.addExpense,
  (req, res) => {
    return res.status(200).send('success');
  }
);

userRouter.post(
  '/addIncome',
  income_expenseController.addIncome,
  (req, res) => {
    return res.status(200).send('success');
  }
);

userRouter.patch(
  '/updateIncome/:itemID',
  income_expenseController.updateIncome,
  (req, res) => {
    return res.status(200).send('success');
  }
);

userRouter.patch(
  '/updateExpense/:itemID',
  income_expenseController.updateExpense,
  (req, res) => {
    return res.status(200).send('success');
  }
);

userRouter.delete(
  '/removeIncome/:id',
  income_expenseController.removeIncome,
  (req, res) => {
    return res.status(200).send('success');
  }
);

userRouter.delete(
  '/removeExpense/:id',
  income_expenseController.removeExpense,
  (req, res) => {
    return res.status(200).send('success');
  }
);

module.exports = userRouter;
