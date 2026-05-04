"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import booksData from "../../../public/data.json";
import { Card, CardContent, CardFooter, Button, InputGroup } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("All Books");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All Books", "Story", "Tech", "Science"];

  const filteredBooks = booksData.filter((book) => {
    const matchesCategory = activeCategory === "All Books" || book.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      (book.description && book.description.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
          Library Collection
        </h1>
        <p className="text-slate-500 text-lg">
          Browse thousands of curated titles across all disciplines.
        </p>
      </div>

      <div className="mb-8">
        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm flex items-center px-4 py-3">
          <FiSearch className="text-slate-400 text-xl mr-3" />
          <input 
            type="text" 
            placeholder="Search by title, author, or keyword..." 
            className="flex-1 outline-none text-slate-700 bg-transparent placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-500 px-2 py-1 rounded text-xs font-medium ml-3">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-slate-900 text-white hover:bg-slate-800" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const isAvailable = book.available_quantity > 0;

            return (
              <Card key={book.id} className="border border-slate-200 shadow-sm" radius="lg">
                <CardContent className="p-0 overflow-visible">
                  <div className="bg-indigo-50 w-full pt-8 pb-8 flex justify-center items-center rounded-t-xl">
                    <div className="relative w-32 h-44 shadow-xl">
                      <Image
                        src={book.image_url}
                        alt={book.title}
                        fill
                        className="object-cover rounded-sm"
                        sizes="128px"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start px-5 py-5 gap-3 bg-white">
                  <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full w-max mb-1 ${isAvailable ? 'bg-indigo-50/70 text-slate-700' : 'bg-slate-100 text-slate-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    <span className="text-xs font-medium">{isAvailable ? "Available" : "Waitlist"}</span>
                  </div>
                  
                  <div className="w-full">
                    <h3 className="font-semibold text-base text-slate-800 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{book.author}</p>
                  </div>

                  <Link href={`/books/${book.id}`} className="w-full mt-3 block">
                    <Button 
                      variant="bordered"
                      fullWidth 
                      className="font-semibold border border-slate-200 text-slate-700 bg-transparent hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] h-12 rounded-full"
                    >
                      Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-slate-500 text-lg">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
