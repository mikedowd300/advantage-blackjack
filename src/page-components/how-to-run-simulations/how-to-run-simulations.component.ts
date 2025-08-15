import { Component, OnInit } from '@angular/core';
import { EmailjsService } from '../../services/emailjs.service';
import { VideoModalService } from '../../services/video-modal.service';
import { ABJFeatureIntroComponent } from '../../shared-components/abj-feature-intro/abj-feature-intro.component';
import { featureSteps } from './feature-steps';
import { FeatureDetails } from '../../models';

@Component({
  selector: 'how-to-run-simulations',
  standalone: true,
  imports: [ABJFeatureIntroComponent],
  templateUrl: './how-to-run-simulations.component.html',
  styleUrl: './how-to-run-simulations.component.scss'
})
export class HowToRunSimulationsComponent implements OnInit {
  featureSteps: FeatureDetails[];
  constructor(private emailjs: EmailjsService, private videoModalService: VideoModalService) {}

  ngOnInit(): void {
    this.featureSteps = featureSteps;
    this.emailjs.setPreviousScreen$.next('How To Run A Simulation');
  }

  openModal(urlKey) {
    this.videoModalService.openModal(urlKey);
  }
}