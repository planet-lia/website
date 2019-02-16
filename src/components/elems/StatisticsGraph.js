import React from 'react';
import { Line } from 'react-chartjs-2';

const StatisticsGraph = (props) => {

  const chartOptions = {
      scales: {
          xAxes: [{
              type: 'time',
              distribution: 'linear',
              time: {
                  displayFormats: {
                      'millisecond': 'SSS',
                      'second': 'SSS',
                      'minute': 'SSS',
                      'hour': 'SSS',
                      'day': 'SSS',
                      'week': 'SSS',
                      'month': 'SSS',
                      'quarter': 'SSS',
                      'year': 'SSS',
                  }
              }
          }]
      }
  };

  return (
    <div>
      <h4>{props.title}</h4>
      <Line
        data={
          props.data
            ? props.data
            : {}
        }
        options={chartOptions}
      />
    </div>
  )
}

export default StatisticsGraph;
