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
    beyondSimulations: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // lives o home page
    // practice, 
    // speed practice 
    // deviation chart creation, 
    // insurance analysis (EV on insurance) at each count
    // "What if" with the bet spreads 
    // Do not go into detail on any of these save that for videos on those pages
    runASimulationUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',

    buildATableUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Select players and conditions for a table then run a simulation with those players.
    // Create a table just to erase it
    buildAPlayerUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Select strategies, configurations and behaviors to build several players
    // Build a player to erase it
    // Add a player to a table, select that table in a siulation, run a simulation
    // What happens to a table if a player associated with it is deleted?
    // Do not get into deleting a player, save that for a video on the player page
    // Mention to see videos on how to configure strategies, go to 
    setConditionsUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    // Demo configuring conditions, 
    // make a table with the new conditions
    // run a sim with the new conditions
    // Do not get into special conditions - save that for a video on the conditions page,
    createABetSpreadUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    makeAUnitResizingStrategyUrl: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
    createCustomChart: 'https://www.youtube.com/embed/P6pFdeZg8LI?si=ggmaWNxzoHticL6C',
  }

  openModal(key: string) {
    console.log(key);
    console.log(this.videoUrls[key]);
    this.activeUrl$.next(this.videoUrls[key]);
    this.showModal$.next(true);
  }

  closeModal() {
    this.activeUrl$.next('');
    this.showModal$.next(false);
  }
}