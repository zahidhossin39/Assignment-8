"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imgError, setImgError] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setImgError(false);
  }, [session?.user?.image]);

  const getLinkClasses = (path) => {
    const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return isActive
      ? "text-indigo-600 font-semibold relative h-full flex items-center after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-indigo-600"
      : "text-slate-500 font-medium hover:text-indigo-600 transition-colors relative h-full flex items-center";
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 h-16 flex items-center px-6">
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-12 h-16">
          <Link href="/" className="font-bold text-xl text-slate-800 flex items-center h-full">
            Curator Library
          </Link>

          <div className="hidden md:flex items-center gap-8 h-full">
            <Link 
              href="/" 
              className={getLinkClasses("/")}
            >
              Home
            </Link>
            <Link 
              href="/books" 
              className={getLinkClasses("/books")}
            >
              All Books
            </Link>
            {session && (
              <Link 
                href="/profile" 
                className={getLinkClasses("/profile")}
              >
                My Profile
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="max-w-[240px] w-full">
            <div className="bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors rounded-full overflow-hidden px-4 py-2 flex items-center border border-transparent focus-within:border-indigo-200">
              <FiSearch className="text-slate-400 text-lg mr-2" />
              <input
                className="bg-transparent text-sm focus:outline-none w-full text-slate-700 placeholder:text-slate-400"
                placeholder="Search books..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 ml-4">
            {!isPending && !session ? (
              <Link 
                href="/login" 
                className="text-sm font-semibold text-slate-500 hover:text-indigo-600"
              >
                Login
              </Link>
            ) : null}
            
            {session ? (
              <div className="flex items-center gap-5">
                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold text-indigo-600 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Logout
                </button>
                
                <Link href="/profile" className="flex items-center justify-center relative w-10 h-10 rounded-full border border-indigo-600 bg-indigo-100 overflow-hidden shrink-0 hover:ring-2 hover:ring-indigo-400 hover:ring-offset-1 transition-all">
                  {session.user.image && !imgError ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || "Profile"} 
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-sm font-bold text-indigo-700 uppercase">
                      {session.user.name ? session.user.name.charAt(0) : ""}
                    </span>
                  )}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
