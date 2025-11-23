import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { GameEngineData } from '../../../services/game-engine-data';

@Component({
  selector: 'classic-simulation-results',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './classic-simulation-results.component.html',
  styleUrl: './classic-simulation-results.component.scss'
})

export class ClassicSimulationResultsComponent implements OnDestroy, OnInit {
  handles: string[];
  activeHandle: string;
  chart: Chart;
  moneyBetByPlayer: number;
  moneyWonByPlayer: number;
  roundsPlayedByPlayer: number;
  playersWinRate: number;
  playerStartingBankroll: number;
  playerEndingBankroll: number;
  isZoomMode: boolean = false;
  zoomIndices: number[] = [];
  zoomOffset: number = 0;
  chartData: any;
  tippedAway: number = 0;
  bankrollData: { [k: string]: number[] }  = {};
  showChart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ctx: HTMLElement = null;

  constructor(
    private emailjs: EmailjsService, 
    private gameData: GameEngineData,
    private router: Router,
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.emailjs.setPreviousScreen$.next('Classic Simulation Results');
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.activeHandle = this.handles[0];
    this.handles.forEach(h => this.bankrollData[h] = []);
    this.ctx = document.getElementById('myChart');
    // This data would ideally come from indexDB, but for now is held in the browsers memory for now
    setTimeout(() => {
    this.gameData.records$
      .pipe(map(rs => rs.map(r => r.players)))
      .subscribe(playerLists => {
        playerLists.forEach(list => list.forEach(p => this.bankrollData[p.handle].push(p.beginningBankroll)));
        this.chart = this.createBankrollChart();
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
    // this.getPlayersStats();
  }

  ngOnDestroy(): void {
    if(this.chart) {
      this.chart.destroy();
    }
  }
}

// export class BankrollChartComponent implements OnInit {
//   @Input() showBankrollChart$: BehaviorSubject<boolean>;
//   @Input() bankrollData: any;
//   @Input() replayHandAtIndex$: Subject<number>;

//   constructor(public vmService: ViewModelService) {}

//   ngOnInit(): void {
//     this.vmService.showHeader$.next(true);
//     this.chartData = { ...this.bankrollData };
//     this.handles = Object.keys(this.bankrollData);
//     this.activeHandle = this.handles[0];
//     Chart.register(...registerables);
//     this.chart = this.createBankrollChart();
//     this.getPlayersStats();
//   }

//   getPlayersStats() {
//     this.roundsPlayedByPlayer = this.chartData[this.activeHandle].bankroll.length;
//     this.playerStartingBankroll = this.chartData[this.activeHandle].bankroll[0];
//     this.playerEndingBankroll = this.chartData[this.activeHandle].bankroll[this.roundsPlayedByPlayer - 1];
//     this.moneyBetByPlayer = this.chartData[this.activeHandle].moneyBet;
//     this.moneyWonByPlayer = this.playerEndingBankroll - this.playerStartingBankroll;
//     this.playersWinRate = Math.round( (this.moneyWonByPlayer * 10000) / this.moneyBetByPlayer) / 100;
//   }
// }