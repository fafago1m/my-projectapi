"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LogIn,
  LogOut,
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  Code2,
} from "lucide-react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");
    const name = localStorage.getItem("user_name");

    setIsAuthenticated(!!token);
    if (role) setUserRole(role);
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed w-full z-50 top-0 shadow-md">
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">

          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="FafaTest Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FafaTest.
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>


          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {[
                { href: "/", label: "Home" },
                { href: "/game", label: "Game" },
                { href: "/Testimoni", label: "Testimoni" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block py-2 pl-3 pr-4 rounded lg:p-0 ${
                      isActive(href)
                        ? "text-white bg-purple-700 lg:bg-transparent lg:text-purple-700 dark:text-white"
                        : "text-gray-700 hover:text-purple-700 dark:text-gray-400 lg:dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center gap-3 lg:order-2 mt-4 lg:mt-0 hidden lg:block
">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  <UserCircle className="w-5 h-5" />
                  {userName || "Akun"}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 min-w-[180px] bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {userRole === "admin" && (
                        <li>
                          <Link
                            href="/dashboard/admin"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard Admin
                          </Link>
                        </li>
                      )}
                      {userRole === "developer" && (
                        <li>
                          <Link
                            href="/dashboard/developer"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Code2 className="w-4 h-4" />
                            Dashboard Developer
                          </Link>
                        </li>
                      )}
                      {userRole === "user" && (
                        <li>
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <UserCircle className="w-4 h-4" />
                            Profil Saya
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <LogIn className="w-4 h-4" />
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
