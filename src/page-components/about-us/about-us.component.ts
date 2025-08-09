import { Component, OnInit } from '@angular/core';
import { EmailjsService } from '../../services/emailjs.service';

@Component({
  selector: 'about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('About Us');
  }
}