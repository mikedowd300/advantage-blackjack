import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ABJButtonComponent } from '../abj-button/abj-button.component';

@Component({
  selector: 'abj-feature-intro',
  standalone: true,
  imports: [ABJButtonComponent],
  templateUrl: './abj-feature-intro.component.html',
  styleUrl: './abj-feature-intro.component.scss'
})
export class ABJFeatureIntroComponent implements OnInit {
  @Input() isOdd: boolean = false;
  @Input() imgSrc: string;
  @Input() imgAltText: string;
  @Input() headerText: string;
  @Input() taglineText: string;
  @Input() textContent: string[] = [];
  @Input() buttontext: string;
  @Input() videoUrl: string;
  @Output() action = new EventEmitter<any>();

  ngOnInit(): void {}

  launchVideo() {
    this.action.emit(this.videoUrl);
  }
}