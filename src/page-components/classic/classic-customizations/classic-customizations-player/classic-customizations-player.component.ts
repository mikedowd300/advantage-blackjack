import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-customizations-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-player.component.html',
  styleUrl: './classic-customizations-player.component.scss'
})
export class ClassicCustomizationsPlayerComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}