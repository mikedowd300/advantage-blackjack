import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'doubleup',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './doubleup.component.html',
  styleUrl: './doubleup.component.scss'
})
export class DoubleupComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}