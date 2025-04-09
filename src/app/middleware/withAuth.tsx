'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function withAuth(Component: any, allowedRoles: string[] = []) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        if (!token) {
          router.replace('/login');
          return;
        }

        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const user = res.data;

          if (!user.email_verified_at) {
            toast.error('Silakan verifikasi email Anda terlebih dahulu.');
            router.replace('/verify-email');
            return;
          }

          if (!allowedRoles.includes(user.role)) {
            toast.error('Akses ditolak.');
            router.replace('/');
            return;
          }

          setLoading(false);
        } catch (err) {
          toast.error('Sesi login habis. Silakan login ulang.');
          router.replace('/login');
        }
      };

      checkAuth();
    }, []);

    if (loading) return <div className="p-8 text-center text-lg font-semibold">Memuat...</div>;

    return <Component {...props} />;
  };
}

export default withAuth;
