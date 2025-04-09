'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Developer {
  id: number;
  name: string;
}

const NotifyDeveloper = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDevId, setSelectedDevId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/developers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
        withCredentials: true,
      })
      .then((res) => setDevelopers(res.data))
      .catch((err) => console.error('Failed to fetch developers:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevId || !message) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/notify-developer`,
        {
          developer_id: selectedDevId,
          message,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
          withCredentials: true,
        }
      );
      setStatus('Notifikasi berhasil dikirim!');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus(' Gagal mengirim notifikasi.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Kirim Notifikasi ke Developer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Pilih Developer</label>
          <select
            value={selectedDevId ?? ''}
            onChange={(e) => setSelectedDevId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">-- Pilih Developer --</option>
            {developers.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Pesan Notifikasi</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kirim Notifikasi
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default NotifyDeveloper;
