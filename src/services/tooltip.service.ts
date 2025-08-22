import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  public tooltipCloser$: Subject<void> = new Subject<void>;
  public activeId$: Subject<string> = new Subject<string>;

  constructor() { }
}