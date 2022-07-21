import React, {useEffect, useState} from 'react';
import { Line, Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';


const LineComponent = ({incomesList, totalExpenses}) => {
  console.log(incomesList[0].value)


  return (
    <div className="chartWrapper">
    <Line data = {{
    labels: ['Jan', 'Feb', 'March'],
    datasets: [{
        data: [parseInt(incomesList[0].value), parseInt(incomesList[1].value), parseInt(incomesList[2].value)]
    }],  
    }}>
    </Line>
</div>
  )
}

export default LineComponent;