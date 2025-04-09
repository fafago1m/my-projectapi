'use client';

import withAuth from "@/app/middleware/withAuth";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, Gamepad2, Users, Megaphone, CheckCircle2, Menu } from 'lucide-react';

interface Developer {
  id: number;
  name: string;
}

interface Game {
  id: number;
  title: string;
  developer: {
    name: string;
    id: number;
  };
}

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 2, developers: 1, games: 9 });
  const [developerList, setDeveloperList] = useState<Developer[]>([]);
  const [pendingGames, setPendingGames] = useState<Game[]>([]);
  const [notification, setNotification] = useState<{ developerId: string; message: string }>({
    developerId: '',
    message: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setUserList] = useState<UserType[]>([]);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: string }>({
    name: '',
    email: '',
    role: 'user',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchStatsAndDevelopers = async () => {
      try {
        const statsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/dashboard`, { headers });
        setStats(statsRes.data);
      } catch {
        setErrorMsg('Gagal memuat statistik');
      }

      try {
        const devsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/developers`, { headers });
        setDeveloperList(devsRes.data);
      } catch {
        setErrorMsg('Gagal memuat daftar developer');
      }
    };

    fetchStatsAndDevelopers();
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, { headers });
        setUserList(usersRes.data);
      } catch {
        setErrorMsg('Gagal memuat daftar pengguna');
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchPendingGames = async () => {
      try {
        const gamesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/pending-games`, { headers });
        setPendingGames(gamesRes.data);
      } catch {
        setErrorMsg('Gagal memuat game yang menunggu persetujuan');
      }
    };

    fetchPendingGames();
  }, []);

  const handleApprove = async (gameId: number, developerId: number) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/approve-game/${gameId}`, {}, { headers });

      setPendingGames((prev) => prev.filter((game) => game.id !== gameId));

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/send-notification`, {
        developer_id: developerId,
        message: `Game dengan ID ${gameId} telah disetujui!`,
        game_id: gameId,
      }, { headers });

      alert('Game disetujui dan notifikasi dikirim.');
    } catch {
      alert('Game disetujui dan notifikasi dikirim.');
    }
  };

  const handleSendNotification = async (developerId: number, message: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/send-notification`,
        { developer_id: developerId, message },
        { headers }
      );

      setSuccessMsg(res.data.message);
      setNotification({ developerId: '', message: '' });
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Gagal mengirim notifikasi');
      setSuccessMsg('');
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`,
        { ...newUser },
        { headers }
      );
      setUserList([...userList, res.data]);
      setNewUser({ name: '', email: '', role: 'user' });
      setSuccessMsg('User berhasil ditambahkan');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Gagal menambahkan user');
    }
  };

  const handleChangeUserRole = async (userId: number, newRole: string) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${userId}`,
        { role: newRole },
        { headers }
      );
      setUserList(userList.map(user => user.id === userId ? { ...user, role: newRole } : user));
      setSuccessMsg('Role user berhasil diubah');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Gagal mengubah role user');
    }
  };
  function getRoleClass(role: string) {
    switch (role) {
      case 'admin':
        return 'text-red-500'; 
      case 'developer':
        return 'text-blue-500'; 
      case 'user':
        return 'text-green-500'; 
      default:
        return 'text-gray-500'; 
    }
  }
  
  return (
    <div className="flex">

<div className="w-64 bg-gray-800 text-white p-6 space-y-8 fixed top-0 left-0 h-full shadow-lg z-30">

  <h1 className="text-4xl font-extrabold  text-center mb-8">Dashboard</h1>
  <nav className="space-y-6">
    <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
      <Users className="w-6 h-6 text-blue-400" />
      <span className="text-sm font-medium">Pengguna</span>
    </a>
    <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md transition-all">
      <User className="w-6 h-6 text-purple-400" />
      <span className="text-sm font-medium">Developer</span>
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


<div className="ml-64 p-8">

</div>


  
      <div className="p-6 w-full">
        

 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Jumlah Pengguna" value={stats.users} icon={<Users className="w-8 h-8 text-blue-600" />} />
          <StatCard title="Jumlah Developer" value={stats.developers} icon={<User className="w-8 h-8 text-purple-600" />} />
          <StatCard title="Jumlah Game" value={stats.games} icon={<Gamepad2 className="w-8 h-8 text-green-600" />} />
        </div>

  
<div className="bg-white p-6 rounded-xl shadow-lg border space-y-4 mt-8">
  <h2 className="text-xl font-semibold text-gray-800">Daftar Pengguna</h2>
  <ul className="space-y-4">
    {userList.map((user) => (
      <li key={user.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          
          {/* Menampilkan role dengan warna yang sesuai */}
          <p
            className={`text-sm font-medium ${getRoleClass(user.role)}`}
          >
       
          </p>
        </div>
        
        <select
          value={user.role}
          onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
          className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
        </select>
      </li>
    ))}
  </ul>

  
  <div className="mt-6">
    <h3 className="text-lg font-semibold">Tambah User Baru</h3>
    <div className="space-y-4">
      <input
        type="text"
        className="w-full border rounded-md p-2"
        placeholder="Nama"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        className="w-full border rounded-md p-2"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        className="w-full border rounded-md p-2"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="developer">Developer</option>
      </select>

      <button
        onClick={handleCreateUser}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Tambah User
      </button>
    </div>
  </div>


</div>

       
        <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-indigo-600" />
            Game Belum Disetujui
          </h2>
          {pendingGames.length === 0 ? (
            <p className="text-gray-500">Tidak ada game yang menunggu persetujuan.</p>
          ) : (
            <ul className="space-y-4">
              {pendingGames.map((game) => (
                <li key={game.id} className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <p className="font-semibold text-lg">{game.title}</p>
                    <p className="text-sm text-gray-600">Oleh: {game.developer?.name || 'Unknown'}</p>
                  </div>
                  <button
                    onClick={() => handleApprove(game.id, game.developer?.id || 0)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Setujui
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      
        <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-yellow-600" />
            Kirim Notifikasi ke Developer
          </h2>
          <select
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 transition"
            value={notification.developerId}
            onChange={(e) => setNotification({ ...notification, developerId: e.target.value })}
          >
            <option value="">Pilih Developer</option>
            {developerList.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name}
              </option>
            ))}
          </select>
          <textarea
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Isi pesan notifikasi"
            value={notification.message}
            onChange={(e) => setNotification({ ...notification, message: e.target.value })}
          ></textarea>
          <button
            onClick={() => handleSendNotification(Number(notification.developerId), notification.message)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Kirim Notifikasi
          </button>

          
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-semibold text-blue-700">{value}</p>
      </div>
      <div className="bg-blue-50 rounded-full p-3">{icon}</div>
    </div>
  );
}

export default withAuth(AdminDashboard, ['admin']);
