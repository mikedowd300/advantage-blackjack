import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { GameEngine } from '../../../doubleup/classic-engine/game-engine';
import { GameEngineData } from '../../../services/game-engine-data';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'doubleup-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doubleup-home.component.html',
  styleUrl: './doubleup-home.component.scss'
})
export class DoubleupHomeComponent implements OnInit, OnDestroy {

  // game: GameEngine;
  showDataDrivenPages: boolean = false;
  showPreNavigationModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>()

  constructor(private router: Router, private gameData: GameEngineData) {}

  ngOnInit(): void {
    // this.gameData.records$.pipe(takeUntil(this.destroy$))
    //   .subscribe(records => this.showDataDrivenPages = records.length > 0);
  }

  navigate(url: string, showPreNavigationModal: boolean = false): void {
    this.showPreNavigationModal$.next(showPreNavigationModal);
    setTimeout(() => this.router.navigate(['doubleup/' + url]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}