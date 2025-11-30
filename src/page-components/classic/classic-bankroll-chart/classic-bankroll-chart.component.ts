import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { GameEngineData } from '../../../services/game-engine-data';

@Component({
  selector: 'classic-bankroll-chart',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './classic-bankroll-chart.component.html',
  styleUrl: './classic-bankroll-chart.component.scss'
})

export class ClassicBankrollChartComponent implements OnDestroy, OnInit {
  handles: string[];
  activeHandle: string;
  chart: Chart;
  isZoomMode: boolean = false;
  zoomIndices: number[] = [];
  zoomOffset: number = 0;
  chartData: any;
  tippedAway: number = 0;
  bankrollData: { [k: string]: number[] }  = {};
  showChart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ctx: HTMLElement = null;
  playerResults = null;
  
  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    public gameData: GameEngineData,
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.emailjs.setPreviousScreen$.next('Classic Simulation Results');
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.activeHandle = this.handles[0];
    this.handles.forEach(h => this.bankrollData[h] = []);
    this.ctx = document.getElementById('myChart');
    this.gameData.playerResults$.pipe(filter(x => !!x)).subscribe(results => {
      this.playerResults = { ...results };
      console.log(this.playerResults);
    });
    // This data would ideally come from indexDB, but for now is held in the browsers memory for now
    setTimeout(() => {
      this.gameData.records$
        .pipe(map(rs => rs.map(r => r.players)))
        .subscribe(playerLists => {
          playerLists.forEach(list => list.forEach(p => this.bankrollData[p.handle].push(p.beginningBankroll)));
          this.chart = this.createBankrollChart();
          console.log(this.bankrollData);
        });
    })   
  }

  createBankrollChart(expectData: boolean = true): Chart {
    if(this.chart) {
      this.chart.destroy();
    }
    const data = expectData ? this.bankrollData[this.activeHandle] : [];
    const labels: string[] = data.map((d, i) => i.toString());

    return new Chart(this.ctx as ChartItem , {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${this.activeHandle}'s Bankroll`,
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

  onCanvasClick(event) {
    const res = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true );
    if (res.length === 0) {
      return;
    }

    if(this.isZoomMode) {
      this.zoomIndices.push(res[0].index);
      if(this.zoomIndices.length === 2) {
        this.zoomIndices.sort((a, b) => a - b);
        this.zoomOffset += this.zoomIndices[0]; 
        this.handles.forEach(
          h => this.bankrollData[h] = this.bankrollData[h].slice(this.zoomIndices[0], this.zoomIndices[1] + 1)
        );
        this.chart = this.createBankrollChart();
        this.isZoomMode = false;
        this.zoomIndices = [];
      }
    } else {
      this.gameData.replayHandAtIndex$.next(res[0].index + this.zoomOffset);
      this.router.navigate(['classic/hand-review']);
    }
  }

  setZoomMode() {
    this.isZoomMode = true;
  }

  handleSelectHandle({ target }) {
    this.activeHandle = target.value;
    setTimeout(() => this.chart = this.createBankrollChart());
  }

  private sumHandWinnings(hands: any[]): number {
    let winnings = 0;
    hands.forEach(h => winnings += h.winnings);
    return winnings;
  }

  private sumMonetBet(hands: any[]): number {
    let totalBet = 0;
    hands.forEach(h => totalBet += h.betAmount);
    return totalBet;
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    if(this.chart) {
      this.chart.destroy();
    }
  }
}