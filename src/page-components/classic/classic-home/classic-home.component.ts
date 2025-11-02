import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { EmailjsService } from '../../../services/emailjs.service';
import { GameEngine } from '../../../classic-blackjack/classic-engine/game-engine';
import { GameEngineData } from '../../../services/game-engine-data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classic-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-home.component.html',
  styleUrl: './classic-home.component.scss'
})
export class ClassicHomeComponent implements OnInit, OnDestroy {

  game: GameEngine;
  showDataDrivenPages: boolean = false;
  private destroy$ = new Subject<void>()

  constructor(private emailjs: EmailjsService, private router: Router, private gameData: GameEngineData) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Home');
    this.gameData.records$.pipe(takeUntil(this.destroy$)).subscribe(records => {
      this.showDataDrivenPages = records.length > 0;
    });
  }

  navigate(url: string): void {
    this.router.navigate(['classic/' + url]) 
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}