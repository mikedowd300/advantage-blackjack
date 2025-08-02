import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-customizations-conditions',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './classic-customizations-conditions.component.html',
  styleUrl: './classic-customizations-conditions.component.scss'
})
export class ClassicCustomizationsConditionsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
