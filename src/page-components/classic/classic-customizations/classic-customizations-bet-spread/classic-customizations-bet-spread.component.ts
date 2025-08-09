import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-bet-spread',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './classic-customizations-bet-spread.component.html',
  styleUrl: './classic-customizations-bet-spread.component.scss'
})
export class ClassicCustomizationsBetSpreadComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Bet Spread');
  }
}