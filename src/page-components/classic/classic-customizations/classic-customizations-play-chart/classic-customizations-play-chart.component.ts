import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-customizations-play-chart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-play-chart.component.html',
  styleUrl: './classic-customizations-play-chart.component.scss'
})
export class ClassicCustomizationsPlayChartComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}