'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const VerifyEmail = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const resendEmail = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Token tidak ditemukan. Silakan login ulang.')
        return
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/email/verification-notification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      )

      setMessage('Email verifikasi telah dikirim ulang!')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal mengirim email verifikasi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push("/login")
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verifikasi Email</h1>
        <p className="mb-4">Kami telah mengirimkan email verifikasi ke email kamu harap jangan spam biar tidak erorrr. Silakan cek inbox atau spam.</p>
        
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <button
          onClick={resendEmail}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition"
        >
          {loading ? 'Mengirim ulang harap sabar yaaa:)' : 'Kirim Ulang Email Verifikasi'}
        </button>
      </div>
    </div>
  )
}

export default VerifyEmail
