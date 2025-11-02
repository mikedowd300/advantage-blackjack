import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameEngine } from '../../../classic-blackjack/classic-engine/game-engine';
import { GameEngineData } from '../../../services/game-engine-data';
import { combineLatest, filter } from 'rxjs';

@Component({
  selector: 'classic-thinking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './thinking.component.html',
  styleUrl: './thinking.component.scss'
})
export class ClassicThinkingComponent implements OnInit, AfterViewInit {

  game: GameEngine;

  constructor(
    private router: Router, 
    private gameData: GameEngineData
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.game = new GameEngine(this.gameData);
    combineLatest([this.game.simulationComplete$, this.game.recordStore.records$])
      .pipe(filter(([x, y]) => x && y.length > 0))
      .subscribe(([, records]) => {
        this.gameData.records$.next(records);
        this.router.navigate(['classic/home']);
      });
    setTimeout(() => this.game.startSimulation());
  }
}