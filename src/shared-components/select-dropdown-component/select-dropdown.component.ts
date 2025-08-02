import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent implements OnInit {
  @Input() options: string[] = ['Sam', 'Steph', 'Raech', 'Shannon', 'Tony'];
  @Input() label: string = "Label Name";
  @Input() selectValue: string = 'Select a Value';
  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit(): void {}

  sendMessage(message: string) {
    this.messageEvent.emit(message);
  }
}
