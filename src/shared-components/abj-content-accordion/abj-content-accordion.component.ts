import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'abj-content-accordion',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './abj-content-accordion.component.html',
  styleUrl: './abj-content-accordion.component.scss'
})

export class ABJContentAccordionComponent implements OnInit {
  @Input() expanded: boolean = false;
  @Input() title: string = null;
  @Output() action = new EventEmitter<any>();

  public accordionExpand: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.accordionExpand = this.expanded;
  }

  expand() {
    this.accordionExpand = !this.accordionExpand;
    this.action.emit(this.accordionExpand);
  }
}