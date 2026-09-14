-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_batchId_fkey";

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "description" TEXT,
ALTER COLUMN "batchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "SoapBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
