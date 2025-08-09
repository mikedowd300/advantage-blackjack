import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../../services/emailjs.service';

@Component({
  selector: 'classic-customizations-player',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classic-customizations-player.component.html',
  styleUrl: './classic-customizations-player.component.scss'
})
export class ClassicCustomizationsPlayerComponent implements OnInit {

  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Custom Player');
  }
}