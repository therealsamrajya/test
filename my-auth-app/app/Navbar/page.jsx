"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/user");
      setIsLoggedIn(response.ok);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl tracking-wider">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-yellow-300">⚡</span>
              <span className="hover:text-yellow-300 transition duration-300">
                MyApp
              </span>
            </Link>
          </div>
          <div className="space-x-6">
            {!isLoggedIn && (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
                >
                  Register
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
