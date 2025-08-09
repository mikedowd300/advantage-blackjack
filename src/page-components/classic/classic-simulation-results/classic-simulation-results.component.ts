import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';

@Component({
  selector: 'classic-simulation-results',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-simulation-results.component.html',
  styleUrl: './classic-simulation-results.component.scss'
})
export class ClassicSimulationResultsComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Simulation Results');
  }
}