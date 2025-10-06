import { Injectable } from '@angular/core';
import { LocalStorageKeys, LocalStorageVariationKeys } from '../models';
import { LocalStorageItemsEnum } from '../models-constants-enums/enumerations';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  defaultStrategyMap: any = {
    [LocalStorageItemsEnum.CONDITIONS]: 'Default Conditions',
    [LocalStorageItemsEnum.TIPPING]: 'Never Tips',
    [LocalStorageItemsEnum.BET_SPREAD]: 'No Spread',
    [LocalStorageItemsEnum.WONG]: 'Never Wong',
    [LocalStorageItemsEnum.UNIT_RESIZE]: 'Never Resize',
    [LocalStorageItemsEnum.PLAY]: 'Basic H17',
    [LocalStorageItemsEnum.COUNT]: 'No Count',
  }

  strategiesOfPlayer = [
    LocalStorageItemsEnum.TIPPING, 
    LocalStorageItemsEnum.BET_SPREAD, 
    LocalStorageItemsEnum.WONG, 
    LocalStorageItemsEnum.UNIT_RESIZE, 
    LocalStorageItemsEnum.PLAY, 
    LocalStorageItemsEnum.COUNT
  ];

  saveActiveStrategy$: Subject<any> = new Subject<any>;

  constructor() {
    this.saveActiveStrategy$.pipe()
      .subscribe(({ variation, configurationType, strategy}) => this.setItemOfVariation(variation, configurationType, strategy));
  }

  setItem(key: any, value: any): void {
  // This is used for values that are not variation specific
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: any) {
  // This is used for values that are not variation specific
    let item: string = localStorage.getItem(key) as string;
    if(item) {
      return JSON.parse(item);
    }
    this.setItem(key, {});
    item = localStorage.getItem(key) as string;
    return JSON.parse(item);
  }
  
  getItemOfVariation(itemKey: LocalStorageItemsEnum, variationKey: LocalStorageVariationKeys) {
  // Returns a child object of a variation
    let variation = JSON.parse(localStorage.getItem(variationKey));
    if(variation) {
      if(variation[itemKey]) {
        return variation[itemKey];
      }
      this.setItemOfVariation(variationKey, itemKey, {})
      return {};
    }
    this.setItem(variationKey,  JSON.stringify(this.getNewVariation()));
    variation = JSON.parse(localStorage.getItem(variationKey));
    return variation[itemKey];
  }

  deleteStrategy(variationKey: LocalStorageVariationKeys, itemKey: LocalStorageItemsEnum, strategies: any, strategyName: string) {
    // The new storedStrategies are configured by the caller
    let variation = JSON.parse(localStorage.getItem(variationKey)) || {};
    if(typeof variation === "string") {
      variation = JSON.parse(variation)
    }
    variation[itemKey] = { ...strategies };
    localStorage.setItem(variationKey, JSON.stringify(variation));
    // When deleting a strategy, all the players that use the strategy must adjust. Those users will use the default strategy.
  }

  getNewVariation() {
    return {
      conditions: {},
      tipping: {},
      betSpread: {},
      wong: {},
      unitResize: {},
      play: {},
      count: {}
    }
  }

  setItemOfVariation(variationKey: LocalStorageVariationKeys, itemKey: LocalStorageItemsEnum, value: any) {
    // This will work with strategies because strategy objects have a title
    let variation = JSON.parse(localStorage.getItem(variationKey)) || {};
    if(typeof variation === "string") {
      variation = JSON.parse(variation)
    }
    variation[itemKey] = { ...variation[itemKey], [value.title]: value };
    localStorage.setItem(variationKey, JSON.stringify(variation));
  }

  getPreferredVariation() {
    let variationObj = this.getItem(LocalStorageKeys.VARIATION);
    if(Object.keys(variationObj).length === 0) {
      this.setItem(LocalStorageKeys.VARIATION, 'home');
      variationObj = 'home';
    }
    return variationObj;
  }

  setPreferredVariation(variation: string) {
    this.setItem(LocalStorageKeys.VARIATION, variation);
  }
}

//   deleteStrategy(storedStrategies: any, activeStrategyTitle: string, strategyEnum: LocalStorageItemsEnum): void {
//     let filteredStrategies: any = {};
//     const filteredStoredStrategiesTitles = Object.keys(storedStrategies)
//       .filter(title => title !== activeStrategyTitle);
//     filteredStoredStrategiesTitles.forEach(title => filteredStrategies[title] = storedStrategies[title]);
//     this.setItem(strategyEnum, filteredStrategies);
//     this.deleteStrategyFromPlayer(strategyEnum, activeStrategyTitle);
//     this.deleteConditionFromTable(strategyEnum, activeStrategyTitle);
//     this.deletePlayerFromTable(strategyEnum, activeStrategyTitle);
//   }

//   saveStrategy(activeStrategy: any, storedStrategies: any, strategyEnum: LocalStorageItemsEnum): void {
//     if(activeStrategy.title.length > 2) {
//       const newStrategy= { ...storedStrategies, [activeStrategy.title]: activeStrategy }
//       this.setItem(strategyEnum, newStrategy);
//     }
//   }

//   private deleteStrategyFromPlayer(targetEnum: LocalStorageItemsEnum, targetTitle: string) {
//     if(this.strategiesOfPlayer.includes(targetEnum)) {
//       const strategyPropertyMap: any = {
//         [LocalStorageItemsEnum.TIPPING]: 'tippingStrategyTitle',
//         [LocalStorageItemsEnum.BET_SPREAD]: 'betSpreadStrategyTitle',
//         [LocalStorageItemsEnum.WONG]: 'wongingStrategyTitle',
//         [LocalStorageItemsEnum.UNIT_RESIZE]: 'unitResizingStrategyTitle',
//         [LocalStorageItemsEnum.PLAY]: 'playStrategyTitle',
//         [LocalStorageItemsEnum.COUNT]: 'countStrategyTitle',
//       }
//       const targetProperty: any = strategyPropertyMap[targetEnum];
//       const playersObj = this.getItem(LocalStorageItemsEnum.PLAYER_CONFIG);
//       const playerTitles = Object.keys(playersObj);
//       playerTitles.forEach(pt => {
//         if(playersObj[pt][targetProperty] === targetTitle) {
//           playersObj[pt][targetProperty] = this.defaultStrategyMap[targetEnum];
//         }
//       })
//       this.setItem(LocalStorageItemsEnum.PLAYER_CONFIG, playersObj);
//     }
//   }

//   private deleteConditionFromTable(targetEnum: LocalStorageItemsEnum, targetTitle: string) {
//     if(targetEnum === LocalStorageItemsEnum.CONDITIONS) {
//       const tablesObj = this.getItem(LocalStorageItemsEnum.TABLE_CONFIG);
//       const tableTitles = Object.keys(tablesObj);
//       tableTitles.forEach(tt => {
//         if(tablesObj[tt]['conditionsTitle'] === targetTitle) {
//           tablesObj[tt]['conditionsTitle'] = this.defaultStrategyMap[targetEnum];
//         }
//       })
//       this.setItem(LocalStorageItemsEnum.TABLE_CONFIG, tablesObj);
//     }
//   }

//   private deletePlayerFromTable(targetEnum: LocalStorageItemsEnum, targetTitle: string) {
//     if(targetEnum === LocalStorageItemsEnum.PLAYER_CONFIG) {
//       const tablesObj = this.getItem(LocalStorageItemsEnum.TABLE_CONFIG);
//       const tableTitles = Object.keys(tablesObj);
//       tableTitles.forEach(tt => {
//         tablesObj[tt]['players'] = tablesObj[tt]['players']
//           .filter((p: any) => p.playerConfigTitle !== targetTitle)
//       })
//       this.setItem(LocalStorageItemsEnum.TABLE_CONFIG, tablesObj);
//     }
//   }
// }