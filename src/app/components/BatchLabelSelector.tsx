"use client";

import { useState } from "react";

export interface BatchLabelBatch {
  id: string | number;
  ProductName: string;
  Ingredients: string;
  NetWeight?: string | number;
  barCount?: number;
  onHandLabeled?: number | null;
  onHandUnlabeled?: number | null;
}

interface BatchLabelSelectorProps<TBatch extends BatchLabelBatch> {
  batches: TBatch[];
  onGenerate: (selectedItems: Array<TBatch & { quantity: number; NetWeight: number }>) => void;
}

function getDefaultQuantity(batch: BatchLabelBatch): number {
  const count = batch.barCount ??
    (batch.onHandLabeled ?? 0) + (batch.onHandUnlabeled ?? 0);

  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 1;
}

export default function BatchLabelSelector<TBatch extends BatchLabelBatch>({
  batches,
  onGenerate,
}: BatchLabelSelectorProps<TBatch>) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [productNames, setProductNames] = useState<Record<string, string>>(() =>
    Object.fromEntries(batches.map((batch) => [String(batch.id), batch.ProductName])),
  );
  const [ingredients, setIngredients] = useState<Record<string, string>>(() =>
    Object.fromEntries(batches.map((batch) => [String(batch.id), batch.Ingredients])),
  );
  const [weights, setWeights] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      batches.flatMap((batch) => {
        const weight = batch.NetWeight;
        return weight !== undefined && weight !== "" && Number(weight) > 0
          ? [[String(batch.id), String(weight)]]
          : [];
      }),
    ),
  );
  const selectedCount = batches.filter((batch) => quantities[String(batch.id)] !== undefined).length;
  const allSelected = batches.length > 0 && selectedCount === batches.length;
  const allSelectedRowsAreValid = batches
    .filter((batch) => quantities[String(batch.id)] !== undefined)
    .every((batch) => {
      const id = String(batch.id);
      return productNames[id]?.trim() &&
        Number.isFinite(Number(weights[id])) &&
        Number(weights[id]) > 0;
    });

  const toggleBatch = (batch: TBatch, selected: boolean) => {
    const id = String(batch.id);
    setQuantities((current) => {
      if (!selected) {
        const next = { ...current };
        delete next[id];
        return next;
      }

      return {
        ...current,
        [id]: current[id] ?? getDefaultQuantity(batch),
      };
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setQuantities({});
      return;
    }

    setQuantities((current) => ({
      ...current,
      ...Object.fromEntries(
        batches.map((batch) => {
          const id = String(batch.id);
          return [id, current[id] ?? getDefaultQuantity(batch)];
        }),
      ),
    }));
  };

  const updateQuantity = (id: string, value: number) => {
    if (Number.isInteger(value) && value > 0) {
      setQuantities((current) => ({ ...current, [id]: value }));
    }
  };

  const updateWeight = (id: string, value: string) => {
    setWeights((current) => ({ ...current, [id]: value }));
  };

  const updateProductName = (id: string, value: string) => {
    setProductNames((current) => ({ ...current, [id]: value }));
  };

  const updateIngredients = (id: string, value: string) => {
    setIngredients((current) => ({ ...current, [id]: value }));
  };

  const generateLabels = () => {
    onGenerate(
      batches.flatMap((batch) => {
        const id = String(batch.id);
        const quantity = quantities[id];
        const weight = Number(weights[id]);
        const productName = productNames[id]?.trim();
        return quantity === undefined || !productName || !Number.isFinite(weight) || weight <= 0
          ? []
          : [{
            ...batch,
            ProductName: productName,
            Ingredients: ingredients[id] ?? "",
            quantity,
            NetWeight: weight,
          }];
      }),
    );
  };

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-300" aria-live="polite">
          {selectedCount} of {batches.length} batches selected
        </p>
        <button
          type="button"
          onClick={toggleAll}
          disabled={batches.length === 0}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <th scope="col" className="w-12 px-3 py-3">
                <span className="sr-only">Select batch</span>
              </th>
              <th scope="col" className="min-w-48 px-3 py-3">Product name</th>
              <th scope="col" className="min-w-80 px-3 py-3">Ingredients</th>
              <th scope="col" className="w-36 px-3 py-3">Bar weight (oz)</th>
              <th scope="col" className="w-36 px-3 py-3">Label quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {batches.map((batch) => {
              const id = String(batch.id);
              const isSelected = quantities[id] !== undefined;
              const checkboxId = `batch-label-${id}`;
              const nameId = `batch-label-name-${id}`;
              const ingredientsId = `batch-label-ingredients-${id}`;
              const quantityId = `batch-label-quantity-${id}`;
              const weightId = `batch-label-weight-${id}`;

              return (
                <tr key={id} className={isSelected ? "bg-blue-50/60 dark:bg-blue-950/30" : ""}>
                  <td className="px-3 py-3">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) => toggleBatch(batch, event.target.checked)}
                      aria-label={`Select ${productNames[id] || batch.ProductName}`}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <label className="sr-only" htmlFor={nameId}>Product name</label>
                    <input
                      id={nameId}
                      type="text"
                      value={productNames[id] ?? ""}
                      onChange={(event) => updateProductName(id, event.currentTarget.value)}
                      className="w-full rounded-md border border-gray-300 px-2 py-1.5 font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <label className="sr-only" htmlFor={ingredientsId}>
                      Ingredients for {productNames[id] || batch.ProductName}
                    </label>
                    <textarea
                      id={ingredientsId}
                      rows={2}
                      value={ingredients[id] ?? ""}
                      onChange={(event) => updateIngredients(id, event.currentTarget.value)}
                      className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <label className="sr-only" htmlFor={weightId}>
                      Bar weight in ounces for {batch.ProductName}
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        id={weightId}
                        type="number"
                        min={0.1}
                        step={0.1}
                        value={weights[id] ?? ""}
                        onChange={(event) => updateWeight(id, event.currentTarget.value)}
                        placeholder="e.g. 4"
                        className="w-24 rounded-md border border-gray-300 px-2 py-1.5 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-900"
                      />
                      <span className="text-gray-500 dark:text-gray-400">oz</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <label className="sr-only" htmlFor={quantityId}>
                      Label quantity for {batch.ProductName}
                    </label>
                    <input
                      id={quantityId}
                      type="number"
                      min={1}
                      step={1}
                      value={quantities[id] ?? 1}
                      disabled={!isSelected}
                      onChange={(event) => updateQuantity(id, event.currentTarget.valueAsNumber)}
                      className="w-24 rounded-md border border-gray-300 px-2 py-1.5 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-900"
                    />
                  </td>
                </tr>
              );
            })}
            {batches.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">
                  No batches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={generateLabels}
          disabled={selectedCount === 0 || !allSelectedRowsAreValid}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate Labels
        </button>
      </div>
      {selectedCount > 0 && !allSelectedRowsAreValid && (
        <p className="text-right text-sm text-amber-700 dark:text-amber-300">
          Enter a product name and weight greater than zero ounces for each selected batch to continue.
        </p>
      )}
    </section>
  );
}
