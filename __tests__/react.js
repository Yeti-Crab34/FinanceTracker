import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

import app from '../client/react/App';
import dashboard from '../client/react/Dashboard';
import Expenses from '../client/react/Expenses';
import Incomes from '../client/react/Incomes';
import Login from '../client/react/Login'
import NavBar from '../client/react/NavBar'
import { Router } from 'express';
import { getElementAtEvent } from 'react-chartjs-2';
import Dashboard from '../client/react/Dashboard';


describe('Unit testing React components', () => {
  let text;
  describe('NavBar', () => {
    // let text;
    const props = {

    };

    // beforeAll(() => {
    //   const arg = NavBar();
    // });

    test('Links render in correctly',async () => {
      render(<NavBar/>,{wrapper: BrowserRouter});
      let myDiv = (await screen.getByTestId(4));
      expect(myDiv.firstChild.textContent).toEqual('Dashboard');
      expect(myDiv.nextSibling.firstChild.textContent).toEqual('Income');
      expect(myDiv.nextSibling.nextSibling.firstChild.textContent).toEqual('Expenses');
      expect(myDiv.nextSibling.nextSibling.nextSibling.firstChild.textContent).toEqual('Assets/Investments');
      expect(myDiv.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent).toEqual('Logout');
    });
  });

  describe('Dashboard', () => {
    // let text;
    const props = {

    };

    beforeAll(() => {
      text = render(<Dashboard/>,{wrapper: BrowserRouter});
    });

    test('Doughnut graph renders in correctly ',async () => {
      let myDiv = await document.getElementsByClassName('titleName');
      expect(myDiv[0]).toHaveTextContent('Finance Tracker');

      let myDiv2 = await screen.getByTestId('Doughnut');
      expect(myDiv2).toBeInTheDocument(); // true if program renders donught graph to page
      // console.log(await screen.getByText('Dashboard'));
    });
  });

  describe('Expenses', () => {
    // let text;
    const props = {
      user_id : 1
    };

    beforeAll(() => {
      text = render(<Expenses/>,{wrapper: BrowserRouter});
    });

    test('Expenses Renders in correctly',async () => {
      let expenseAmountDiv = await document.getElementsByClassName('expenseAmount');
      expect(expenseAmountDiv).toBeDefined();
    });

    // test('Expense calls setRec on Change', async () =>{
    //   //render expense component, pass in props, then fireEvent change, and expect fn to have ben called once toHaveBeenCalledTimes()
    // });
  });

  describe('Incomes', () => {
    // let text;
   

    beforeAll(() => {
      text = render(<Incomes/>,{wrapper: BrowserRouter});
    });

    test('Incomes Renders in correctly',async () => {
      let expenseRecDiv = await document.getElementById('expenseRec');
      expect(expenseRecDiv).toBeDefined();
    });

    // test('Incomes calls setRec on Change', async () =>{
    //   //render expense component, pass in props, then fireEvent change, and expect fn to have ben called once toHaveBeenCalledTimes()
    // });
  });

  describe('Login', () => {
    // let text;
   

    beforeAll(() => {
      text = render(<Login/>,{wrapper: BrowserRouter});
    });

    test('Login Renders in correctly',async () => {
      let emailDiv = await document.getElementById('email');
      expect(emailDiv).toBeInTheDocument();
    });

    // test('Incomes calls setRec on Change', async () =>{
    //   //render expense component, pass in props, then fireEvent change, and expect fn to have ben called once toHaveBeenCalledTimes()
    // });
  });


});
