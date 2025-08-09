import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';

@Component({
  selector: 'classic-speed-practice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-speed-practice.component.html',
  styleUrl: './classic-speed-practice.component.scss'
})
export class ClassicSpeedPracticeComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Speed Practice');
  }
}