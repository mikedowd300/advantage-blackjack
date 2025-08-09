import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';

@Component({
  selector: 'classic-simulation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-simulation.component.html',
  styleUrl: './classic-simulation.component.scss'
})
export class ClassicSimulationComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Simulation');
  }
}