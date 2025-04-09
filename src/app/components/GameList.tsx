'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_path: string;
}

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games`);
        const gameData = res.data?.data ?? res.data;
        setGames(gameData);
      } catch (err: any) {
        console.error('Gagal memuat game:', err.response?.data || err.message);
        setError('Gagal memuat game. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8 md:mb-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">Game List</h2>
            <p className="max-w-screen-md text-gray-500 dark:text-gray-300">
              Temukan berbagai game menarik yang bisa kamu mainkan langsung di browser. Klik salah satu untuk mulai bermain!
            </p>
          </div>

          <Link
            href="#"
            className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            Lihat Semua
          </Link>
        </div>

        {error && <div className="text-red-500 text-center mb-6">{error}</div>}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Memuat game...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {games.map((game, index) => (
              <Link
                href={`/game/${game.slug}`}
                key={game.id}
                className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 ${
                  index % 4 === 1 || index % 4 === 2 ? 'md:col-span-2' : ''
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail_path}`}
                  alt={game.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  {game.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameList;
