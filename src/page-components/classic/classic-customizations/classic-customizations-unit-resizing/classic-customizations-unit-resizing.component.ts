import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-unit-resizing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-unit-resizing.component.html',
  styleUrl: './classic-customizations-unit-resizing.component.scss'
})
export class ClassicCustomizationsUnitResizingComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Unit Resizing');
  }
}