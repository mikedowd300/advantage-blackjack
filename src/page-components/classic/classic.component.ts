import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailjsService } from '../../services/emailjs.service';

@Component({
  selector: 'classic',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.scss'
})
export class ClassicComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic');
  }
}