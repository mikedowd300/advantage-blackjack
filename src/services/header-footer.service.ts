import { Injectable } from '@angular/core';
import { HeaderLink, FooterLink } from '../models';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderFooterService {

  isFooterPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentPage$: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  headerText = {
    'home': {
      header: 'Advantage Blackjack',
      tagLine: 'Science the Heck Out of Blackjack',
    },
    'classic': {
      header: 'Classic Blackjack',
      tagLine: 'The one that started it all',
    },
    'doubleup': {
      header: 'DoubleUp Blackjack',
      tagLine: 'Not all variations are NOT beatable',
    },
    'about-us': {
      header: 'About Me',
      tagLine: 'If you are curious',
    },
    'feedback': {
      header: 'Your Feedback Is Welcome',
      tagLine: 'Help me help you',
    },
    'faqs': {
      header: 'The Obvious Questions',
      tagLine: 'You are probably wondering about...',
    }, 
    'how-to-run-simulations': {
      header: 'Simm Anything, Simm Everything',
      tagLine: 'Then tweak your strategy',
    }
  };
  variationLinks: HeaderLink[] = [
    {
      url: 'classic/home',
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
      title: 'ABJ Home',
      responsiveTitle: 'Home',
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
  fullPageUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  variationLinks$: BehaviorSubject<HeaderLink[]> = new BehaviorSubject<HeaderLink[]>(this.variationLinks);
  currentVariation$: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  updateTheTagline$: BehaviorSubject<string> = 
    new BehaviorSubject<string>('Science the Hell out of Blackjack');
  storeablePages: string[] = ['home', 'classic/home', 'doubleup', 'spanish21', 'bigbet'];
  storeablePagesReadableTextMap: { [k: string]: string } = {
    'home': 'ABJ Home',
    'classic/home': 'Classic Blackjack',
    'doubleup': 'Double Up',
    'spanish21': 'Spanish 21', 
    'bigbet': 'Big Bet Blackjack',
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd), 
        map(({ url }) => url === '/' ? 'home' : url.replace('/', '')),
      )
      .subscribe(url => this.fullPageUrl$.next(url));
  }

  addVariationLink(link: HeaderLink) {
    if(!this.hasLink(link.title)) {
      this.variationLinks.push(link);
      this.variationLinks$.next(this.variationLinks);
    }
  }

  removeVariationLink(url: string) {
    this.variationLinks = this.variationLinks.filter(l => l.url !== url);
    this.variationLinks$.next(this.variationLinks);
  }

  hasLink(linkName: string) {
    const linkNames: string[] = this.variationLinks.map(l => l.title);
    return linkNames.includes(linkName);
  }
}