import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-2">Curator Library</h2>
            <p className="text-slate-400 text-sm italic font-serif">digitizing the library experience</p>
          </div>

          <div className="flex flex-col md:items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <FiMail className="text-lg text-slate-400" />
                  <a href="mailto:support@curatorlibrary.com" className="hover:text-white transition-colors">
                    support@curatorlibrary.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <FiPhone className="text-lg text-slate-400" />
                  <span>+880 1234 567 890</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300 text-sm">
                  <FiMapPin className="text-lg text-slate-400 shrink-0 mt-0.5" />
                  <span>123 Library Road, Rajbari, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-lg font-bold mb-6">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-all">
                <FaXTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white transition-all">
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 Curator Library. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
