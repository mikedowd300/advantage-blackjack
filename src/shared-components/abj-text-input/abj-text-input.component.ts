import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'abj-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abj-text-input.component.html',
  styleUrl: './abj-text-input.component.scss'
})
export class ABJTextInputComponent implements AfterViewInit {
  @ViewChild('innerInput') innerInput: ElementRef;
  @Input() value: string;
  @Input() label: string;
  @Input() placeHolder: string;
  @Output() changeEvent = new EventEmitter<string>();
  message: string;

  ngAfterViewInit(): void {
    // this.innerInput.nativeElement.focus();
  }

  handleInput() {
    this.changeEvent.emit(this.message)
  }
}