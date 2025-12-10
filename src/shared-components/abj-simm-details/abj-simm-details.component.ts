import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abj-simm-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abj-simm-details.component.html',
  styleUrl: './abj-simm-details.component.scss'
})
export class ABJSimmDetailsComponent implements OnInit {
  @Input() startingBankroll: number;
  @Input() finalBankroll: number;
  @Input() totalMoneyBet: number;
  @Input() totalWon: number;
  @Input() roi: number;
  @Input() tippedAway: number;

  constructor() {}

  ngOnInit(): void {}
}