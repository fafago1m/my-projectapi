'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">FafaTest.</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} FafaTest.. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition">Home</Link>
            <Link href="/games" className="hover:text-indigo-600 dark:hover:text-white transition">Games</Link>
            <Link href="/about" className="hover:text-indigo-600 dark:hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-white transition">Contact</Link>
          </div>


          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-white transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
