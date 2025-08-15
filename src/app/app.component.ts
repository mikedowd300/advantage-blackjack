import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header-component/header.component';
import { FooterComponent } from '../footer-component/footer.component';
import { ABJVideoModalComponent } from '../shared-components/abj-video-modal/abj-video-modal.component';
import { VideoModalService } from '../services/video-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ABJVideoModalComponent,
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public videoModalService: VideoModalService) {}

  ngOnInit(): void {}
}
