import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abj-sim-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abj-sim-details.component.html',
  styleUrl: './abj-sim-details.component.scss'
})
export class ABJSimDetailsComponent implements OnInit {
  @Input() startingBankroll: number;
  @Input() finalBankroll: number;
  @Input() totalMoneyBet: number;
  @Input() totalWon: number;
  @Input() roi: number;
  @Input() tippedAway: number;

  constructor() {}

  ngOnInit(): void {}
}