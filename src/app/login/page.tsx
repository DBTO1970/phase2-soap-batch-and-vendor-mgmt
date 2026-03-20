"use client";

import { signIn } from "next-auth/react"; // Use the client-side version
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // This handles the CSRF token automatically!
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/inventory", 
    });
    if (error) {
      setError("Login failed. Check your credentials.");
      setLoading(false);
    }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-md space-y-4 bg-white dark:bg-gray-800 ">
        <h1 className="text-xl font-bold text-black dark:text-white">Admin Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          className="block border p-2 w-full rounded text-black dark:text-white" 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          className="block border p-2 w-full rounded text-black dark:text-white" 
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