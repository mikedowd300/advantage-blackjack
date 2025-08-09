import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'abj-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-textarea.component.html',
  styleUrl: './abj-textarea.component.scss'
})
export class ABJTextareaComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;
  @Input() placeHolder: string;
  @Output() changeEvent = new EventEmitter<string>();
  @Output() onTextareaFocus = new EventEmitter<string>();
  message: string;

  ngOnInit(): void {}

  handleInput() {
    this.changeEvent.emit(this.message);
  }

  handleTextareaFocus() {
    this.onTextareaFocus.emit();
  }
}