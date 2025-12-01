import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoModalService } from '../../services/video-modal.service';
import { map, Observable } from 'rxjs';
import { ABJButtonComponent } from '../abj-button/abj-button.component';

@Component({
  selector: 'abj-video-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ABJButtonComponent],
  templateUrl: './abj-video-modal.component.html',
  styleUrl: './abj-video-modal.component.scss'
})
export class ABJVideoModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<string>();
  iframeSrc$: Observable<SafeResourceUrl>;
  videoPlayerHeight: number = 315;
  videoPlayerWidth: number = 560;

  constructor(
    private sanitizer: DomSanitizer, 
    private videoModalService: VideoModalService
  ) {}

  ngOnInit(): void {
    this.caluculateVideoPlayerSize();
    this.iframeSrc$ = this.videoModalService.activeUrl$
      .pipe(map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url)));
  }

  handleXClick() {
    this.closeModal.emit();
  }

  private caluculateVideoPlayerSize() {
    let found: boolean = false;
    let height: number = window.innerHeight;
    let width: number = (Math.floor(window.innerWidth / 10) * 10) - 30;
    while(width > 559 && !found) {
      width = width - 10;
      found = ((width * 9) / 16) <= height - 40;
    } 
    this.videoPlayerHeight = found ? (width * 9) / 16 : 315;
    this.videoPlayerWidth = found ? width : 560;
  }
}