import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}