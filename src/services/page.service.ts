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
      url: '/simulation-results-dashboard',
      title: 'Simulation Results Dashboard',
      isSelected: false,
    // }, {
    //   url: '/practice',
    //   title: 'Practice',
    //   isSelected: false,
    }, {
      url: '/speed-practice',
      title: 'Speed Practice',
      isSelected: false,
    }, {
      url: '/create-deviation-chart',
      title: 'Create Deviation Charts',
      isSelected: false,
    },
  ];

  constructor() { }
}