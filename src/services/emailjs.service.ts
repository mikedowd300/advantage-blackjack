import emailjs from '@emailjs/browser';
import { Injectable } from '@angular/core';
import { FeedbackPayload, SuccessStatus } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailjsService {
  emailjs: any;
  publicKey: string = "e6uXNkHPbiTl67p1p";
  setPreviousScreen$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showModal$: BehaviorSubject<SuccessStatus> = new BehaviorSubject<SuccessStatus>(SuccessStatus.NULL);

  constructor() {
    emailjs.init({ publicKey: this.publicKey });
  }

  closeModals() {
    this.showModal$.next(SuccessStatus.NULL)
  }

  sendEmail(payload: FeedbackPayload): void {
    emailjs.send('abj_feedback_service', 'template_34sqcm7', payload as any)
    .then(
      () => this.showModal$.next(SuccessStatus.SUCCESS), 
      () => this.showModal$.next(SuccessStatus.FAIL)
    );
  }
}
