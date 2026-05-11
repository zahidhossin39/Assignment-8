"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@heroui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { BiBookReader } from "react-icons/bi";
import { toast } from "react-toastify";
import booksData from "../../../../public/data.json";

export default function BookDetailsPage() {
  const params = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (params?.id) {
      const foundBook = booksData.find((b) => b.id === params.id);
      setBook(foundBook);
    }
  }, [params?.id]);

  if (!book) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading book details...</p>
      </div>
    );
  }

  const isAvailable = book.available_quantity > 0;

  const publishedYear = book.published_year || 2022;
  const pagesCount = book.page_count || 300;

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen py-10">
      <div 
        className="mx-auto bg-white shadow-sm p-8 sm:p-12"
        style={{ maxWidth: "1000px", borderRadius: "2rem" }}
      >
        <div className="flex items-center text-sm text-slate-500 mb-8 font-medium">
          <Link href="/books" className="hover:text-indigo-600 transition-colors">
            All Books
          </Link>
          <span className="mx-2 text-slate-300">›</span>
          <span className="hover:text-indigo-600 transition-colors cursor-pointer">
            {book.category}
          </span>
          <span className="mx-2 text-slate-300">›</span>
          <span className="text-slate-800">Details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div 
              className="w-full relative rounded-2xl overflow-hidden shadow-lg bg-slate-100"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={book.image_url}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 shadow-sm rounded-xl py-4 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-500 font-medium mb-1">Published</span>
                <span className="text-base font-bold text-slate-800">{publishedYear}</span>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm rounded-xl py-4 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-500 font-medium mb-1">Pages</span>
                <span className="text-base font-bold text-slate-800">{pagesCount}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col pt-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              {book.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-8">
              by <span className="text-indigo-600 font-medium">{book.author}</span>
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <IoCheckmarkCircle className="text-lg" />
                <span className="text-sm font-bold tracking-wide">
                  {isAvailable ? "Available" : "Waitlist"}
                </span>
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {book.available_quantity} copies left
              </span>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Synopsis</h3>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  {book.description}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <div className="flex items-center gap-4">
                <Button 
                  onPress={() => {
                    toast.success(`You have successfully borrowed "${book.title}"!`);
                  }}
                  className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white h-14 text-base font-bold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
                  startContent={<BiBookReader className="text-xl" />}
                >
                  Borrow This Book
                </Button>
                <Button
                  isIconOnly
                  variant="bordered"
                  className="h-14 w-14 rounded-xl border-2 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  <FiBookmark className="text-xl" />
                </Button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-4">
                Standard 14-day borrowing period applies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
