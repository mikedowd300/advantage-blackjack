import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    let item: string = localStorage.getItem(key) as string;
    if(item) {
      return JSON.parse(item);
    }
    this.setItem(key, {});
    item = localStorage.getItem(key) as string;
    return JSON.parse(item);
  }

  getVariation() {
    let variationObj = this.getItem(LocalStorageKeys.VARIATION);
    if(Object.keys(variationObj).length === 0) {
      this.setItem(LocalStorageKeys.VARIATION, 'home');
      variationObj = 'home';
    }
    return variationObj;
  }

  setVariation(variation: string) {
    console.log(variation);
    this.setItem(LocalStorageKeys.VARIATION, variation);
  }
}