'use client'; 

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import axios from 'axios';

const ResetPassword = () => {
  const searchParams = useSearchParams(); 
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
    }
  }, [searchParams]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); 

    
    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
   
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password`,
        {
          email,
          password,
          password_confirmation: passwordConfirmation,
          token,
        }
      );

     
      setMessage(response.data.message || 'Password successfully reset!');
    } catch (error: any) {
     
      setMessage(error.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
