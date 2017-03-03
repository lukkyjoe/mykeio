import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import styles from './ChartView.css';

class ChartView extends Component {
  constructor(props) {
    super(props);
  } 
  componentDidUpdate() {
    if (this.props.roomData.prompts) {
      // var promptLabel = 
      // var promptData = 
      var promptChart = new Chart(this.refs.promptChartRef, {
        type: 'bar',
        data: {
          labels: [this.props.roomData.prompts[0].choices[0].choice],
          datasets: [{
            label: '# of Submissions',
            data: [this.props.roomData.prompts[0].choices[0].tally],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }

  render() {
    console.log('THIS IS THE room DATA', this.props.roomData);
    return (
      <div className={styles.chartContainer}>
        <canvas ref="promptChartRef" id="promptChart"></canvas>
      </div>
    );
  }
}

export default ChartView;