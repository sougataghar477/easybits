'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSign = async (e) => {
  e.preventDefault();

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // Debugging (check what happens in production)
    console.log("signIn result:", result);

    if (result?.error) {
      toast.error("Invalid email or password");
      return;
    }

    if (result?.ok && result?.url) {
      // Session should now be set in cookies
      router.push("/dashboard");
    } else {
      toast.error("Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Something went wrong. Please try again later.");
  }
};


  return (
    <form className="mt-[25%] p-4" onSubmit={handleSign}>
      <h1 className="mb-8 font-bold">Sign In</h1>
      <input
        className="mb-8 border-2 border-sky-500 w-full py-4 px-2 placeholder:italic"
        onInput={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        className="mb-8 border-2 border-sky-500 w-full py-4 px-2 placeholder:italic"
        onInput={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button
        className="block rounded-full border-0 bg-sky-500 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
