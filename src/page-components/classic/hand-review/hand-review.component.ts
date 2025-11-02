import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameEngineData } from '../../../services/game-engine-data';
import { filter, map, Observable } from 'rxjs';
import { PlayerRecord, TableRecord } from '../../../classic-blackjack/classic-engine/record-store/record-models';

@Component({
  selector: 'hand-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hand-review.component.html',
  styleUrl: './hand-review.component.scss'
})
export class HandReviewComponent implements OnInit {
  
  records$: Observable<TableRecord[]>;
  recordIndex: number = 0;

  constructor(public gameData: GameEngineData) {}

  ngOnInit(): void {
    this.records$ = this.gameData.records$.pipe(
      filter(rs => rs.length > 0),
      map(rs => rs.map(r => this.syncSpotsAndPlayers(r)))
    );

    this.records$.subscribe(x => console.log(x));
  }

  syncSpotsAndPlayers(rec: TableRecord): TableRecord {
    let players: PlayerRecord[] = [];
    rec.spots.forEach(s => {
      const player = rec.players.find(p => p.handle === s.playerHandle);
      players.push(player);
    })
    return {
      ...rec,
      spots: rec.spots.sort((a, b) => a.spotId - b.spotId).filter(s => s.spotId), 
      players: players.sort((a, b) => a.spotIds[0] - b.spotIds[0]),
    };
  }

  incRecordIndex() {
    this.recordIndex += 1;
  }

  decRecordIndex() {
    this.recordIndex -= 1;
  }
}