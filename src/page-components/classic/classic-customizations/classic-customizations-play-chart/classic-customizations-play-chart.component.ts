import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-play-chart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-play-chart.component.html',
  styleUrl: './classic-customizations-play-chart.component.scss'
})
export class ClassicCustomizationsPlayChartComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Play Chart');
  }
}