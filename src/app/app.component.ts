import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ABJSelectComponent } from '../shared-components/abj-select/abj-select.component';
import { HeaderComponent } from '../header-component/header.component';
import { FooterComponent } from '../footer-component/footer.component';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ABJSelectComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'advantage-blackjack';
  emailjs: any;

  testSelectValue: string = "Testing 1 2 3!"

  ngOnInit(): void {
    this.emailjsInit();
  }

  receiveTestMessage(message: string) {
    this.testSelectValue = message;
  }

  emailjsInit() {
    const publicKey: string = "e6uXNkHPbiTl67p1p";
    emailjs.init({ publicKey });
  }

  sendEmail() {
    const payload = {
      name: 'Bob,',
      time: new Date(),
      email: 'test@tester.com',
      title: 'MY Title',
      message: 'Yadda da, yadda da'
    }
    emailjs.send('abj_feedback_service', 'template_34sqcm7', payload)
    .then(() => {
        console.log('SUCCESS!');
    }, (error: string) => {
        console.log('FAILED...', error);
    });
  }
}
