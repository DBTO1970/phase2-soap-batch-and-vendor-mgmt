import { jsPDF } from 'jspdf';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  price: number;
}

/**
 * Generates and downloads an invoice PDF.
 * This should be called from a client-side component.
 */
export const downloadInvoicePDF = (clientName: string, company: string, items: InvoiceLineItem[], notes?: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const invoiceId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;

  // Header
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Business Info
  doc.setFontSize(10);
  doc.text('Morning Ritual Soap', 20, 40);
  doc.text('8710 Oxwell Ln', 20, 50);
  doc.text('Laurel, MD 20708', 20, 55);
  doc.text('contact@morningritualsoap.com', 20, 45);

  // Client Info
  doc.text(`Bill To: ${clientName}`, 20, 60);
  doc.text(`Company: ${company || ''}`, 20, 65);
  doc.text(`Date: ${date}`, 140, 60);
  doc.text(`Invoice #: ${invoiceId}`, 140, 65);

  // Items Table
  let currentY = 80;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text('Item Description', 20, currentY);
  doc.text('Qty', 110, currentY);
  doc.text('Price', 135, currentY);
  doc.text('Total', 165, currentY);
  doc.line(20, currentY + 2, 190, currentY + 2);
  
  doc.setFont("helvetica", "normal");
  currentY += 10;
  let grandTotal = 0;

  items.forEach(item => {
    const lineTotal = item.quantity * item.price;
    grandTotal += lineTotal;
    doc.text(item.description, 20, currentY);
    doc.text(item.quantity.toString(), 110, currentY);
    doc.text(`$${item.price.toFixed(2)}`, 135, currentY);
    doc.text(`$${lineTotal.toFixed(2)}`, 165, currentY);
    currentY += 8;
  });

  // Notes / Description
  if (notes) {
    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.text('Notes:', 20, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(notes, 20, currentY + 5, { maxWidth: 170 });
  }

  // Total
  const totalY = Math.max(currentY + 20, 150);
  doc.line(130, totalY - 5, 190, totalY - 5);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount Due: $${grandTotal.toFixed(2)}`, 130, totalY);

  doc.save(`${invoiceId}_${company.replace(/\s+/g, '_')}.pdf`);
};
