'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center"
      >
        <img
          src="/images/forbiddenfafa.svg"
          alt="Access denied"
          className="w-64 h-64 mx-auto mb-6"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          403
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Maaf, kamu tidak memiliki akses ke halaman ini.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
