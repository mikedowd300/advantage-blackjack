import { Component, OnInit } from '@angular/core';
import { EmailjsService } from '../../services/emailjs.service';

@Component({
  selector: 'faqs',
  standalone: true,
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent implements OnInit {

  faqs = [
    {
      question: 'What are you trying to tell me? That I can dodge bullets?',
      answer: 'No, Neo. I\'m trying to tell you that when you\'re ready, you won\'t have to.',
    },
    {
      question: 'What are you trying to tell me? That I can dodge bullets?',
      answer: 'No, Neo. I\'m trying to tell you that when you\'re ready, you won\'t have to.',
    },
  ]
  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Faqs');
  }
}