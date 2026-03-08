"use client";

import { signInAction } from "../actions/auth";

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  
  if (!email) return;

  const response = await signInAction(email);
  
  // Check if response exists before reading it!
  if (response?.success) {
    console.log("Logged in!", email);
  } else {
    console.error("Login failed or no response received");
  }
};

  return (
    <form onSubmit={handleLogin}>
        <input name="email" type="email" required />
        <button type="submit">Sign In</button>
    </form>
  );
}