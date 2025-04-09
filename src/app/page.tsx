'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { PaperAirplaneIcon, TagIcon } from '@heroicons/react/16/solid';
import GameList from '@/app/components/GameList';
import Testimoni from './components/Testimoni';
import Footer from './components/Footer';
import { GamepadIcon } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 relative text-white overflow-hidden">
  <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16 sm:pt-32 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
    
    {/* Gambar di atas untuk mobile */}
    <div className="lg:hidden mb-10 flex justify-center">
      <Image
        src="/images/hero.png"
        alt="Gaming Visual"
        width={300}
        height={300}
        className="rounded-2xl shadow-lg"
      />
    </div>

    {/* Konten Teks */}
    <div className="lg:col-span-7 text-center lg:text-left">
      <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
        Permainan Game <br className="hidden sm:block" /> dalam Website Kamu
      </h1>
      <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
        Ayo mainkan berbagai game seru dari berbagai genre. Kumpulkan skor, bersaing di leaderboard, dan jadilah legenda!
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
        <Link
          href="/register"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition"
        >
          <PaperAirplaneIcon className="w-5 h-5 mr-2" />
          Mulai Sekarang
        </Link>
        <Link
          href="/game"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-purple-300 border border-purple-500 hover:bg-purple-800 hover:text-white rounded-lg transition"
        >
          <GamepadIcon className="w-5 h-5 mr-2" />
          Lihat Game
        </Link>
      </div>
    </div>

    {/* Gambar samping di desktop */}
    <div className="hidden lg:col-span-5 lg:flex justify-center">
      <Image
        src="/images/hero.png"
        alt="Gaming Visual"
        width={450}
        height={450}
        className="rounded-2xl shadow-xl"
      />
    </div>
  </div>

  {/* Hiasan bentuk bintang di latar belakang */}
  <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/images/stars-bg.png')] bg-cover bg-no-repeat pointer-events-none" />
</section>

      {/* About Us */}
{/* About Us */}
<section className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center">
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-20">
    {/* Gambar Game */}
    <div className="flex justify-center order-1 md:order-none">
      <Image
       src="/images/istockphoto-1482455750-612x612.jpg"

        alt="About Gaming"
        width={500}
        height={350}
        className="rounded-xl shadow-lg object-cover"
      />
    </div>

    {/* Deskripsi */}
    <div className="flex flex-col justify-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Tentang Kami
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Kami adalah platform game online modern yang menyajikan beragam pilihan game seru, mulai dari petualangan hingga aksi, semuanya gratis! Temukan game favoritmu, raih skor tertinggi, dan jadilah legenda di dunia virtual.
      </p>
    </div>
  </div>
</section>


      {/* List Game */}
      <GameList />

      < Testimoni />
    < Footer />



    </>
  );
}
