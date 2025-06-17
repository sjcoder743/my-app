"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for all navbar content */}
        <div className="flex justify-between items-center h-16">
          {/* Left Section (Logo + Site Name) */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Image
                src="/logo.png"
                alt="Logo"
                className="h-11 w-11 rounded-full object-cover shadow-md"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-300 transition">
              About
            </Link>
            <Link href="/thoughts" className="hover:text-yellow-300 transition">
              Thought
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition">
                Contact Us
            </Link>
            <div className="flex items-center space-x-3">
              <UserButton />
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800 px-4 py-4 space-y-2 text-sm text-right items-end flex flex-col">
          <Link href="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-300">
            About
          </Link>
          <Link href="/thoughts" className="hover:text-yellow-300">
            Thought
          </Link>
          <Link href="/contact" className="hover:text-yellow-300">
            Contact Us
          </Link>
          <div className="flex flex-col space-y-2">
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
