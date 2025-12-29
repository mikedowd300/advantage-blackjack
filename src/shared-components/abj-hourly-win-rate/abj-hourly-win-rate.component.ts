import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayersWinRateByBettingUnit } from '../../models';

@Component({
  selector: 'abj-hourly-win-rate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-hourly-win-rate.component.html',
  styleUrl: './abj-hourly-win-rate.component.scss'
})
export class ABJHourlyWinRateComponent implements OnInit {
  @Input() activeHandle: string;
  @Input() handles: string[];
  @Input() playersWinRateByBettingUnit: PlayersWinRateByBettingUnit;

  roundsPerHour: number = 65;
  enhancedPlayersWinRate: PlayersWinRateByBettingUnit = {};

  constructor() {}

  ngOnInit(): void {
    this.handles.forEach(h => this.enhancedPlayersWinRate[h] = {
      winRateByBettingUnit: { ...this.playersWinRateByBettingUnit[h].winRateByBettingUnit },
      chartKeys: [ ...this.playersWinRateByBettingUnit[h].chartKeys ],
    })
    this.updateWinRateByBettingUnit();
  }

  updateWinRateByBettingUnit() {
    this.handles.forEach(h => {
      this.playersWinRateByBettingUnit[h].chartKeys.forEach(key => {
        const hours: number = Math.round(100 * this.enhancedPlayersWinRate[h].winRateByBettingUnit[key].roundsPlayed / this.roundsPerHour) / 100;
        const averagePerHour = Math.round(100 * this.enhancedPlayersWinRate[h].winRateByBettingUnit[key].winnings / hours) / 100;
        this.enhancedPlayersWinRate[h].winRateByBettingUnit[key] = { ...this.enhancedPlayersWinRate[h].winRateByBettingUnit[key], average: averagePerHour, hoursPlayed: hours };
      })
    })
  }
}