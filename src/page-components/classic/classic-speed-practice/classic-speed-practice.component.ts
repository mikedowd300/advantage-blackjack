import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-speed-practice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-speed-practice.component.html',
  styleUrl: './classic-speed-practice.component.scss'
})
export class ClassicSpeedPracticeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}