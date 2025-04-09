'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../components/Navbar';
import GameList from '../components/GameList';
import { Gamepad2 } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_path: string;
}

const GameList1 = () => {
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
     <>
    <Navbar />

    <section className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          Daftar Game
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-6">{error}</div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Memuat game...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/game/${game.slug}`}>
                  <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail_path}`}
                      alt={`Thumbnail ${game.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <Link href={`/game/${game.slug}`}>
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {game.title}
                    </h5>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {game.description}
                  </p>
                  <Link
  href={`/game/${game.slug}`}
  className="inline-flex items-center px-4 py-2 text-sm font-medium font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition transition-colors"
>
  <Gamepad2 className="w-4 h-4 mr-2" />
  Mainkan
</Link>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default GameList1;

