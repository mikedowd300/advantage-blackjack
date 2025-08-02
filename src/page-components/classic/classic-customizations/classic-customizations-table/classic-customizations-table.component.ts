import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'classic-customizations-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-table.component.html',
  styleUrl: './classic-customizations-table.component.scss'
})
export class ClassicCustomizationsTableComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}