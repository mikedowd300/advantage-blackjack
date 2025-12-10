import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest, filter, map, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { HeaderFooterService } from '../services/header-footer.service';
import { ABJSelectComponent } from '../shared-components/abj-select/abj-select.component';
import { ABJButtonComponent } from '../shared-components/abj-button/abj-button.component';
import { ABJAnchorComponent } from '../shared-components/abj-anchor/abj-anchor.component';
import { GameVariations, HeaderLink } from '../models';

@Component({
  selector: 'abj-header',
  standalone: true,
  imports: [
    ABJAnchorComponent, 
    ABJSelectComponent, 
    ABJButtonComponent,
    CommonModule, 
    FormsModule, 
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  variations: string[] = ['home', ...GameVariations];
  currentVariation: string;
  storedVariation: string;
  urlLinks: HeaderLink[] = [];
  title: string;
  tagLine: string;
  showSetDefaultButton: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    public headerFooterService: HeaderFooterService,
  ) {}

  ngOnInit(): void {
    this.storedVariation = this.localStorageService.getPreferredVariation();
    this.handleVariationSelection(this.storedVariation);
    combineLatest([
      this.headerFooterService.currentVariation$,
      this.headerFooterService.isFooterPage$,
      this.headerFooterService.variationLinks$,
      this.headerFooterService.fullPageUrl$
    ])
      .pipe().subscribe(([v, isFooterPage, variationLinks, fullPageUrl]) => {
        this.currentVariation = v;
        this.urlLinks = isFooterPage 
          ? variationLinks
          : variationLinks.filter(vl => vl.url !== fullPageUrl);
      });

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      tap(({ url }) => {
        if(url !== "/feedback") {
          this.headerFooterService.currentPage$.next(url)
        }
      }),
      map(event => event.url === '/' ? 'home' : event.url.split('/')[1])
    ).subscribe((pageKey: string) => {
        this.title = this.headerFooterService.headerText[pageKey].header;
        this.tagLine = this.headerFooterService.headerText[pageKey].tagLine;
        if(this.variations.includes(pageKey)) {
          this.showSetDefaultButton = true;
        } else {
          this.showSetDefaultButton = false;
          this.router.navigate([pageKey]);
        }
      });
  }

  handleVariationSelection(variation: string = 'home') {
    this.headerFooterService.currentVariation$.next(variation);
    this.router.navigate([variation !== 'home' ? variation : '']);
    this.headerFooterService.isFooterPage$.next(false);
  }
}