import { Injectable } from '@angular/core';
import { HeaderLink, FooterLink } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderFooterService {

  isFooterPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentPage$: BehaviorSubject<string> = new BehaviorSubject<string>('home');

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
      header: 'Help Me Help You',
      tagLine: '"You\'re here because you know something. What you know you can\'t explain, but you feel it..."',
    },
    'faqs': {
      header: 'So Many Questions',
      tagLine: '"... It\'s the question that drives us, Neo!"',
    }, 
    'how-to-run-simulations': {
      header: 'Simm Anything',
      tagLine: 'You are in a simulation',
    }
  };

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
    },
    {
      url: 'how-to-run-simulations',
      title: 'Learn To Simm',
      responsiveTitle: 'Simm Demo',
    },
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
  ];
  variationLinks$: BehaviorSubject<HeaderLink[]> = new BehaviorSubject<HeaderLink[]>(this.variationLinks);

  constructor() { }

  addVariationLink(link: HeaderLink) {
    this.variationLinks.push(link);
    this.variationLinks$.next(this.variationLinks);
  }

  removeVariationLink(url: string) {
    this.variationLinks = this.variationLinks.filter(l => l.url !== url);
    this.variationLinks$.next(this.variationLinks);
  }
}