import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-tipping',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-tipping.component.html',
  styleUrl: './classic-customizations-tipping.component.scss'
})
export class ClassicCustomizationsTippingComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Tipping');
  }
}