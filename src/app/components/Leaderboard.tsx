'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserRound, Trophy } from 'lucide-react';

interface ScoreEntry {
  user_id: number;
  user_name: string;
  score: number;
}

const Leaderboard = ({ gameId }: { gameId: number }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leaderboard/${gameId}`,
          { withCredentials: true }
        );
        setScores(res.data.data);
      } catch (err) {
        console.error('Gagal memuat leaderboard', err);
      }
    };

    fetchLeaderboard();
  }, [gameId]);

  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h2>
      </div>
      {scores.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Belum ada skor.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {scores.map((entry, index) => (
            <li key={entry.user_id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="shrink-0 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                  <UserRound className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {getMedal(index)} {entry.user_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    ID: {entry.user_id}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-bold text-indigo-600 dark:text-indigo-400">
                  {entry.score}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
