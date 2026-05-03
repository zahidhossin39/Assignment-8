"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InputGroup } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClasses = (path) => {
    return pathname === path
      ? "text-indigo-600 font-semibold relative h-full flex items-center after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-indigo-600"
      : "text-slate-500 font-medium hover:text-indigo-600 transition-colors relative h-full flex items-center";
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
            <Link 
              href="/profile" 
              className={getLinkClasses("/profile")}
            >
              My Profile
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="max-w-[240px] w-full">
            <InputGroup className="bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors rounded-full overflow-hidden px-3">
              <InputGroup.Prefix>
                <FiSearch className="text-slate-400 text-lg" />
              </InputGroup.Prefix>
              <InputGroup.Input
                className="bg-transparent text-sm py-2 px-2 focus:outline-none w-full"
                placeholder="Search books..."
                type="search"
              />
            </InputGroup>
          </div>
          
          <div className="flex items-center gap-6 ml-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600"
            >
              Login
            </Link>
            <Link 
              href="/logout" 
              className="text-sm font-semibold text-indigo-600 hover:opacity-80 transition-opacity"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
