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
      .subscribe(({ variation, configurationType, strategy, title}) => this.setItemOfVariation(variation, configurationType, strategy, title));
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
  // If variationKey doesnt even exist, 
    if(!localStorage.getItem(variationKey)) {
      this.setItem(variationKey,  this.getNewVariation());
    }
    let variation = JSON.parse(localStorage.getItem(variationKey));
    if(!variation[itemKey]) {
      variation[itemKey] = {}
    }
    return variation[itemKey];
  }

  getItemOfItemOfVariation(
    variationKey: LocalStorageVariationKeys,
    itemKey: LocalStorageItemsEnum,
    key: string) 
  {
    return this.getItemOfVariation(itemKey, variationKey)[key];
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

  deleteStrategyByName(variationKey: LocalStorageVariationKeys, itemKey: LocalStorageItemsEnum, strategyName: string) {
    const newObj = {};
    let variation = JSON.parse(localStorage.getItem(variationKey)) || {};
    if(typeof variation === "string") {
      variation = JSON.parse(variation)
    }
    const names = Object.keys(variation[itemKey]).filter(key => key !== strategyName);
    names.forEach(name => newObj[name] = variation[itemKey][name]);
    variation[itemKey] = { ...newObj };
    this.setItem(variationKey, variation);
  }

  deleteChartCreatorsListByChartName(variationKey: LocalStorageVariationKeys, chartName: string) {
    const list = this.getItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP);
    let newList = {};
    const listNames = Object.keys(list);
    listNames.forEach(ln => {
      if(ln !== chartName && list[ln].split('-')[0] === variationKey) {
        newList[ln] = list[ln];
      }
    })
    this.setItem(LocalStorageItemsEnum.CHART_CREATORS_CONFIG_MAP, newList);
  }

  getNewVariation() {
    return {
      conditions: {},
      tipping: {},
      betSpread: {},
      wong: {},
      unitResize: {},
      play: {},
      count: {},
      insurance: {}
    }
  }

  setItemOfVariation(variationKey: LocalStorageVariationKeys, itemKey: LocalStorageItemsEnum, value: any, title: string = null) {
    // This will work with strategies because strategy objects have a title
    let variation = JSON.parse(localStorage.getItem(variationKey)) || {};
    if(typeof variation === "string") {
      variation = JSON.parse(variation)
    }
    variation[itemKey] = { ...variation[itemKey], [value.title || title]: value };
    localStorage.setItem(variationKey, JSON.stringify(variation));
  }

  setBaseItemOfVariation(variationKey: LocalStorageVariationKeys, itemKey: LocalStorageItemsEnum, value: any) {
    let variation = JSON.parse(localStorage.getItem(variationKey)) || {};
    variation[itemKey] = { ...value };
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