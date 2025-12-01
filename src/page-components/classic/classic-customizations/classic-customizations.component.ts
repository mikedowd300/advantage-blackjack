import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { ABJButtonComponent } from '../../../shared-components/abj-button/abj-button.component';
import { customizingLinks, CustomizingLink } from '../../../classic-blackjack/classic-models/classic-strategies.models';
import { HeaderLink } from '../../../models';
import { HeaderFooterService } from '../../../services/header-footer.service';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [ABJButtonComponent, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnDestroy, OnInit {
  links: CustomizingLink[] = customizingLinks;
  simulationLink: HeaderLink = {
    url: 'classic/simulation',
    title: 'Simulations',
    responsiveTitle: 'Run Sim',
  };

  constructor(
    private emailjs: EmailjsService,
    private router: Router,
    private headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.headerFooterService.updateTheTagline$.next('Everything has a strategy, optimize it!');
    this.headerFooterService.addVariationLink(this.simulationLink);
    this.emailjs.setPreviousScreen$.next('Classic Customizations');
  }

  navigate(url: string) {
    this.router.navigate(['classic/' + url]) 
  }

  ngOnDestroy(): void {
    this.headerFooterService.removeVariationLink('classic/simulation');
    this.headerFooterService.updateTheTagline$.next(null)
  }
}