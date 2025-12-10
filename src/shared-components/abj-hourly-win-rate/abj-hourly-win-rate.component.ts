import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WinRateInfo, WinRateByBettingUnit, PlayersWinRateByBettingUnit } from '../../models';

@Component({
  selector: 'abj-hourly-win-rate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-hourly-win-rate.component.html',
  styleUrl: './abj-hourly-win-rate.component.scss'
})
export class ABJHourlyWinRateComponent implements OnChanges, OnInit {
  @Input() activeHandle: string;
  @Input() handles: string[];
  @Input() playersWinRateByBettingUnit: PlayersWinRateByBettingUnit;// = {
  //   'Mike': {
  //     winRateByBettingUnit: {
  //       '15': { roundsPlayed: 111234, winnings: -62045 },
  //       '30': { roundsPlayed: 111234, winnings: 2045 },
  //       '45': { roundsPlayed: 111234, winnings: 12045 },
  //       '75': { roundsPlayed: 111234, winnings: 92045 },
  //     },
  //     chartKeys: ['15', '30', '45', '75']
  //   },
  //   'Joe': {
  //     winRateByBettingUnit: {
  //       '10': { roundsPlayed: 111234, winnings: -12041 },
  //       '20': { roundsPlayed: 111234, winnings: 1041 },
  //       '40': { roundsPlayed: 111234, winnings: 10043 },
  //       '60': { roundsPlayed: 111234, winnings: 62042 },
  //     },
  //     chartKeys: ['10', '20', '40', '60']
  //   }
  // };

  roundsPerHour: number = 65;
  enhancedPlayersWinRate: PlayersWinRateByBettingUnit = {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.activeHandle, this.handles);
    this.handles.forEach(h => this.enhancedPlayersWinRate[h] = {
      winRateByBettingUnit: { ...this.playersWinRateByBettingUnit[h].winRateByBettingUnit },
      chartKeys: [ ...this.playersWinRateByBettingUnit[h].chartKeys ],
    })
    this.updateWinRateByBettingUnit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  updateWinRateByBettingUnit() {
    console.log(this.roundsPerHour);
    this.handles.forEach(h => {
      this.playersWinRateByBettingUnit[h].chartKeys.forEach(key => {
        const hours: number = Math.round(100 * this.enhancedPlayersWinRate[h].winRateByBettingUnit[key].roundsPlayed / this.roundsPerHour) / 100;
        const averagePerHour = Math.round(100 * this.enhancedPlayersWinRate[h].winRateByBettingUnit[key].winnings / hours) / 100;
        this.enhancedPlayersWinRate[h].winRateByBettingUnit[key] = { ...this.enhancedPlayersWinRate[h].winRateByBettingUnit[key], average: averagePerHour, hoursPlayed: hours };
        console.log(averagePerHour, hours);
      })
      console.log(this.enhancedPlayersWinRate);
    })
  }
}