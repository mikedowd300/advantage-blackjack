import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-insurance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-insurance.component.html',
  styleUrl: './classic-customizations-insurance.component.scss'
})
export class ClassicCustomizationsInsuranceComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Insurance');
  }
}