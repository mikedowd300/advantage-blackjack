
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageItemsEnum, LocalStorageVariationKeys, playerFirst2 } from '../../models';
import { deviationFinder } from '../../classic-blackjack/default-classic-configs/play-strategies/deviation-finder';

@Injectable({
  providedIn: 'root'
})
export class PlayChartDataStorageService {
  playStrategy: any = null;
  deviationF2cData: any = null;
  allDeviationData: any;
  variation: LocalStorageVariationKeys = LocalStorageVariationKeys.CLASSIC;
  playStorageItem: LocalStorageItemsEnum = LocalStorageItemsEnum.PLAY;
  deviationStorageItem: LocalStorageItemsEnum = LocalStorageItemsEnum.DEVIATION_CHART;
  dealersUpCards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
  deviationDataTitle: string;
  f2c: string;

  constructor(private localStorageService: LocalStorageService) {}

  handleSimStart(playTitle: string, deviationDataTitle: string, f2c: string) {
    this.deviationDataTitle = deviationDataTitle;
    this.f2c = f2c;
    this.playStrategy = this.playStrategy || this.getPlayStrategy(playTitle);
    this.deviationF2cData = this.getDeviationData(deviationDataTitle);
  }

  handleSimEnd(deviationChartKey: string) {
    this.playStrategy = null;
    let deviationData = this.localStorageService.getItemOfItemOfVariation(this.variation , this.deviationStorageItem, this.deviationDataTitle);
    deviationData[this.f2c] = this.deviationF2cData;
    this.logScopedF2cObject(this.deviationF2cData);
    this.allDeviationData = deviationData;
    this.localStorageService.setItemOfVariation(this.variation, this.deviationStorageItem, deviationData, deviationChartKey);
  }

  logScopedF2cObject(f2cData) {
    let scopedObj = {};

    Object.keys(f2cData).forEach(uc => {
      Object.keys(f2cData[uc]).forEach(key => scopedObj[uc] = {});
      Object.keys(f2cData[uc])
        .map(key => parseInt(key))
        .filter(key => key <= 15 && key >= -15)
        .map(key => key.toString())
        .forEach(key => scopedObj[uc][key] = { ...f2cData[uc][key] });
    })
    console.log(JSON.stringify(scopedObj));
  }

  getPlayStrategy(title: string) {
    return this.playStrategy 
    || this.localStorageService.getItemOfItemOfVariation(this.variation , this.playStorageItem, title) 
    || { ...deviationFinder, title };
  }

  getDeviationData(title: string) {
    return this.localStorageService.getItemOfItemOfVariation(this.variation , this.deviationStorageItem, title)[this.f2c];
  }

  updateDeviationData(f2c: string, upCard: string, count: string, action: string, amount: number) {
    const f2cRay: string[] = f2c.split('');
    const includeSplit: boolean = f2cRay.length === 2 && f2cRay[0] === f2cRay[1] && f2c !== '11';
    if(!this.deviationF2cData[upCard][count]) {
      this.deviationF2cData[upCard][count] = {
        double: { instances: 0, totalWon: 0 },
        hit: { instances: 0, totalWon: 0 },
        stay: { instances: 0, totalWon: 0 },
      }
      if(includeSplit) {
        this.deviationF2cData[upCard][count].split = { instances: 0, totalWon: 0 };
      }
    }
    this.deviationF2cData[upCard][count][action].instances += 1;
    this.deviationF2cData[upCard][count][action].totalWon += amount;
  }

  getNewDeviationChart() {
    let chartObj = {};
    playerFirst2.forEach(f2c => chartObj[f2c] = this.getF2CObject(f2c))
    return chartObj;
  }

  getF2CObject(f2c: string) {
    const f2cRay: string[] = f2c.split('');
    let isSplittable: boolean = f2cRay.length === 2 && f2cRay[0] === f2cRay[1] && f2c !== '11';
    let pwcObj = {};
    this.dealersUpCards.forEach(du => {
      pwcObj[du] = { '0': { 
        hit: { instances: 0, totalWon: 0 },
        stay: { instances: 0, totalWon: 0 },
        double: { instances: 0, totalWon: 0 },
      }}
      if(isSplittable) {
        pwcObj[du]['0'].split = { instances: 0, totalWon: 0 };
      }
    })
    return pwcObj;
  }
}
