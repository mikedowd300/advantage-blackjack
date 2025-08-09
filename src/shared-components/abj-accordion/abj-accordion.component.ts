import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abj-accordion',
  standalone: true,
  templateUrl: './abj-accordion.component.html',
  styleUrl: './abj-accordion.component.scss'
})
export class ABJAccordionComponent implements OnInit {
  @Input() displayedContent: string;
  @Input() hiddenContent: string;
  isExpanded: boolean = false;

  ngOnInit(): void {}

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}