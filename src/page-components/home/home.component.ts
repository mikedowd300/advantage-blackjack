import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { EmailjsService } from '../../services/emailjs.service';
import { VideoModalService } from '../../services/video-modal.service';
import { ABJFeatureIntroComponent } from '../../shared-components/abj-feature-intro/abj-feature-intro.component';
import { featureDetails } from './feature-details'
import { FeatureDetails } from '../../models';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ABJFeatureIntroComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featureDetails: FeatureDetails[];
  constructor(
    private emailjs: EmailjsService, 
    private videoModalService: VideoModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.featureDetails = featureDetails;
    this.emailjs.setPreviousScreen$.next('Home');
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }

  testRoute() {
    this.router.navigate(['classic/simulation']) 
  }
}