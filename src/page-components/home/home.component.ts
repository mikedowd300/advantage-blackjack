import { Component, OnInit } from '@angular/core';
import { EmailjsService } from '../../services/emailjs.service';
import { VideoModalService } from '../../services/video-modal.service';
import { ABJFeatureIntroComponent } from '../../shared-components/abj-feature-intro/abj-feature-intro.component';
import { featureDetails } from './feature-details'
import { FeatureDetails } from '../../models';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ABJFeatureIntroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featureDetails: FeatureDetails[];
  constructor(private emailjs: EmailjsService, private videoModalService: VideoModalService) {}

  ngOnInit(): void {
    this.featureDetails = featureDetails;
    this.emailjs.setPreviousScreen$.next('Home');
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }
}