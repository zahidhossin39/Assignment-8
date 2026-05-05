"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, Button } from "@heroui/react";
import { FiLink } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageURL(session.user.image || "");
      setImgError(false); 
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);
    await authClient.updateUser(
      {
        name,
        image: imageURL || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          setLoading(false);
          setImgError(false); 
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to update profile.");
          setLoading(false);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null; 
  }

  const user = session.user;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          Account Settings
        </h1>
        <p className="text-slate-500 text-base">
          Manage your profile information and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Card className="w-full lg:w-[35%] border border-slate-200 shadow-sm" radius="lg">
          <CardContent className="flex flex-col items-center py-10 px-6 text-center">
            
            <div className="relative w-24 h-24 mb-4 rounded-full border-2 border-indigo-600 bg-indigo-100 flex items-center justify-center overflow-hidden shrink-0">
              {user.image && !imgError ? (
                <img 
                  src={user.image} 
                  alt={user.name || "Profile"} 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-4xl font-bold text-indigo-700 uppercase">
                  {user.name ? user.name.charAt(0) : ""}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500 mt-1">{user.email}</p>

            <div className="mt-8 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              Active Member
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-[65%] border border-slate-200 shadow-sm" radius="lg">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Update Information</h2>
            <p className="text-sm text-slate-500 mt-1">
              Keep your personal details current to ensure smooth access to the library.
            </p>
          </div>
          
          <CardContent className="p-6">
            <form onSubmit={handleUpdate} className="flex flex-col gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="bordered"
                  radius="sm"
                  fullWidth
                  classNames={{
                    inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-indigo-600/20 bg-slate-50/50",
                  }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Profile Image URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  startContent={<FiLink className="text-slate-400" />}
                  variant="bordered"
                  radius="sm"
                  fullWidth
                  classNames={{
                    inputWrapper: "border-slate-200 hover:border-indigo-400 focus-within:!border-indigo-600 focus-within:!ring-indigo-600/20 bg-slate-50/50",
                  }}
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  type="submit"
                  isLoading={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium px-6"
                  radius="sm"
                >
                  Update Information
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
