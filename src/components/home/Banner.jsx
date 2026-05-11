import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Banner() {
  const imageUrl = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-sm">
        
        <div className="md:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Find Your Next Read
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
            Immerse yourself in our curated collection of thought-provoking literature and contemporary bestsellers. Your next journey begins here.
          </p>
          <Link 
            href="/books"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-xl w-max transition-colors flex items-center gap-2 shadow-sm"
          >
            Browse Now
            <FiArrowRight className="text-xl" />
          </Link>
        </div>

        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
          
          <Image 
            src={imageUrl}
            alt="Library interior"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </div>
  );
}
