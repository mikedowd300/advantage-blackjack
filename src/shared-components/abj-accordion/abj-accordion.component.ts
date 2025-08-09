import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'abj-accordion',
  standalone: true,
  templateUrl: './abj-accordion.component.html',
  styleUrl: './abj-accordion.component.scss'
})
export class ABJAccordionComponent implements OnInit {
  @Input() displayedContent: string;
  @Input() hiddenContent: string;
  // isExpanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isExpanded: boolean = false;

  ngOnInit(): void {}

  expand() {
    this.isExpanded = !this.isExpanded;
    // this.isExpanded$.next(this.isExpanded)
  }
}