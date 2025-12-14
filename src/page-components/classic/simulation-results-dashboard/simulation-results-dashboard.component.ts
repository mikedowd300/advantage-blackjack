import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, last, map, Subject, tap } from 'rxjs';
import { GameEngineData } from '../../../services/game-engine-data';
import { WinRateInfo, WinRateByBettingUnit, PlayersWinRateByBettingUnit } from '../../../models';
import { ABJSimDetailsComponent } from '../../../shared-components/abj-sim-details/abj-sim-details.component';
import { ABJAccordionComponent } from '../../../shared-components/abj-accordion/abj-accordion.component';
import { ABJHourlyWinRateComponent } from '../../../shared-components/abj-hourly-win-rate/abj-hourly-win-rate.component';

@Component({
  selector: 'simulation-results-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ABJSimDetailsComponent,
    ABJAccordionComponent,
    ABJHourlyWinRateComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './simulation-results-dashboard.component.html',
  styleUrl: './simulation-results-dashboard.component.scss'
})

export class ClassicSimulationResultsDashboardComponent implements OnInit {
  handles: string[];
  activeHandle: string;
  tippedAway: number = 0;
  bankrollData: { [k: string]: number[] }  = {};
  showChart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ctx: HTMLElement = null;
  playerResults = null;
  playersWinRateByBettingUnit: PlayersWinRateByBettingUnit = {};
  
  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    public gameData: GameEngineData,
  ) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Simulation Results');
    this.handles = this.gameData.playerInfo.map(p => p.playerConfigTitle);
    this.activeHandle = this.handles[0]; 

    this.gameData.playerResults$.pipe(filter(x => !!x)).subscribe(results => {
      this.playerResults = results;
    });

    this.handles.forEach(h => this.playersWinRateByBettingUnit[h] = {
      winRateByBettingUnit: {},
      chartKeys: []
    })

    this.gameData.records$
      .pipe(map(rs => rs.map(r => r.players)))
      .subscribe(playerLists => {
        playerLists.forEach(listItem => listItem.forEach(({ handle, bettingUnit, winnings }) => {
          if(!this.playersWinRateByBettingUnit[handle].winRateByBettingUnit[bettingUnit]) {
            this.playersWinRateByBettingUnit[handle].winRateByBettingUnit[bettingUnit] = {
              roundsPlayed: 0,
              winnings: 0,
            }
          }
          this.playersWinRateByBettingUnit[handle].winRateByBettingUnit[bettingUnit].roundsPlayed += 1;
          this.playersWinRateByBettingUnit[handle].winRateByBettingUnit[bettingUnit].winnings += winnings;
        }));
        this.handles.forEach(h => this.playersWinRateByBettingUnit[h].chartKeys = Object.keys(this.playersWinRateByBettingUnit[h].winRateByBettingUnit));
      });  
  }

  handleSelectHandle({ target }) {
    this.activeHandle = target.value;
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }
}