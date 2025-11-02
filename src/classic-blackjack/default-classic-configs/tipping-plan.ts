import { TippingPlan } from "../classic-models/classic-strategies.models";

export const cheapTipper: TippingPlan = {
  title: "Cheap Tipper",
  tippingBreakpoints: [ [1, 50], [2, 500] ],
  maxTip: 2,
  afterBlackjack: true,
  dealerJoins: true,
  dealerLeaves: true,
  tipFirstHandOfShoe: false,
  everyXHands: null,
  tipSplitHandToo: false,
  doubleDownTip: false,
  tipWongHands: false,
  insureTip: false,
};

export const generousTipper: TippingPlan = {
  title: "Generous Tipper",
  tippingBreakpoints: [ [1, 25], [2, 50], [3, 100], [5, 250], [10, 500], [25, 1000] ],
  maxTip: 50,
  afterBlackjack: true,
  dealerJoins: true,
  dealerLeaves: true,
  tipFirstHandOfShoe: true,
  everyXHands: 10, 
  tipSplitHandToo: true,
  doubleDownTip: true,
  tipWongHands: true,
  insureTip: true,
};

export const neverTips: TippingPlan = {
  title: "Never Tips",
  tippingBreakpoints: [ [0, 0] ],
  maxTip: 0,
  afterBlackjack: false,
  dealerJoins: false,
  dealerLeaves: false,
  tipFirstHandOfShoe: false,
  everyXHands: null, 
  tipSplitHandToo: false,
  doubleDownTip: false,
  tipWongHands: false,
  insureTip: false,
};

export const classicTippingTitles: string[] = [
  "Cheap Tipper", 
  "Generous Tipper", 
  "Never Tips"
];

export const classicTippingPlans: { [k: string]: TippingPlan } = {
  "Cheap Tipper": cheapTipper, 
  "Generous Tipper": generousTipper, 
  "Never Tips": neverTips,
}

export const classicDefaultTippingPlan = neverTips;