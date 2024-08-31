import { Table } from "./table.class"

export class InvestmentsTable extends Table {
  constructor(columns: string[], rows: string[][]) {
    super(columns, rows, [3, 2, 1]);
  }
};