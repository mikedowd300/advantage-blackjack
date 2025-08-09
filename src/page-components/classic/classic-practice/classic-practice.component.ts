import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';

@Component({
  selector: 'classic-practice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-practice.component.html',
  styleUrl: './classic-practice.component.scss'
})
export class ClassicPracticeComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Practice');
  }
}