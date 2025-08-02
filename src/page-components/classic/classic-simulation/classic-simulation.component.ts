import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-simulation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-simulation.component.html',
  styleUrl: './classic-simulation.component.scss'
})
export class ClassicSimulationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}