import { TableConfig } from "../classic-models/classic-strategies.models";

export const classicPloppiesTable: TableConfig = {
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

export const classicPloppyTable: TableConfig = {
  title: "One Ploppy",
  players: [
    {
      seatNumber: 3,
      playerConfigTitle: 'Ploppy Joe',
    },
  ],
  conditionsTitle: "Normal Conditions",
};

export const classicTableTitles: string[] = [
  "Two Ploppies",
  "One Ploppy",
];

export  const classicTables: { [k: string]: TableConfig } = {
  "Two Ploppies": classicPloppiesTable,
  "One Ploppy": classicPloppyTable,
};

export const defaultClassicTable = classicPloppiesTable;