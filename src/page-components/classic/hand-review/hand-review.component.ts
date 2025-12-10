import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameEngineData } from '../../../services/game-engine-data';
import { BehaviorSubject, combineLatest, filter, map, Observable, take } from 'rxjs';
import { PlayerRecord, TableRecord } from '../../../classic-blackjack/classic-engine/record-store/record-models';

@Component({
  selector: 'hand-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hand-review.component.html',
  styleUrl: './hand-review.component.scss'
})
export class HandReviewComponent implements AfterViewInit, OnInit {
  
  records$: Observable<TableRecord[]>;
  activeRecord$: Observable<TableRecord>;
  activeRecordIndex: number = 0;
  activeRecordIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(this.activeRecordIndex);
  handInOutOfRange$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(public gameData: GameEngineData) {}

  ngOnInit(): void {
    this.records$ = this.gameData.records$.pipe(
      filter(rs => rs.length > 0),
      map(rs => rs.map(r => this.syncSpotsAndPlayers(r)))
    );

    this.activeRecord$ = combineLatest([this.records$, this.activeRecordIndex$])
      .pipe(map(([records, index]) => records[index] ));
  }

  ngAfterViewInit(): void {
    this.gameData.replayHandAtIndex$.pipe(filter(x => !!x), take(1))
      .subscribe(index => {
        this.activeRecordIndex = index + 1;
        setTimeout(() => this.activeRecordIndex$.next(this.activeRecordIndex));
      });
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

  incActiveRecordIndex() {
    this.activeRecordIndex += 1;
    this.activeRecordIndex$.next(this.activeRecordIndex);
  }

  decActiveRecordIndex() {
    this.activeRecordIndex -= 1;
    this.activeRecordIndex$.next(this.activeRecordIndex);
  }

  jumpToHand({ target }, length: number) {
    this.handInOutOfRange$.next(target.value < 0 || target.value >= length);
    if(target.value >= 0 && target.value < length) {
      this.activeRecordIndex = parseInt(target.value);
      this.activeRecordIndex$.next(this.activeRecordIndex);
    }
  }
}