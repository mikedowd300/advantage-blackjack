import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { GameEngineData } from '../../../services/game-engine-data';
import { ChartDataSet } from '../../../models';

@Component({
  selector: 'classic-bankroll-chart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './classic-bankroll-chart.component.html',
  styleUrl: './classic-bankroll-chart.component.scss'
})

export class ClassicBankrollChartComponent implements OnDestroy, OnInit {
  handles: string[];
  chart: Chart;
  isZoomMode: boolean = false;
  zoomIndices: number[] = [];
  zoomOffset: number = 0;
  chartData: any;
  tippedAway: number = 0;
  bankrollData: { [k: string]: number[] }  = {};
  showChart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ctx: HTMLElement = null;
  chartDataInterval: number;
  isChecked: { [k: string]: boolean } = {};
  longestDataList: number = 0
  borderColors: string[] = ['blue', 'red', 'green', 'purple', 'yellow', 'orange', 'black', 'pink', 'brown'];
  activeHandles: string[] = [];
  
  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    public gameData: GameEngineData,
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.emailjs.setPreviousScreen$.next('Classic Simulation Results');
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.handles.forEach(h => this.bankrollData[h] = []);
    this.handles.forEach(h => this.isChecked[h] = this.handles[0] === h);
    this.activeHandles = [this.handles[0]];
    this.ctx = document.getElementById('myChart');
    setTimeout(() => {
      this.gameData.records$
        .pipe(map(rs => rs.map(r => r.players)))
        .subscribe(playerLists => {
          playerLists.forEach(list => list.forEach(p => this.bankrollData[p.handle].push(p.beginningBankroll)));
          this.longestDataList = Math.max(...this.handles.map(h => this.bankrollData[h].length));
          this.getChartDataInterval(this.longestDataList);
          this.chart = this.createBankrollChart();
        });
    })   
  }

  createBankrollChart(expectData: boolean = true): Chart {
    if(this.chart) {
      this.chart.destroy();
    }
    const datasets: ChartDataSet[] = this.activeHandles.map(h => ({
      label: `${h}'s Bankroll`,
      data: expectData ? this.setIntervals(this.bankrollData[h]) : [],
      borderWidth: 1,
      borderColor: this.borderColors[this.handles.indexOf(h)],
    }))
    const labels: string[] = datasets[0].data.map((d, i) => (i * this.chartDataInterval).toString());

    return new Chart(this.ctx as ChartItem , {
      type: 'line',
      data: { labels, datasets },
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

  private getChartDataInterval(listLength: number) {
    if(listLength >= 1000000 ) {
      this.chartDataInterval = 100;
    } else if(listLength >= 100000) {
      this.chartDataInterval = 10;
    } else {
      this.chartDataInterval = 1;
    }
  }
          
  private setIntervals(list: any[]): any[] {
    let shortList: string[] = [];
    let currentIndex: number = 0;
    let x = 0;

    while(list[currentIndex]) {
      shortList.push(list[currentIndex]);
      currentIndex += this.chartDataInterval;
      x += 1;
    }
    if(list.length - 1 % this.chartDataInterval !== 0) {
      shortList.push(list[list.length - 1]);
    }
    return shortList;
  }

  onCanvasClick(event) {
    const res = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true );
    if (res.length === 0) {
      return;
    }

    const index = res[0].index * this.chartDataInterval;
    console.log(res[0], index);

    if(this.isZoomMode) {
      this.zoomIndices.push(index);
      if(this.zoomIndices.length === 2) {
        this.zoomIndices.sort((a, b) => a - b);
        this.zoomOffset += this.zoomIndices[0]; 
        this.handles.forEach(
          h => this.bankrollData[h] = this.bankrollData[h].slice(this.zoomIndices[0], this.zoomIndices[1] + 1)
        );
        const listLength = this.zoomIndices[1] - this.zoomIndices[0];
        this.getChartDataInterval(listLength);
        this.chart = this.createBankrollChart();
        this.isZoomMode = false;
        this.zoomIndices = [];
      }
    } else {
      this.gameData.replayHandAtIndex$.next(index + this.zoomOffset - 1);
      this.router.navigate(['classic/hand-review']);
    }
  }

  setZoomMode() {
    this.isZoomMode = true;
  }

  handleHandleSelection(handle: string) {
    if(handle === 'all') {
      this.handles.forEach(h => this.isChecked[h] = true)
    } else {
      this.isChecked[handle] = !this.isChecked[handle];
    }
    this.activeHandles = Object.keys(this.isChecked).filter(h => this.isChecked[h]);
    setTimeout(() => this.chart = this.createBankrollChart());
  }

  // private sumHandWinnings(hands: any[]): number {
  //   let winnings = 0;
  //   hands.forEach(h => winnings += h.winnings);
  //   return winnings;
  // }

  // private sumMonetBet(hands: any[]): number {
  //   let totalBet = 0;
  //   hands.forEach(h => totalBet += h.betAmount);
  //   return totalBet;
  // }

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    if(this.chart) {
      this.chart.destroy();
    }
  }
}