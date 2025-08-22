import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { ABJButtonComponent } from '../../../shared-components/abj-button/abj-button.component';
import { customizingLinks, CustomizingLink } from '../../../classic-blackjack/classic-models/classic-conditions.model';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [ABJButtonComponent, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnInit {

  constructor(private emailjs: EmailjsService, private router: Router) {}

  links: CustomizingLink[] = customizingLinks; 

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Customizations');
  }

  navigate(url: string) {
    this.router.navigate(['classic/' + url])
  }
}