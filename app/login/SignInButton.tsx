"use client";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-gc-primary text-white py-2 rounded hover:bg-gc-primary-dark transition-colors"
    >
      Sign in with Google
    </button>
  );
}
