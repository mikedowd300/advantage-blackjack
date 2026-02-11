import { TableConfig } from "../doubleup-models/doubleup-strategies.models";

export const doubleupPloppiesTable: TableConfig = {
  title: "Two Ploppies",
  players: [
    {
      seatNumber: 4,
      playerConfigTitle: 'Ploppy Joe',
    },
    {
      seatNumber: 5,
      playerConfigTitle: 'Ploppy Too',
    }
  ],
  conditionsTitle: "Default Conditions",
};

export const doubleupPloppyTable: TableConfig = {
  title: "One Ploppy",
  players: [
    {
      seatNumber: 3,
      playerConfigTitle: 'Ploppy Joe',
    },
  ],
  conditionsTitle: "Normal Conditions",
};

export const doubleupTableTitles: string[] = [
  "Two Ploppies",
  "One Ploppy",
];

export  const doubleupTables: { [k: string]: TableConfig } = {
  "Two Ploppies": doubleupPloppiesTable,
  "One Ploppy": doubleupPloppyTable,
};

export const doubleupDefaultTable = doubleupPloppiesTable;