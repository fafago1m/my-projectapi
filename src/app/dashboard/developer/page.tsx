"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaGamepad, FaArrowCircleUp, FaTrashAlt, FaUserAlt, FaCheckCircle } from 'react-icons/fa';
import withAuth from "@/app/middleware/withAuth";
import NavbarDashboard from "@/app/components/NavbarDashboard";
import { User, Gamepad2, Users, Megaphone, CheckCircle2, Menu } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_path: string;
  status: string;
  player_count: number;
  highest_score: number;
}

function DeveloperDashboard() {
  const [user, setUser] = useState<any>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [zip, setZip] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!token) return;

      try {
        const [userRes, categoryRes, notifRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/developer/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setCategories(categoryRes.data);
        setNotifications(notifRes.data);

        if (userRes.data.role === "developer") {
          const gameRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/developer/games`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setGames(gameRes.data);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [token]);

  const handleUploadGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (zip) formData.append("zip", zip);
    formData.append("category_id", categoryId);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/developer/games`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setDescription("");
      setThumbnail(null);
      setZip(null);
      setCategoryId("");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/developer/games`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGames(response.data);
    } catch (error) {
      console.error("Failed to upload game", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGame = async (gameId: number) => {
    if (!token) return;
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/developer/games/${gameId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGames((prev) => prev.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("Failed to delete game", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8 fixed top-0 left-0 h-full shadow-xl z-30">
        <h1 className="text-4xl font-extrabold text-center mb-8 ">Dashboard</h1>
        <nav className="space-y-6">
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-medium">Home</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
            <User className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium">Score</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
            <Gamepad2 className="w-6 h-6 text-green-400" />
            <span className="text-sm font-medium">Game</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
            <Megaphone className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-medium">Notifikasi</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-72 p-6 max-w-7xl mx-auto space-y-12">
        {user && (
          <p className="text-center text-gray-400">
            Welcome back, <span className="font-semibold text-gray-400">{user.name}</span>
          </p>
        )}

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-yellow-800">Admin Notifications</h2>
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li key={notif.id} className="text-yellow-700 text-sm border-b border-yellow-200 pb-2">
                  <p>{notif.message}</p>
                  {notif.game_id && (
                    <p className="text-xs text-yellow-600">Related Game ID: {notif.game_id}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload Game Form */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Upload New Game</h2>
          <form onSubmit={handleUploadGame} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Game Title</label>
              <input
                type="text"
                placeholder="Enter game title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Game Description</label>
              <textarea
                placeholder="Describe your game..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="w-full p-4 border rounded-md bg-gray-50"
              />
            </div>

            {/* ZIP File */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Game ZIP File</label>
              <input
                type="file"
                accept=".zip"
                required
                onChange={(e) => setZip(e.target.files?.[0] || null)}
                className="w-full p-4 border rounded-md bg-gray-50"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full p-4 border rounded-md bg-gray-50"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 rounded-md text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload Game"}
            </button>
          </form>
        </section>

        {/* Your Games List */}
        <section className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Your Games</h2>
          {games.length === 0 ? (
            <p className="text-gray-500">You haven't uploaded any games yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div key={game.id} className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition">
                  <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                  <p className="text-sm text-gray-600">{game.description}</p>
                  <p className={`mt-2 text-sm font-medium ${
                    game.status === "pending"
                      ? "text-yellow-600"
                      : game.status === "published"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}>
                    Status: {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                  </p>
                  {game.thumbnail_path && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${game.thumbnail_path}`}
                      alt={game.title}
                      className="mt-3 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600"><FaUserAlt className="inline w-4 h-4 mr-1" /> Players: 6</p>
                    <p className="text-sm font-medium text-gray-600"><FaGamepad className="inline w-4 h-4 mr-1" /> Highest Score: 0</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  >
                    <FaTrashAlt className="inline w-4 h-4 mr-2" /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default withAuth(DeveloperDashboard, ["developer"]);
