import { Injectable } from '@angular/core';
import { HeaderLink, FooterLink } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderFooterService {

  isFooterPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  headerText = {
    'home': {
      header: 'Red Pilled Blackjack',
      tagLine: '"Follow the white rabbit"'
    },
    'classic': {
      header: 'Classic Blackjack',
      tagLine: '"...I can only show you the door. You\'re the one that has to walk through it."'
    },
    'doubleup': {
      header: 'DoubleUp Blackjack',
      tagLine: '"There is no spoon!"'
    },
    'about-us': {
      header: 'About Me',
      tagLine: 'What is the Matrix?',
    },
    'feedback': {
      header: 'Feed Back',
      tagLine: 'I know Kung Fu',
    },
    'faqs': {
      header: 'So Many Questions',
      tagLine: '"... It\'s the question that drives us, Neo!"',
    }
  }

  variationLinks: HeaderLink[] = [
    {
      url: 'classic',
      title: 'Classic Blackjack',
      responsiveTitle: 'Classic',
    },
    {
      url: 'doubleup',
      title: 'DoubleUp Blackjack',
      responsiveTitle: 'DoubleUp',
    },
    {
      url: 'home',
      title: 'Red Pilled Home',
      responsiveTitle: 'Home',
    }
  ];

  footerLinks: FooterLink[] = [
    {
      text: 'About Us',
      url: 'about-us',
    },
    {
      text: 'Feed Back',
      url: 'feedback',
    },
    {
      text: 'FAQs',
      url: 'faqs',
    },
  ]

  // pages: string[] = ['classic','doubleup', 'home', 'about-us', 'faqs', 'feedback'];

  constructor() { }
}