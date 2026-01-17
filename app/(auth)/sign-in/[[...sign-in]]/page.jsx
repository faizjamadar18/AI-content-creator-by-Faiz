"use client";

import { Button } from "@/components/ui/button";
import { useSignIn, SignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const attempt = await signIn.create({
        identifier: "Demo@example.com",
        password: "demo@4567",
      });

      if (attempt.status === "complete" && attempt.createdSessionId) {
        await setActive({ session: attempt.createdSessionId });
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("demo Login Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      {/* <Button
        onClick={handleDemoLogin}
        className="w-full max-w-sm bg-white text-black rounded-md"
      >
        {loading ? "Logging in..." : "Login with Demo Account"}
      </Button> */}

      <div className="w-full max-w-sm">
        <SignIn />
      </div>
    </div>
  );
}
