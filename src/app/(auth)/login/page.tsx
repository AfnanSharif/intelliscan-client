"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { SlimLayout } from "@/components/SlimLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { data: session, status: sessionStatus } = useSession();

  // If the user is already authenticated, redirect to the home page
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Validate email and password
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } else {
      toast.success("Successfully signed in!");
      router.replace("/"); // Redirect to the home page after successful login
    }
  };

  return (
    <>
      <ToastContainer />
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>{" "}
          for a free trial.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          {error && (
            <div className="text-red-600 text-sm">{error}</div> // Display error above the button
          )}
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </SlimLayout>
    </>
  );
}
