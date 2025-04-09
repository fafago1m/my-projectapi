'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Leaderboard from '@/app/components/Leaderboard';
import Navbar from '@/app/components/Navbar';
import { Gamepad2, UsersRound } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_path: string;
  play_count: number;
}

const GameDetail = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [game, setGame] = useState<Game | null>(null);
  const [recommendations, setRecommendations] = useState<Game[]>([]);

  useEffect(() => {
    if (!slug) return;

    const token = localStorage.getItem('auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games/${slug}`)
      .then((res) => setGame(res.data.data))
      .catch((err) => console.error('Failed to load game:', err));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games/${slug}/recommendations`)
      .then((res) => setRecommendations(res.data.data))
      .catch((err) => console.error('Failed to load recommendations:', err));
  }, [slug]);

  const handlePlayGame = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`);
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games/${slug}/play`);
      router.push(`/play/${slug}`);
    } catch (error) {
      console.error('Harus login terlebih dahulu.', error);
      router.push('/login');
    }
  };

  if (!game) {
    return (
      <div className=""></div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-white dark:bg-gray-900 min-h-screen pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail_path}`}
                alt={`Thumbnail ${game.title}`}
                className="w-full h-72 md:h-[420px] object-cover"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{game.title}</h1>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">{game.description}</p>
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
                <UsersRound className="w-4 h-4" /> {game.play_count} orang telah memainkan game ini
              </p>
              <button
                onClick={handlePlayGame}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold px-6 py-3 rounded-xl hover:scale-105 transition transform duration-200 shadow-lg"
              >
                <Gamepad2 className="w-5 h-5" />
                Mainkan Sekarang
              </button>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Rekomendasi Game Serupa</h2>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendations.map((rec) => (
                    <a
                      key={rec.id}
                      href={`/game/${rec.slug}`}
                      className="block bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg overflow-hidden shadow-sm transition"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${rec.thumbnail_path}`}
                        alt={rec.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-sm font-medium text-gray-700 dark:text-white truncate">
                        {rec.title}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Tidak ada rekomendasi game.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <Leaderboard gameId={game.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
