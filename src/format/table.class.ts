import { table } from 'table';

export abstract class Table {
  constructor(private columns: string[], 
              private rows: string[][], 
              private columnsOrder: number[]) {
    this.setOrderToColumns(this.columnsOrder);
  }

  toString(): string {
    const tableResult = [this.columns, ...this.rows];
    return '<pre>' + table(tableResult) + '</pre>';
  }
  
  setOrderToColumns(columnsOrder: number[]) {
    if (columnsOrder.length > this.columns.length) {
      throw new Error('length of columnsOrder is greater than expected');
    }

    const lengthOfColumnsOrder = columnsOrder.length;
    const sizeOfSetColumnsOrder = new Set(columnsOrder).size;

    if (lengthOfColumnsOrder !== sizeOfSetColumnsOrder) {
      throw new Error('ColumnsOrder has duplicate value');
    }

    const hasIncorrectValue = columnsOrder.some(value => value < 0 
                                                          || value > this.columns.length 
                                                          || !Number.isInteger(value));
    if (hasIncorrectValue) {
      throw new Error('length of columnsOrder has incorrect value');
    }

    this.columns = columnsOrder.reduce((acc: string[], 
                                        current: number, 
                                        index: number) => {
      acc[current - 1] = this.columns[index];
      return acc;
    }, []);

    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = columnsOrder.reduce((acc: string[], 
                                          current: number, 
                                          index: number) => {
        acc[current - 1] = this.rows[i][index];
        return acc;
      }, []);
    }
  }
}