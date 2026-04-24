"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClients() {
  return await prisma.client.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getInventory() {
  return await prisma.soapBatch.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;

  await prisma.client.create({
    data: {
      name,
      email,
      company,
    },
  });

  revalidatePath("/admin/clients");
}

export async function saveInvoice(clientId: string, items: any[], notes: string) {
  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  const invoice = await prisma.$transaction(async (tx) => {
    // 1. Validate and update inventory for each line item
    for (const item of items) {
      const batch = await tx.soapBatch.findUnique({
        where: { id: item.batchId }
      });

      if (!batch) throw new Error(`Soap batch ${item.batchId} not found.`);

      const totalAvailable = (batch.onHandLabeled ?? 0) + (batch.onHandUnlabeled ?? 0);
      if (item.quantity > totalAvailable) {
        throw new Error(`Insufficient stock for ${batch.name}. Available: ${totalAvailable}, Requested: ${item.quantity}`);
      }

      let remainingToDeduct = item.quantity;
      let newLabeled = batch.onHandLabeled ?? 0;
      let newUnlabeled = batch.onHandUnlabeled ?? 0;

      // Deduct from labeled stock first
      const labeledDeduction = Math.min(newLabeled, remainingToDeduct);
      newLabeled -= labeledDeduction;
      remainingToDeduct -= labeledDeduction;

      // Deduct remaining from unlabeled stock if necessary
      if (remainingToDeduct > 0) {
        const unlabeledDeduction = Math.min(newUnlabeled, remainingToDeduct);
        newUnlabeled -= unlabeledDeduction;
        remainingToDeduct -= unlabeledDeduction;
      }

      await tx.soapBatch.update({
        where: { id: item.batchId },
        data: {
          onHandLabeled: newLabeled,
          onHandUnlabeled: newUnlabeled
        }
      });
    }

    // 2. Create the Invoice
    return await tx.invoice.create({
      data: {
        clientId,
        amount: totalAmount,
        notes,
        status: "PENDING",
        items: {
          create: items.map(item => ({
            batchId: item.batchId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: {
        items: { include: { batch: true } }
      }
    });
  });

  revalidatePath("/admin/clients");
  return invoice;
}

export async function getInvoicesForClient(clientId: string) {
  return await prisma.invoice.findMany({
    where: { clientId },
    include: {
      items: {
        include: {
          batch: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status }
  });
  revalidatePath("/admin/clients");
}

export async function deleteInvoice(invoiceId: string) {
  await prisma.invoiceItem.deleteMany({ where: { invoiceId } });
  await prisma.invoice.delete({ where: { id: invoiceId } });
  revalidatePath("/admin/clients");
}

export async function updateClient(id: string, name: string, email: string, company: string) {
  await prisma.client.update({
    where: { id },
    data: { name, email, company },
  });
  revalidatePath("/admin/clients");
}

export async function deleteClient(id: string) {
  await prisma.invoiceItem.deleteMany({
    where: { invoice: { clientId: id } }
  });
  await prisma.invoice.deleteMany({
    where: { clientId: id }
  });
  await prisma.client.delete({
    where: { id }
  });
  revalidatePath("/admin/clients");
}