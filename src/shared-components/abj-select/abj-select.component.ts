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
  @Input() options: string[] = ['Sam', 'Steph', 'Raech', 'Shannon', 'Tony'];
  @Input() label: string = "Label Name";
  @Input() selectValue: string = 'Select a Value';
  @Output() selectedEvent = new EventEmitter<string>();

  showIntroMessage: boolean = true;

  ngOnInit(): void {
    this.showIntroMessage = !this.options.includes(this.selectValue);
  }

  selectEvent(message: string) {
    this.showIntroMessage = !this.options.includes(message);
    this.selectedEvent.emit(message);
  }
}
