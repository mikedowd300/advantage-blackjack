import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'abj-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './abj-select.component.html',
  styleUrl: './abj-select.component.scss'
})
export class ABJSelectComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() label: string;
  @Input() selectValue: string;
  @Output() selectedEvent = new EventEmitter<any>();

  showIntroMessage: boolean;

  ngOnInit(): void {
    this.showIntroMessage = this.selectValue && !this.options.includes(this.selectValue);
  }

  selectEvent(message: string) {
    this.showIntroMessage = !this.options.includes(message);
    this.selectedEvent.emit(message);
    // setTimeout(() => window.scrollTo(0, 0));
  }
}
