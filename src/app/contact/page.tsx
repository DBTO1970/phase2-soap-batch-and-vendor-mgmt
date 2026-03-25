"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLeadInZoho } from './actions';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setStatus('sending');
    setErrorMessage(null);
    const result = await createLeadInZoho(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'There was an error sending your message. Please try again.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Contact Morning Rituals Soap
      </h1>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 p-8 rounded-xl text-center shadow-sm">
          <h2 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700 mb-6">Thank you. We will get back to you shortly.</p>
          <button 
            onClick={() => router.push("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name (optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-md"
          >
            {status === 'sending' ? 'Sending...' : 'Submit Request'}
          </button>

          {status === 'error' && (
            <p className="text-red-600 text-center text-sm font-medium">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}