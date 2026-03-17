"use client";

import { signIn } from "next-auth/react"; // Use the client-side version
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // This handles the CSRF token automatically!
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/batches", 
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-md space-y-4 bg-white">
        <h1 className="text-xl font-bold">Admin Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          className="block border p-2 w-full rounded text-black" 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          className="block border p-2 w-full rounded text-black" 
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}