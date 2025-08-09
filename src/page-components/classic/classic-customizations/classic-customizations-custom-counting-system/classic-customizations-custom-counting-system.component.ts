import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-custom-counting-system',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-custom-counting-system.component.html',
  styleUrl: './classic-customizations-custom-counting-system.component.scss'
})
export class ClassicCustomizationsCustomCountingSystemComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Counting System');
  }
}