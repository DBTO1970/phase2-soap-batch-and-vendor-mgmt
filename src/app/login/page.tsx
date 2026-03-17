"use client";

// import { signInAction } from "../actions/auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // We handle redirect manually to catch errors
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/batches");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" required className="block border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" required className="block border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Sign In</button>
      </form>
    </div>
  );
}