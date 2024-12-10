"use client";    // Directive to indicate that this file is a client-side module
import React from "react";
import { SessionProvider } from "next-auth/react";

// Define a component that wraps its children with the SessionProvider
const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
