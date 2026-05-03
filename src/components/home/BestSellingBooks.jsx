import React from "react";
import Image from "next/image";
import Link from "next/link";
import booksData from "../../../public/data.json";
import { Card, CardContent, CardFooter, Button } from "@heroui/react";

export default function BestSellingBooks() {
  const bestSellingBooks = booksData.slice(8, 12);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Best Selling Books
        </h2>
        <Link 
          href="/books" 
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all <span>&rsaquo;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellingBooks.map((book) => {
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

                <Button 
                  variant="bordered" 
                  fullWidth 
                  className="mt-3 font-medium border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all active:scale-[0.98]"
                  size="sm"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
