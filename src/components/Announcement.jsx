"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import books from "../../public/data.json";

export default function Announcement() {
  return (
    <div className="bg-indigo-50 py-3 border-b border-indigo-100 flex items-center overflow-hidden">
      <Marquee pauseOnHover gradient={false} speed={60}>
        <div className="flex gap-16 items-center text-sm font-medium text-slate-700">
          {books.map((book) => (
            <span key={book.id} className="whitespace-nowrap">
              <span className="mr-2">📢</span>
              New Arrivals: <span className="font-bold text-indigo-700">{book.title}</span> 
              <span className="mx-4 text-slate-300">|</span> 
              Special Discount on Memberships!
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
