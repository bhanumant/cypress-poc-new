import BasePage from './BasePage';

class DataTablePage extends BasePage {
  readonly table1 = '#t01';
  readonly table2 = '#t02';
  readonly traversalTable = '.traversal-table';
  readonly table1Ages = '#t01 tr td:nth-child(3)';
  readonly table2Ages = '#t02 tr td:nth-child(3)';

  getTableColumnData(tableSelector: string, colIndex: number) {
    return this.getElement(`${tableSelector} tr td:nth-child(${colIndex})`);
  }
}

export default new DataTablePage();
