export interface BatchLabelItem {
  id: string | number;
  quantity: number;
}

export type PrintableBatch<TBatch extends BatchLabelItem> = TBatch & {
  _printIndex: number;
  key: string;
};

export function expandBatchesForPrinting<TBatch extends BatchLabelItem>(
  selectedItems: TBatch[],
): Array<PrintableBatch<TBatch>> {
  const expandedItems: Array<PrintableBatch<TBatch>> = [];

  selectedItems.forEach((item, batchIndex) => {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 0) {
      throw new RangeError(`Batch ${item.id} quantity must be a non-negative integer.`);
    }

    for (let printIndex = 0; printIndex < item.quantity; printIndex += 1) {
      expandedItems.push({
        ...item,
        _printIndex: printIndex,
        key: JSON.stringify([typeof item.id, item.id, batchIndex, printIndex]),
      });
    }
  });

  return expandedItems;
}
