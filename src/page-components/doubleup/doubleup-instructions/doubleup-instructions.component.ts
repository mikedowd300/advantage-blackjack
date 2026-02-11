import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'doubleup-instructions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doubleup-instructions.component.html',
  styleUrl: './doubleup-instructions.component.scss'
})
export class DoubleupInstructionsComponent implements OnInit, OnDestroy {

  showDataDrivenPages: boolean = false;
  showIframeModal: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['doubleup/home'])
  }

  toggleIframeModal() {
    this.showIframeModal = !this.showIframeModal;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}