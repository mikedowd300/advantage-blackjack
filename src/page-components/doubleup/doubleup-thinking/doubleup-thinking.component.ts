import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DuGameEngine } from '../../../doubleup-blackjack/doubleup-engine/du-game-engine';
import { DuGameEngineData } from '../../../services/du-game-engine-data';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'doubleup-thinking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './doubleup-thinking.component.html',
  styleUrl: './doubleup-thinking.component.scss'
})
export class DoubleupThinkingComponent implements OnInit, OnDestroy, AfterViewInit {
  onDestroy$: Subject<void> = new Subject<void>();
  game: DuGameEngine;

  constructor(
    private router: Router, 
    private gameData: DuGameEngineData
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.game = new DuGameEngine(this.gameData);
    combineLatest([this.game.simulationComplete$, this.game.recordStore.records$])
      .pipe(filter(([x, y]) => x && y.length > 0), takeUntil(this.onDestroy$))
      .subscribe(([, records]) => {
        this.gameData.records$.next(records);
        this.router.navigate(['doubleup/simulation-results-dashboard']);
      });
    setTimeout(() => this.game.startSimulation());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}