import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../../services/page.service';
import { EmailjsService } from '../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Customizations');
  }
}