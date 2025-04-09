"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/app/middleware/withAuth";
import Navbar from "@/app/components/Navbar";
import NavbarDashboard from "@/app/components/NavbarDashboard";

function UserDashboard() {
  const [user, setUser] = useState<any>(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <>
<NavbarDashboard />
  <h1 className="p-6 text-2xl font-bold text-green-700">User Dashboard Hai {user?.name}</h1>
  <div className="">
  <div className="">
    <h1 className="">User Information</h1>
    <div className="mb-4">
      <p><strong>ID:</strong> {user?.id}</p>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Email Verified At:</strong> {user?.email_verified_at || "Not Verified"}</p>
      <p><strong>Created At:</strong> {user?.created_at}</p>
      <p><strong>Updated At:</strong> {user?.updated_at}</p>
    </div>
  </div>
</div></> 
}

export default withAuth(UserDashboard, ["user"]);
