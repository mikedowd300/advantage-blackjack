import { Injectable } from '@angular/core';
import { HeaderLink } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

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
      header: 'What Would Make This Better',
      tagLine: 'I know Kung Fu',
    },
    'faqs': {
      header: 'So Many Questions',
      tagLine: 'What is this place?',
    }
  }

  variationLinks: HeaderLink[] = [
    {
      url: 'classic',
      title: 'Classic Blackjack',
    },
    {
      url: 'doubleup',
      title: 'DoubleUp Blackjack',
    },
    {
      url: 'home',
      title: 'Red Pilled Home',
    }
  ];

  constructor() { }
}