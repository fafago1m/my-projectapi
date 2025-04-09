'use client'; // Ensure the component is client-side

import { useEffect, useState } from 'react';
import axios from 'axios';

const CheckUser = () => {
  const [user, setUser] = useState<any>(null);  // State to hold user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        
        if (!token) {
          setError("User is not logged in.");
          setLoading(false);
          return;
        }

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

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        <div className="mb-4">
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Email Verified At:</strong> {user?.email_verified_at || "Not Verified"}</p>
          <p><strong>Created At:</strong> {user?.created_at}</p>
          <p><strong>Updated At:</strong> {user?.updated_at}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckUser;
