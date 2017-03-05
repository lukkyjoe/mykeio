import React, { Component } from 'react';
import Chart from 'chart.js';
import $ from 'jquery';
import styles from './ChartView.css';

class ChartView extends Component {
  constructor(props) {
    super(props);
  } 
  componentDidUpdate() {
    if (this.props.promptDisplay) {
      
      var promptLabels = this.props.promptDisplay.map((choice) => {
        return choice.choice;
      });

      var promptData = this.props.promptDisplay.map((choice) => {
        return choice.tally;
      });

      console.log('this are the prompt labelsxxxxxx', promptLabels);
      // var promptData = 
      var promptChart = new Chart(this.refs.promptChartRef, {
        type: 'bar',
        data: {
          labels: promptLabels,
          datasets: [{
            label: '# of Submissions',
            data: promptData,
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
    console.log('THIS IS THE PROMPT DISPLAY', this.props.promptDisplay);
    let correctAnswersArray = this.props.promptDisplay.filter((choice) => {
      return choice.correctAnswer === 'true';
    });
    let correctAnswers = correctAnswersArray.map((a, index) => {
      return (
        <div className={styles.answers} key={index}>
          {a.choice}
        </div>
      );
    });
    return (
      <div className={styles.chartContainer}>
        <canvas ref="promptChartRef" id="promptChart"></canvas>
        <br></br>
        <div className={styles.chartCard}>
          <p>
            Correct Answer{correctAnswers.length > 1 ? 's' : ''}:
            {[...correctAnswers]}
          </p>          
        </div>
      </div>
    );
  }
}

export default ChartView;