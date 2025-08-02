import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-practice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-practice.component.html',
  styleUrl: './classic-practice.component.scss'
})
export class ClassicPracticeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}