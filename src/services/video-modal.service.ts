import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoModalService {

  showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activeUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  videoUrls = {
    introDemoUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // lives on home page
    // introDemoUrl will show you a demo of a simulation with a table, players, and conditions.
    // it will NOT show how to configure anything but running a simulation with pre-existing conditions and players as well as the amount of rounds you would like to run
    // it will allude to building a unique table with unique players and unique conditions but it wont do it
    // after the simulation it will show the bankroll chart and show the ROI and AV in terms of rounds per hour
    // demo the total dollars per count chart
    // demo the the % ROI per count
    // demo the other one
    // demo the replay feature from the bankroll chart
    // do NOT dive deep on anything other than running the simulation
    // mention "beyondSimulations"
    // Variations of blackjack
    blackjackVariations: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Variations amy be beatable, 
    // you need a basic strategy chart,
    // a deviation chart
    // EV expectations
    beyondSimulations: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // lives o home page
    // practice, 
    // speed practice 
    // deviation chart creation, 
    // insurance analysis (EV on insurance) at each count
    // "What if" with the bet spreads 
    // Do not go into detail on any of these save that for videos on those pages


    // MAKE A HOW TO CREATE A SIMULATION PAGE. 
    buildATable: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Select players and conditions for a table then run a simulation with those players.
    // Create a table just to erase it
    buildAPlayerUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Select strategies, configurations and behaviors to build several players
    // Build a player to erase it
    // Add a player to a table, select that table in a siulation, run a simulation
    // What happens to a table if a player associated with it is deleted?
    // Do not get into deleting a player, save that for a video on the player page
    // Mention to see videos on how to configure strategies, go to 
    configurePlayingConditions: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Demo configuring conditions, 
    // make a table with the new conditions
    // run a sim with the new conditions
    // Do not get into special conditions - save that for a video on the conditions page,
  }

  openModal(key: string) {
    this.activeUrl$.next(this.videoUrls[key]);
    this.showModal$.next(true);
  }

  closeModal() {
    this.activeUrl$.next('');
    this.showModal$.next(false);
  }
}