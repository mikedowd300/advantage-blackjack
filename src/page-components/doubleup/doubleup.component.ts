import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doubleup',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './doubleup.component.html',
  styleUrl: './doubleup.component.scss'
})
export class DoubleupComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}