import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'abj-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-text-input.component.html',
  styleUrl: './abj-text-input.component.scss'
})
export class ABJTextInputComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;
  @Input() placeHolder: string;
  @Output() changeEvent = new EventEmitter<string>();
  message: string;

  ngOnInit(): void {}

  handleInput() {
    this.changeEvent.emit(this.message)
  }
}