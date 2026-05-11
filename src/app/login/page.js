"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, Input, Button } from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
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

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md p-4 shadow-lg border border-slate-100 bg-white" radius="lg">
        <div className="flex flex-col items-center pb-0 pt-4 px-4">
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue to Curator Library.</p>
        </div>
        
        <CardContent className="py-6 px-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Email</label>
              <div className="relative flex items-center w-full border border-slate-200 rounded-md hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-2 focus-within:!ring-indigo-600/20 transition-all bg-white px-3 py-2.5">
                <FiMail className="text-slate-400 mr-2 shrink-0 text-lg" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 block">Password</label>
                <Link href="#" className="text-xs text-indigo-600 font-medium hover:underline">Forgot?</Link>
              </div>
              <div className="relative flex items-center w-full border border-slate-200 rounded-md hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-2 focus-within:!ring-indigo-600/20 transition-all bg-white px-3 py-2.5">
                <FiLock className="text-slate-400 mr-2 shrink-0 text-lg" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  required
                />
              </div>
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

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <Button 
            onPress={handleGoogleLogin}
            variant="bordered"
            className="w-full font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            radius="sm"
          >
            <FcGoogle className="text-[1.25rem]" />
            <span>Sign in with Google</span>
          </Button>
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
