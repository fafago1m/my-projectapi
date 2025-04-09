'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (token && role) {
      router.push(role === "admin" ? "/dashboard/admin" : "/home");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");
    setLoading(true);

    try {
      await axios.get(`${API}/sanctum/csrf-cookie`, { withCredentials: true });

      const res = await axios.post(
        `${API}/api/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { token, role, name, email_verified_at } = res.data;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_role", role);
      localStorage.setItem("user_name", name);
      if (!email_verified_at) {
        router.push("/verify-email");
        return;
      }
      

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "developer") {
        router.push("/dashboard/developer");
      } else if (role === "user") {
        router.push("/home");
      } else {
        router.push("/");
      }
      
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login gagal. Coba lagi nanti.";
      const lower = msg.toLowerCase();

      const errors: { email?: string; password?: string } = {};

      if (lower.includes("email")) {
        toast.error(errors.email = msg);
        
      } else if (lower.includes("password")) {
        toast.error(errors.password = msg);
      } else if (lower.includes("unauthorized") || lower.includes("credentials")) {
        toast.error(errors.password = "Email atau password salah.");
      } else {
        setGlobalError(msg);
      }

      setFieldErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">Silakan masuk untuk melanjutkan</p>
        </div>

        {globalError && <p className="text-red-500 text-center text-sm">{globalError}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 outline-none transition 
                ${fieldErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"}`}
              placeholder="Email anda"
              required
            />
            {fieldErrors.email && <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 outline-none transition 
                ${fieldErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"}`}
              placeholder="Password anda"
              required
            />
            {fieldErrors.password && <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 dark:text-gray-300">
              <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <span className="ml-2">Ingat saya</span>
            </label>
            <a
              onClick={() => router.push('/forgot-password')}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
            >
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sedang masuk..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
