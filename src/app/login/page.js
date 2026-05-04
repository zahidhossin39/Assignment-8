"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, Input, Button } from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    
    setLoading(true);
    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Successfully logged in!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to log in. Please check your credentials.");
          setLoading(false);
        },
      }
    );
  };



  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-4 shadow-lg border border-slate-100" radius="lg">
        <div className="flex flex-col items-center pb-0 pt-4 px-4">
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue to Curator Library.</p>
        </div>
        
        <CardContent className="py-6 px-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<FiMail className="text-slate-400" />}
                variant="bordered"
                radius="sm"
                fullWidth
                classNames={{
                  inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-indigo-600/20",
                }}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 block">Password</label>
                <Link href="#" className="text-xs text-indigo-600 font-medium hover:underline">Forgot?</Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<FiLock className="text-slate-400" />}
                variant="bordered"
                radius="sm"
                fullWidth
                classNames={{
                  inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-indigo-600/20",
                }}
              />
            </div>

            <Button 
              type="submit"
              isLoading={loading}
              className="bg-slate-900 text-white font-medium w-full mt-2"
              radius="sm"
            >
              Login
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-0 pb-4">
          <p className="text-sm text-slate-500">
            Don't have an account? <Link href="/register" className="text-indigo-600 font-medium hover:underline">Register Here</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
