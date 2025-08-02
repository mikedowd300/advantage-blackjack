import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.scss'
})
export class ClassicComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}