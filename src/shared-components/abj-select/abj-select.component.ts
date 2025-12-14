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
    // DO NOT INCLUDE selectValue IN THE OPTIONS IF YOU EXPECT IT TO BE DISABLED
    this.showIntroMessage = this.selectValue && !this.options.includes(this.selectValue);
  }

  selectEvent(message: string) {
    this.showIntroMessage = !this.options.includes(message);
    this.selectedEvent.emit(message);
  }
}
