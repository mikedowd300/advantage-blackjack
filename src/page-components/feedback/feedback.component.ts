import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABJStatusModalComponent } from '../../shared-components/abj-status-modal/abj-status-modal.component';
import { ABJTextInputComponent } from '../../shared-components/abj-text-input/abj-text-input.component';
import { ABJButtonComponent } from '../../shared-components/abj-button/abj-button.component';
import { ABJTextareaComponent } from '../../shared-components/abj-textarea/abj-textarea.component';
import { EmailjsService } from '../../services/emailjs.service';
import { FeedbackPayload, SuccessStatus } from '../../models';
import { map, Observable } from 'rxjs';
import { HeaderFooterService } from '../../services/header-footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'feedback',
  standalone: true,
  imports: [ABJTextInputComponent, ABJButtonComponent, ABJTextareaComponent, ABJStatusModalComponent, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnDestroy, OnInit {
  emailAddress: string = '';
  feedBackMessage: string;
  hasError: boolean = false;
  previousScreen: string = '';
  showModal$: Observable<SuccessStatus>;
  successStatus = SuccessStatus;
  submissionAttempts: number = 0;
  modalMessage$: Observable<string>;
  entryUrl: string;

  constructor(
    private router: Router,
    public emailjs: EmailjsService, 
    private headerFooterService: HeaderFooterService
  ) {}

  ngOnInit(): void {
    this.modalMessage$ = this.emailjs.showModal$.pipe(map(status => {
      if(status === SuccessStatus.SUCCESS) {
        return "Your feedback was sent successfully! Thankyou!"
      } 
      this.submissionAttempts += 1;
      return this.submissionAttempts < 2 ? "Looks like a glitch." : "Dejavu! Please try again later."
    }));
    this.emailjs.setPreviousScreen$.pipe().subscribe(screen => this.previousScreen = screen);
    this.headerFooterService.currentPage$.pipe().subscribe(page => this.entryUrl = page);
  }

  handleSubmit() {
    if(this.feedBackMessage) {
      const payload: FeedbackPayload = {
        previousScreen: this.previousScreen,
        email: this.emailAddress,
        time: this.getTime(),
        message: this.feedBackMessage,
      }
      this.emailjs.sendEmail(payload);
      this.hasError = false;
    } else {
      this.hasError = true;
    }
  }

  getEmail(e: string) {
    this.emailAddress = e;
  }

  getMessage(e: string) {
    this.feedBackMessage = e;
  }

  handleXClick() {
    this.emailjs.showModal$.next(SuccessStatus.NULL);
    this.router.navigate([this.entryUrl]);
  }

  private getTime(): string {
    const d = new Date();
    return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }

  scrollIntoView() {
    console.log(document.activeElement);
    document.activeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.emailjs.showModal$.next(SuccessStatus.NULL)
  }
}