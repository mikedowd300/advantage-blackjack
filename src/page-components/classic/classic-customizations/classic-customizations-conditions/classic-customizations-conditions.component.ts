import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-conditions',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './classic-customizations-conditions.component.html',
  styleUrl: './classic-customizations-conditions.component.scss'
})
export class ClassicCustomizationsConditionsComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Conditions');
  }
}
