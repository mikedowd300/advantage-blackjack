import { Injectable } from '@angular/core';
import { HeaderLink } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  featureLinks: HeaderLink[] = [
    {
      url: '/customizations',
      title: 'Customizations'
    }, {
      url: '/simulation',
      title: 'Simulation'
    }, {
      url: '/simulation-results',
      title: 'Simulation Results'
    }, {
      url: '/practice',
      title: 'Practice'
    }, {
      url: '/speed-practice',
      title: 'Speed Practice'
    },
  ];

  constructor() { }
}