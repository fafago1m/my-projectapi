'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const EmailVerifyRedirect = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_name", name || "");
      localStorage.setItem("auth_role", role || "");

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [params, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Verif email</p>
    </div>
  )
};

export default EmailVerifyRedirect;
