import React, {useEffect, useState} from 'react';
import { Chart, Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';


const DoughnutComponent = ({totalIncomes, totalExpenses}) => {


  return (
    <div className="chartWrapper">
    <Doughnut data = {{
    labels: ['Total Income', 'Total Expenses'],
    datasets: [{
        backgroundColor: ['#65E564', '#EE3F53'],
        hoverBackground: ['#51fc59', '#f54545'],
        data: [totalIncomes, totalExpenses]
    }],  
    }}
    options={{
        title:{
            display: true,
            text: 'Net',
            fontSize: 26,                            
        },
        legend: {
            display: true,
            position: 'left',
        },
        aspectRatio: 1,
        responsive: true,
    }}>
    </Doughnut>
</div>
  )
}

export default DoughnutComponent;