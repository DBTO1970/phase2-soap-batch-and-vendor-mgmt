"use client";

import { useState } from "react";
import { signInAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!email) {
      setError("Email is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await signInAction(email);
      if (result.success) {
        // On successful sign-in, redirect to the batches page.
        console.log("Sign in successful, redirecting to /batches...");
        router.push("/batches");
      } else {
        setError(result.message || "An unknown error occurred.");
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to sign in. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <h2>Soap Manager Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
      </div>
      <button type="submit" disabled={isSubmitting} style={{ padding: '10px' }}>{isSubmitting ? "Signing In..." : "Sign In"}</button>
    </form>
  );
}
