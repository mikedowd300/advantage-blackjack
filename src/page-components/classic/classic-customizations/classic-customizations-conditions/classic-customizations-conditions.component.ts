import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';
import { ABJStrategySelectorComponent } from '../../../../shared-components/abj-strategy-selector/abj-strategy-selector.component'

@Component({
  selector: 'classic-customizations-conditions',
  standalone: true,
  imports: [FormsModule, RouterOutlet, ABJStrategySelectorComponent],
  templateUrl: './classic-customizations-conditions.component.html',
  styleUrl: './classic-customizations-conditions.component.scss'
})
export class ClassicCustomizationsConditionsComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Conditions');
  }
}
