import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EmailjsService } from '../../services/emailjs.service';
import { VideoModalService } from '../../services/video-modal.service';
import { ABJFeatureIntroComponent } from '../../shared-components/abj-feature-intro/abj-feature-intro.component';
import { featureDetails } from './feature-details'
import { FeatureDetails, HeaderLink } from '../../models';
import { HeaderFooterService } from '../../services/header-footer.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ABJFeatureIntroComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy, OnInit {
  featureDetails: FeatureDetails[];
  simmLink: HeaderLink = {
    url: 'how-to-run-simulations',
    title: 'Learn To Simm',
    responsiveTitle: 'Simm Demo',
  }; 
  
  constructor(
    private emailjs: EmailjsService, 
    private videoModalService: VideoModalService,
    private headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.featureDetails = featureDetails;
    this.emailjs.setPreviousScreen$.next('Home');
    this.headerFooterService.variationLinks$.next([...this.headerFooterService.variationLinks, this.simmLink]);
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }
  
  ngOnDestroy(): void {
    this.headerFooterService.variationLinks$.next([...this.headerFooterService.variationLinks]);
  }
}