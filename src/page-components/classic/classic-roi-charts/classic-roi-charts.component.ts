import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { GameEngineData } from '../../../services/game-engine-data';

@Component({
  selector: 'classic-roi-charts',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './classic-roi-charts.component.html',
  styleUrl: './classic-roi-charts.component.scss'
})

export class ClassicRoiChartsComponent implements OnDestroy, OnInit {
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
  // selectedPlayer$: BehaviorSubject<string>; 
  // undateChartRange$: BehaviorSubject<number> = new BehaviorSubject<number>(15);
  // winningChartdata$: Observable<WinningsChartData>;
  // playerAndRange$: Observable<any>
  private destroy$ = new Subject();
  
  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    public gameData: GameEngineData,
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.emailjs.setPreviousScreen$.next('Classic ROI Charts');
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.activeHandle = this.handles[0];
    // This data would ideally come from indexDB, but for now is held in the browsers memory for now
    setTimeout(() => { this.gameData.records$
      .pipe(
        map(rs => rs.map(r => r.players)),
        map(playerRecords => {
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
          return psResult;
        })
      )
      .subscribe(data => {
        this.handles.forEach(h => {
          const labels = this.getLabels(data[h]);
          this.chartData[h] = {
            labels,
            totalWinningData: this.getTotalWinningData(data[h], labels),
            averageWinningData: this.getAverageWinningData(data[h], labels),
            roiWinningData: this.getRoiWinningData(data[h], labels),
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

  getLabels(data, range: number = 12): string[] {
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

  // ngOnInit(): void {
  //   this.selectedPlayer$ = new BehaviorSubject<string>(this.handles[0]);
    
  //   Chart.register(...registerables);
  //   this.winningChartdata$ = this.history$.pipe(map((history) => {
  //     let data: WinningsChartData = {}
  //     this.handles.forEach(h => data[h] = {});
  //     history.forEach(record => {
  //       this.handles.forEach(handle => {
  //         const playerData = record.players.find(p => p.handle === handle);
  //         if(playerData) {
  //           if(!data[playerData?.handle][playerData.beginningTrueCount.toString()]) {
  //             data[playerData?.handle][playerData.beginningTrueCount.toString()] = { 
  //               totalBet: 0, 
  //               totalWon: 0, 
  //               instances: 0 
  //             }
  //           }
  //           const spots: SpotRecord[] = record.spots.filter(s => !!s).filter(s => s.playerHandle === handle);
  //           data[playerData.handle][playerData.beginningTrueCount.toString()] = 
  //           this.updateWinnings(data[playerData.handle][playerData.beginningTrueCount.toString()], spots);
  //         }
  //       })
  //     })
  //     return data
  //   }), take(1)),


  //   combineLatest([this.winningChartdata$, this.selectedPlayer$, this.undateChartRange$])
  //     .subscribe(([data, player, range]) => {
  //       const labels: string[] = this.getLabels(data[player], range);
  //       const totalWinningData = this.getTotalWinningData(data[player], labels, player);
  //       const averageWinningData = this.getAverageWinningData(data[player], labels, player);
  //       const roiWinningData = this.getRoiWinningData(data[player], labels, player);
  //       this.totalWinningsByCountChart = 
  //       this.createTotalWinningsByCountChart(totalWinningData, labels, player);
  //       this.averageWinningsByCountChart = 
  //         this.createAverageWinningsByCountChart(averageWinningData, labels, player);
  //       this.roiByCountChart = 
  //         this.createRoiByCountChart(roiWinningData, labels, player);
  //     })
  // }

  // updateWinnings(datum: WinningsChartDatum, spots: SpotRecord[]): WinningsChartDatum {
  //   let totalBet = 0;
  //   let totalWon = 0;
  //   spots.forEach(s => s.hands.forEach(h => {
  //     totalBet += h.betAmount;
  //     totalWon += h.winnings;
  //   }))
  //   return { 
  //     totalBet: datum.totalBet + totalBet, 
  //     totalWon: datum.totalWon + totalWon, 
  //     instances: datum.instances + 1 }
  // }

  // getLabels(data, range): string[] {
  //   return Object.keys(data)
  //     .map(l => parseInt(l))
  //     .sort((a, b) => a - b)
  //     .filter(x => (x >= (-1) * range) && (x <= range))
  //     .map(l => `${l.toString()} : ${ data[l.toString()].instances }`);
  // }

  // getTotalWinningData(data, labels, target: string): number[] {
  //   return labels.map(l => data[l.split(' : ')[0]].totalWon)
  // }

  // getAverageWinningData(data, labels, target: string): number[] {
  //   return labels.map(l => data[l.split(' : ')[0]].totalWon / data[l.split(' : ')[0]].instances)
  // }

  // getRoiWinningData(data, labels, target: string): number[] {
  //   return labels.map(l => Math.round((data[l.split(' : ')[0]].totalWon * 1000 / data[l.split(' : ')[0]].totalBet)) / 10)
  // }

  // createTotalWinningsByCountChart(data, labels: string[], target: string): Chart {
  //   if(this.totalWinningsByCountChart) {
  //     this.totalWinningsByCountChart.destroy();
  //   }
  //   const ctx = document.getElementById('total-winnings-chart');

  //   return new Chart(ctx as ChartItem , {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: `${target}'s Total Winning Chart`,
  //         data: data,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         x: { 
  //           grid: { 
  //             drawOnChartArea: false 
  //           } 
  //         },
  //         y: {
  //           beginAtZero: false,
  //           grid: { 
  //             drawOnChartArea: false 
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // createAverageWinningsByCountChart(data, labels: string[], target: string): Chart {
  //   if(this.averageWinningsByCountChart) {
  //     this.averageWinningsByCountChart.destroy();
  //   }
  //   const ctx = document.getElementById('average-winnings-chart');

  //   return new Chart(ctx as ChartItem , {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: `${target}'s Average Winning Chart`,
  //         data: data,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         x: { 
  //           grid: { 
  //             drawOnChartArea: false 
  //           } 
  //         },
  //         y: {
  //           beginAtZero: false,
  //           grid: { 
  //             drawOnChartArea: false 
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // createRoiByCountChart(data, labels: string[], target: string): Chart {
  //   if(this.roiByCountChart) {
  //     this.roiByCountChart.destroy();
  //   }
  //   const ctx = document.getElementById('roi-chart');

  //   return new Chart(ctx as ChartItem , {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: `${target}'s Roi Chart`,
  //         data: data,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         x: { 
  //           grid: { 
  //             drawOnChartArea: false 
  //           } 
  //         },
  //         y: {
  //           beginAtZero: false,
  //           grid: { 
  //             drawOnChartArea: false 
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // handleSelectHandle({ target }) {
  //   this.selectedPlayer$.next(target.value);
  // }

  // updateChartRange({ target }) {
  //   this.undateChartRange$.next(target.value);
  // }
  
  // ngOnDestroy() {
  //   this.destroy$.next(true);
  // }