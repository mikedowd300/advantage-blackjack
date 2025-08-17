import { Injectable } from '@angular/core';
import { HeaderLink } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  featureLinks: HeaderLink[] = [
    {
      url: '/customizations',
      title: 'Customizations',
      isSelected: false,
    }, {
      url: '/simulation',
      title: 'Simulation',
      isSelected: false,
    }, {
      url: '/simulation-results',
      title: 'Simulation Results',
      isSelected: false,
    }, {
      url: '/practice',
      title: 'Practice',
      isSelected: false,
    }, {
      url: '/speed-practice',
      title: 'Speed Practice',
      isSelected: false,
    },
  ];

  constructor() { }
}