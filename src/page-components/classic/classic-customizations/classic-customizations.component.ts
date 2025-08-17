import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailjsService } from '../../../services/emailjs.service';
import { ABJButtonComponent } from '../../../shared-components/abj-button/abj-button.component';

@Component({
  selector: 'classic-customizations',
  standalone: true,
  imports: [ABJButtonComponent, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './classic-customizations.component.html',
  styleUrl: './classic-customizations.component.scss'
})
export class ClassicCustomizationsComponent implements OnInit {

  constructor(private emailjs: EmailjsService, private router: Router) {}

  links = [
    {
      title: 'Table',
      bodyText: 'Customize and save a table with the players and conditions you want.',
      url: 'table',
    },
    {
      title: 'Conditions',
      bodyText: 'Customize and save table conditions to mimic any casino.',
      url: 'conditions',
    },
    {
      title: 'Player',
      bodyText: 'Customize and save a new player to behave anyway you want.',
      url: 'player',
    },
    {
      title: 'Bet Spread',
      bodyText: 'Customize and save bet spreading strategies to be incorporated by a player.',
      url: 'bet-spread',
    },
    {
      title: 'Unit Resizing',
      bodyText: 'Customize and save unit resizing strategies to become part of a players behavior.',
      url: 'unit-resizing',
    },
    {
      title: 'Play Chart',
      bodyText: 'In addition to the built in play chart, customize and save new chart to define a players playing behavior.',
      url: 'play-chart',
    },
    {
      title: 'Wonging',
      bodyText: 'Customize and save different approaches to adding and removing hands depending on the count.',
      url: 'wonging',
    },
    {
      title: 'Tipping',
      bodyText: 'Understand the cost of tipping by customizing approaches to tipping.',
      url: 'tipping',
    },
    {
      title: 'Counting System',
      bodyText: 'Implement you own counting strategy. You can even make a deviation chart to go along with it in the Deviation section.',
      url: 'custom-counting-system',
    },
    {
      title: 'Insurance Plan',
      bodyText: 'When insurance is offered, have a plan for accepting it or not.',
      url: 'insurance-plan',
    },
  ];

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Classic Customizations');
  }

  navigate(url: string) {
    this.router.navigate(['classic/' + url])
  }
}