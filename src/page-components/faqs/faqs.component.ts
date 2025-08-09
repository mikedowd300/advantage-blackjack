import { Component, OnInit } from '@angular/core';
import { EmailjsService } from '../../services/emailjs.service';
import { ABJAccordionComponent } from "../../shared-components/abj-accordion/abj-accordion.component";
import { Faq } from '../../models';

@Component({
  selector: 'faqs',
  standalone: true,
  imports: [ABJAccordionComponent],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent implements OnInit {

  faqs: Faq[] = [
    {
      question: 'What are you trying to tell me? That I can dodge bullets?',
      answer: 'No, Neo. I\'m trying to tell you that when you\'re ready, you won\'t have to.',
    },
    {
      question: 'Does this use AI',
      answer: 'Nope',
    },
    {
      question: 'Is it prudent to share this tool with the world?',
      answer: "I have thought about that, and, it could be just my pride wanting to show everyone what I can do, but, aside from that, similar tools are out there with similar capabilities, so I don't feel I have let a genie out of the box that hasn't already been let out. It's just at better price point (for now).",
    },
    {
      question: "Isn't this just a rip off of BJA?",
      answer: "Full disclosure, when I started off on this journey a few years ago, I didn't even know about BJA or that they offered a product like the one I was contemplaing. As I got more into blackjack, I, of couse, became aware. Even then, though, I didn't want to see their product until I had my own, just so I could say that it was my own. Also I still have never seen or used CVX.",
    },
    {
      question: "Why did you go with Double Up Blackjack as the second variation?",
      answer: "It's true that Double Up is not very common, but where I live it does exist, and they first time I saw it I knew it was beatable. I made a simulator to get some kind of expectations and was pleased with the results. I also came up with a strategy chart (the same as the Wizard of Odd's version with only 1 exception) and a deviation chart, which as far as I know, does not exist anywhere else.",
    },
    {
      question: "What other versions of blackjack do you intent to add to the site?",
      answer: "I have made 2 other versions, Spanish 21 as well as a version that exists in the Firekeeper's Casino in Battle Creek MI. As far as I know that version only exists on a single table and IS beatable, but it isn't quite as profitable as classic blackjack. For Spanish21, the results were good, but as Spanish has strategic decisions to be made after the first 2 cards, I have not been able to use my software to come up with a deviation chart ...yet.",
    },
  ]
  constructor(private emailjs: EmailjsService) {}

  ngOnInit(): void {
    this.emailjs.setPreviousScreen$.next('Faqs');
  }
}