'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login submission
  const handleSign = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Call NextAuth signIn with credentials provider
      const result = await signIn("credentials", {
        callbackUrl: '/dashboard', // Redirect after login
        email,
        password,
      });

      console.log("signIn result:", result);

      // If signIn failed, show error toast
      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      // If login was successful
      if (result?.ok && result?.url) {
        console.log('hello from login'); // Debug log
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    // Login form
    <form className="mt-[25%] p-4" onSubmit={handleSign}>
      <h1 className="mb-8 font-bold">Sign In</h1>

      {/* Email input */}
      <input
        className="mb-8 border-2 border-sky-500 w-full py-4 px-2 placeholder:italic"
        onInput={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />

      {/* Password input */}
      <input
        className="mb-8 border-2 border-sky-500 w-full py-4 px-2 placeholder:italic"
        onInput={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      {/* Submit button */}
      <button
        className="block rounded-full border-0 bg-sky-500 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
