import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderFooterService } from '../services/header-footer.service';
import { ABJAnchorComponent } from '../shared-components/abj-anchor/abj-anchor.component';
import { FooterLink } from '../models';

@Component({
  selector: 'abj-footer',
  standalone: true,
  imports: [
    CommonModule,
    ABJAnchorComponent, 
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  links: FooterLink[];

  constructor(private headerFooterService: HeaderFooterService) {}

  setIsFooterPage() {
    this.headerFooterService.isFooterPage$.next(true);
  }

  ngOnInit(): void {
    this.links = this.headerFooterService.footerLinks;
  }
}