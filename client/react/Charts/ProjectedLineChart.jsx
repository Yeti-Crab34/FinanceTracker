import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';


const ProjectedLineComponent = ({ incomesList, expensesList }) => {
  const [range, setRange] = useState('');


  let startSlice = 5;
  let endSlice = 10;

  switch (range) {
    case 'Day/Month': {
      startSlice = 5;
      endSlice = 10;
      break;
    }
    case 'Month': {
      startSlice = 5;
      endSlice = 7;
      break;
    }
    case 'Year': {
      startSlice = 0;
      endSlice = 4;
      break;
    }
    default: {
      startSlice = 5;
      endSlice = 10;
    }
  }

  const datesIncomes = new Set();
  const valuesIncomes = [];
  incomesList.forEach((n) => {
    if (datesIncomes.has(n.created.slice(startSlice, endSlice))) {
      valuesIncomes[valuesIncomes.length - 1] += Number(n.value.replace(/[^0-9.-]+/g, ''));
    } else {
      valuesIncomes.push(Number(n.value.replace(/[^0-9.-]+/g, '')));
    }
    datesIncomes.add(n.created.slice(startSlice, endSlice));
  })

  const datesExpenses = new Set();
  const valuesExpenses = [];
  expensesList.forEach((n) => {
    if (datesExpenses.has(n.created.slice(startSlice, endSlice))) {
      valuesExpenses[valuesExpenses.length - 1] += Number(n.value.replace(/[^0-9.-]+/g, ''));
    } else {
      valuesExpenses.push(Number(n.value.replace(/[^0-9.-]+/g, '')));
    }
    datesExpenses.add(n.created.slice(startSlice, endSlice));
  })

  const dates = new Set([...datesIncomes, ...datesExpenses]);
  console.log(dates)


  return (
    <div>
      <select onChange={(e) => { setRange(e.target.value) }}>
        <option value={'Day/Month'}>Day/Month</option>
        <option value={'Month'}>Month</option>
        <option value={'Year'}>Year</option>
      </select>
      <div className="chartWrapper">
        <Line data={
          {
          labels: [...dates].sort(),
          datasets: [{
            label: 'Incomes',
            data: valuesIncomes,
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            label: 'Expenses',
            data: valuesExpenses,
            backgroundColor: 'red',
            borderColor: 'red'
          }

          ]}
        }
        options={{
        title: {
          display: true,
          text: `Displaying the current ${range}`
          }
      }}>

      </Line>

      </div>
    </div>
  )
}

export default ProjectedLineComponent;