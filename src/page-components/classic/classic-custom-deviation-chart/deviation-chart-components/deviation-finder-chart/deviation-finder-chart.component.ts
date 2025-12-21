import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, ChartItem, registerables } from 'chart.js';
// import { ChartDataSet } from '../../../../../../src/models';

@Component({
  selector: 'deviation-finder-chart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deviation-finder-chart.component.html',
  styleUrl: './deviation-finder-chart.component.scss'
})

export class DeviationChartFinderComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() activeF2C: string;
  @Input() chartData: any;
  charts: {
    '2': Chart,
    '3': Chart,
    '4': Chart,
    '5': Chart,
    '6': Chart,
    '7': Chart,
    '8': Chart,
    '9': Chart,
    '10': Chart,
    'A': Chart,
  } = {
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
    '10': null,
    'A': null,
  };
  tippedAway: number = 0;
  minAllowableCount: number = -15;
  maxAllowableCount: number = 15;
  borderColorMap = { 
    'double': 'rgba(26, 44, 201, .8)',
    'hit': 'rgba(227, 32, 42, .8)',
    'stay': 'rgba(13, 128, 9, .8)',
    'split': 'rgba(245, 192, 34, .8)',
  };
  backgroundColorMap = { 
    'double': 'rgba(26, 44, 201, .2)', 
    'hit': 'rgba(227, 32, 42, .2)', 
    'stay': 'rgba(13, 128, 9, .2)', 
    'split': 'rgba(245, 192, 34, .2)', 
  };
  playerFirst2 = {
    splittable: ['AA', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'],
    soft: ['AT', 'A9', 'A8', 'A7', 'A6', 'A5', 'A4', 'A3', 'A2'],
    hard: ['20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5'],
  };
  chartKeys = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  blackListedActions: string[] = [];
  removeActionButtonLabels = {
    'double': 'Remove Double', 
    'hit': 'Remove Hit',
    'stay': 'Remove Stay',
    'split': 'Remove Split',
  };
  isSplittable: boolean;
  
  constructor() {}

  ngOnInit(): void {
    const f2cRay: string[] = this.activeF2C.split('');
    Chart.register(...registerables); 
    this.isSplittable = f2cRay.length === 2 && f2cRay[0] === f2cRay[1] && this.activeF2C !== '11';
  }

  ngAfterViewInit(): void {
    this.createCharts();  
  }

  createCharts() {
    this.chartKeys.forEach(key => {
      if(this.charts[key]) {
        this.charts[key].destroy();
      }
      let labels: string[] = Object.keys(this.chartData[this.activeF2C][key])
        .map(l => parseFloat(l))
        .filter(l => l <= this.maxAllowableCount && l >= this.minAllowableCount)
        .sort((a, b) =>  a - b)
        .map(l => l.toString());
      const datasets = this.getDataSet(labels, key);
      const ctx: HTMLElement = document.getElementById(`chart-${key}`);
      this.charts[key] = new Chart(ctx as ChartItem , {
        type: 'bar',
        data: { labels, datasets },
        options: {
          interaction: {
            mode: 'x', 
            intersect: true,
          },
          scales: {
            x: { 
              grid: { 
                drawOnChartArea: false 
              } 
            },
            y: {
              beginAtZero: false,
              grid: { 
                drawOnChartArea: false 
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: ctx => {
                  return this.chartData[this.activeF2C][key][ctx.label][ctx.dataset.label].instances + ' times : ' + ctx.formattedValue;
                }
              }
            }
          }
        }
      })
    })
  }

  getDataSet(labels, upCard: string) {
    let dataSets = [];
    let actions = ['double', 'hit', 'stay'];
    let dataSetObj = {'double': [], 'hit': [], 'stay': []};
    if(this.isSplittable) {
      actions.push('split');
      dataSetObj['split'] = [];
    }
    actions = actions.filter(a => !this.blackListedActions.includes(a));
    actions.forEach(action => {
      let instances = 0;
      labels.forEach(l => {
        const numerator = this.chartData[this.activeF2C][upCard][l][action].totalWon;
        const denominator = this.chartData[this.activeF2C][upCard][l][action].instances;
        instances += denominator;
        dataSetObj[action].push(Math.round((numerator * 100)/denominator)/100);
      });
      dataSets.push({
        data: dataSetObj[action],
        label: `${action}`,
        backgroundColor: this.backgroundColorMap [action],
        borderColor: this.borderColorMap[action],
        borderWidth: 1,
      });
    });

    return dataSets;
  }

  removeAction(action: string) {
    if(this.blackListedActions.includes(action)) {
      this.blackListedActions = this.blackListedActions.filter(a => a !== action);
      this.removeActionButtonLabels[action] = this.removeActionButtonLabels[action].replace('Include','Remove');
    } else {
      this.blackListedActions.push(action);
      this.removeActionButtonLabels[action] = this.removeActionButtonLabels[action].replace('Remove','Include');
    }
    this.createCharts();
  }
  
  eraseChartKey(activeF2C: string) {
    console.log('This will erase all the data for', activeF2C);
  }

  eraseUpcardData(activeF2C: string, upCard: string) {
    console.log('This will erase all the data for', activeF2C, 'against', upCard);
  }

  setActiveF2C(f2c: string) {
    this.activeF2C = f2c;
    this.createCharts()
  }

  filterCountLabels() {
    this.createCharts();
  }

  ngOnDestroy(): void {
    this.chartKeys.forEach(key => {
      if(this.charts[key]) {
        this.charts[key].destroy();
      }
    })
  }
}