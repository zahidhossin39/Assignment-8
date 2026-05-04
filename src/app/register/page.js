"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, Input, Button } from "@heroui/react";
import { FiUser, FiMail, FiImage, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Please try again.");
          setLoading(false);
        },
      }
    );
  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md p-4 shadow-lg border border-slate-100" radius="lg">
        <div className="flex flex-col items-center pb-0 pt-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1">Sign up to start curating your collection.</p>
        </div>
        
        <CardContent className="py-6 px-4">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</label>
              <Input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                startContent={<FiUser className="text-slate-400" />}
                variant="bordered"
                radius="sm"
                fullWidth
                classNames={{
                  inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-indigo-600/20",
                }}
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Email Address</label>
              <Input
                type="email"
                placeholder="jane@example.com"
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
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Password</label>
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<FiLock className="text-slate-400" />}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <FiEyeOff className="text-slate-400 text-lg pointer-events-none" />
                    ) : (
                      <FiEye className="text-slate-400 text-lg pointer-events-none" />
                    )}
                  </button>
                }
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
              className="bg-slate-900 text-white font-medium w-full mt-4"
              radius="sm"
            >
              Register →
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-0 pb-4">
          <p className="text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-indigo-600 font-medium hover:underline">Login Here</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
