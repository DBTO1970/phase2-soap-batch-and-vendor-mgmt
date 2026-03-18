"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) setStatus("Success! Now go to /login");
    else setStatus("Error creating user");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-4 max-w-sm mx-auto">
      <h1>Create Admin Account</h1>
      <label htmlFor="name">Name</label>
      <input name="name" placeholder="Name" className="border p-2 text-black" />
      <label htmlFor="email">Email</label>
      <input name="email" type="email" placeholder="Email" className="border p-2 text-black" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" placeholder="Password" className="border p-2 text-black" />
      <button type="submit" className="bg-green-600 text-white p-2">Register</button>
      <p>{status}</p>
    </form>
  );
}