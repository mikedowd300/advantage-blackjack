import { TableConfig } from "../classic-models/classic-strategies.models";

export const classicDefaultTable: TableConfig = {
  title: "Default Table",
  players: [
    {
      seatNumber: 4,
      playerConfigTitle: 'Ploppy 1',
    },
    {
      seatNumber: 5,
      playerConfigTitle: 'Ploppy 2',
    }
  ],
  conditionsTitle: "Normal Conditions",
};

export const classicTableTitles: string[] = [
  "Default Table",
];

export  const classicTables: { [k: string]: TableConfig } = {
  "Default Table": classicDefaultTable,
}