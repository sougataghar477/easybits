"use client";

import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const isSending = status === "sending";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("sending");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success !== false) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <p className="font-medium">Email:</p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full rounded-lg p-2 mt-2"
        placeholder="you@example.com"
        required
      />

      <button
        className="block mt-4 rounded-lg cursor-pointer bg-green-700 px-4 py-2 text-white disabled:bg-green-400 disabled:cursor-auto"
        type="submit"
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Receive Email"}
      </button>

      {message && (
        <p
          className={`mt-3 ${status === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
