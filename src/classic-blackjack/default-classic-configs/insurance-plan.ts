import { InsurancePlan } from "../classic-models/classic-strategies.models";

export const neverInsure: InsurancePlan = {
  title: "Never Insure",
  alwaysInsure: false,
  neverInsure: true,
  atTCof: null,
};

export const alwaysInsure: InsurancePlan = {
  title: "Always Insure",
  alwaysInsure: true,
  neverInsure: false,
  atTCof: null,
};

export const insureAbove3: InsurancePlan = {
  title: "Insure Above True 3",
  alwaysInsure: false,
  neverInsure: false,
  atTCof: 3,
};

export const classicInsuranceTitles: string[] = [
  'Never Insure', 
  'Always Insure', 
  'Insure Above True 3',
];

export const classicInsurancePlans: { [k: string]: InsurancePlan } = {
  'Never Insure': neverInsure, 
  'Always Insure': alwaysInsure, 
  'Insure Above True 3': insureAbove3, 
};

export const classicDefaultInsurancePlan: InsurancePlan = neverInsure;