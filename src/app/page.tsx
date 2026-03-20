import Image from "next/image";
import  Batches  from "./components/Batches";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Welcome to Morning Rituals Soap Manager
        </h1>
        <div className="mt-10 flex w-full items-center justify-center rounded-xl border bg-gray-100 p-6 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
         
          <p className="text-lg">
            This is a simple application to manage your soap inventory, wholesale customers and their orders. You can
            add, edit, and delete your soap products with ease.  You can also manage your wholesale customers and their orders.  This application is built with Next.js, Prisma, and Tailwind CSS.  It is a great example of how to build a full-stack application with these technologies.
          </p>
        </div>
      </main>
    </div>
  );
}
