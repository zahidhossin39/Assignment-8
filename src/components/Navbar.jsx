"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@heroui/react";

const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 h-16 flex items-center px-6">
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-bold text-xl text-slate-800">
            Curator Library
          </Link>

          <div className="hidden md:flex items-center gap-8 h-16">
            <Link 
              href="/" 
              className="text-indigo-600 font-semibold relative h-full flex items-center after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-indigo-600"
            >
              Home
            </Link>
            <Link 
              href="/books" 
              className="text-slate-500 font-medium hover:text-indigo-600 transition-colors"
            >
              All Books
            </Link>
            <Link 
              href="/profile" 
              className="text-slate-500 font-medium hover:text-indigo-600 transition-colors"
            >
              My Profile
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="max-w-[240px] w-full">
            <Input
              className="bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors rounded-full overflow-hidden"
              placeholder="Search books..."
              size="sm"
              startContent={<SearchIcon size={18} className="text-slate-400 ml-2" />}
              type="search"
            />
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
