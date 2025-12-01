import { Component, Input } from '@angular/core';

@Component({
  selector: 'abj-accordion',
  standalone: true,
  templateUrl: './abj-accordion.component.html',
  styleUrl: './abj-accordion.component.scss'
})
export class ABJAccordionComponent {
  @Input() displayedContent: string;
  @Input() hiddenContent: string;
  isExpanded: boolean = false;

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}