"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import BatchLabelSelector, {
  type BatchLabelBatch,
} from "../../components/BatchLabelSelector";
import {
  expandBatchesForPrinting,
  type PrintableBatch,
} from "@/lib/batch-labels";

const SoapLabelPDFDownload = dynamic(
  () => import("../../components/SoapLabelPDF").then((module) => module.SoapLabelPDFDownload),
  {
    ssr: false,
    loading: () => <span className="text-sm text-gray-500">Loading PDF tools...</span>,
  },
);

interface BatchLabelPrintClientProps {
  batches: BatchLabelBatch[];
}

export default function BatchLabelPrintClient({
  batches,
}: BatchLabelPrintClientProps) {
  const [printItems, setPrintItems] = useState<
    Array<PrintableBatch<BatchLabelBatch & { quantity: number }>> | null
  >(null);

  const generateLabels = (selectedItems: Array<BatchLabelBatch & { quantity: number }>) => {
    setPrintItems(expandBatchesForPrinting(selectedItems));
  };

  return (
    <div className="space-y-6">
      <BatchLabelSelector batches={batches} onGenerate={generateLabels} />
      {printItems && (
        <section
          aria-live="polite"
          className="flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Label sheet ready
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {printItems.length} individual {printItems.length === 1 ? "label" : "labels"}.
            </p>
          </div>
          <SoapLabelPDFDownload items={printItems} />
        </section>
      )}
    </div>
  );
}
