'use client'; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Game {
  id: number;
  title: string;
  slug: string;
  extracted_path: string;
}

const PlayGamePage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {

    const fetchUser = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };


    const fetchGame = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/games/${slug}`);
        setGame(res.data.data);
      } catch (err: any) {
        setError('Game tidak ditemukan atau belum dipublikasikan.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchGame();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Memuat game...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-2xl font-bold mb-4">{game?.title}</h1>

      <div className="w-full max-w-screen-xl aspect-video border-4 border-purple-600 rounded-lg overflow-hidden">
        <iframe
          id="gameIframe"
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game?.extracted_path}/snake.html?game_id=${game?.id}&user_id=${user?.id}`}  // Mengirim user_id melalui URL
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PlayGamePage;
