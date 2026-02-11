import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { DuGameEngineData } from '../../../services/du-game-engine-data';

@Component({
  selector: 'doubleup-roi-charts',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './doubleup-roi-charts.component.html',
  styleUrl: './doubleup-roi-charts.component.scss'
})

export class DoubleupRoiChartsComponent implements OnDestroy, OnInit {
  handles: string[];
  activeHandle: string;
  chartData: {
    [k: string]: {
      labels: string[], 
      totalWinningData: any,
      averageWinningData: any, 
      roiWinningData: any
    }
  } = {};
  totalWinningsByCountChart: Chart;
  averageWinningsByCountChart: Chart;
  roiByCountChart: Chart;
  undateChartRange$: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private destroy$ = new Subject();
  
  constructor(
    private router: Router,
    public gameData: DuGameEngineData,
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.activeHandle = this.handles[0];
    setTimeout(() => { combineLatest([this.gameData.records$, this.undateChartRange$])
      .pipe(
        map(([rs, range]) => ({playerRecords: rs.map(r => r.players), range})),
        map(({ playerRecords, range }) => {
          let psResult = {};
          this.handles.forEach(h => psResult[h] = {});
          playerRecords.forEach(r => r.forEach(p => {
            if(!psResult[p.handle][p.beginningTrueCount]) {
              psResult[p.handle][p.beginningTrueCount] = {
                totalBet: 0,
                totalWon: 0, 
                instances: 0,
              };
            }
            psResult[p.handle][p.beginningTrueCount].totalBet += p.totalBet;
            psResult[p.handle][p.beginningTrueCount].totalWon += p.winnings;
            psResult[p.handle][p.beginningTrueCount].instances += 1;
          }))
          return { psResult, range };
        })
      )
      .subscribe(({ psResult, range }) => {
        this.handles.forEach(h => {
          const labels = this.getLabels(psResult[h], range);
          this.chartData[h] = {
            labels,
            totalWinningData: this.getTotalWinningData(psResult[h], labels),
            averageWinningData: this.getAverageWinningData(psResult[h], labels),
            roiWinningData: this.getRoiWinningData(psResult[h], labels),
          }
        });
        this.totalWinningsByCountChart = this.createTotalWinningsByCountChart(
          this.chartData[this.activeHandle].totalWinningData,
          this.chartData[this.activeHandle].labels
        );
        this.averageWinningsByCountChart = this.createAverageWinningsByCountChart(
          this.chartData[this.activeHandle].averageWinningData,
          this.chartData[this.activeHandle].labels
        );
        this.roiByCountChart = this.createRoiByCountChart(
          this.chartData[this.activeHandle].roiWinningData,
          this.chartData[this.activeHandle].labels
        );
      })
    });  
  }

  getLabels(data, range: number): string[] {
    return Object.keys(data)
      .map(l => parseInt(l))
      .sort((a, b) => a - b)
      .filter(x => (x >= (-1) * range) && (x <= range))
      .map(l => `${l.toString()} : ${ data[l.toString()].instances }`);
  }

  getTotalWinningData(data, labels): number[] {
    return labels.map(l => data[l.split(' : ')[0]].totalWon)
  }

  getAverageWinningData(data, labels): number[] {
    return labels.map(l => data[l.split(' : ')[0]].totalWon / data[l.split(' : ')[0]].instances)
  }

  getRoiWinningData(data, labels): number[] {
    return labels.map(l => Math.round((data[l.split(' : ')[0]].totalWon * 1000 / data[l.split(' : ')[0]].totalBet)) / 10)
  }

  createTotalWinningsByCountChart(data, labels: string[]): Chart {
    if(this.totalWinningsByCountChart) {
      this.totalWinningsByCountChart.destroy();
    }
    const ctx = document.getElementById('total-winnings-chart');

    return new Chart(ctx as ChartItem , {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `${this.activeHandle}'s Total Winning Chart`,
          data: data,
          borderWidth: 1
        }]
      },
      options: {
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
        }
      }
    })
  }

  createAverageWinningsByCountChart(data, labels: string[]): Chart {
    if(this.averageWinningsByCountChart) {
      this.averageWinningsByCountChart.destroy();
    }
    const ctx = document.getElementById('average-winnings-chart');

    return new Chart(ctx as ChartItem , {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `${this.activeHandle}'s Average Winning Chart`,
          data: data,
          borderWidth: 1
        }]
      },
      options: {
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
        }
      }
    })
  }

  createRoiByCountChart(data, labels: string[]): Chart {
    if(this.roiByCountChart) {
      this.roiByCountChart.destroy();
    }
    const ctx = document.getElementById('roi-chart');

    return new Chart(ctx as ChartItem , {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `${this.activeHandle}'s Roi Chart`,
          data: data,
          borderWidth: 1
        }]
      },
      options: {
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
        }
      }
    })
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  handleSelectHandle({ target }) {
    this.activeHandle = target.value;
    this.totalWinningsByCountChart = this.createTotalWinningsByCountChart(
      this.chartData[this.activeHandle].totalWinningData,
      this.chartData[this.activeHandle].labels
    );
    this.averageWinningsByCountChart = this.createAverageWinningsByCountChart(
      this.chartData[this.activeHandle].averageWinningData,
      this.chartData[this.activeHandle].labels
    );
    this.roiByCountChart = this.createRoiByCountChart(
      this.chartData[this.activeHandle].roiWinningData,
      this.chartData[this.activeHandle].labels
    );
  }

  updateChartRange({ target }) {
    console.log(target.value);
    this.undateChartRange$.next(target.value);
  }

  ngOnDestroy(): void {
    if(this.totalWinningsByCountChart) {
      this.totalWinningsByCountChart.destroy();
    }
    if(this.averageWinningsByCountChart) {
      this.averageWinningsByCountChart.destroy();
    }
    if(this.roiByCountChart) {
      this.roiByCountChart.destroy();
    }
  }
}