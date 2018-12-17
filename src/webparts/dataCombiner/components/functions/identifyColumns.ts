

export function identifyColumns(items: Array<any>, newItem: any): string[] {
    const columns: string[] = [];
    const item1Columns: string[] = [];
    items.forEach(item => {
        Object.keys(item).forEach(column => {
            if (item1Columns.indexOf(column) === -1) {
            item1Columns.push(column);
            }
        });
    });
    const item2Columns: string[] = Object.keys(newItem);
    item1Columns.forEach((column) => {
        if (item2Columns.indexOf(column) === -1) {
            columns.push(column);
        }
    });
    return columns;
  }