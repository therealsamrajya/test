"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);

        setStats({
          posts: Math.floor(Math.random() * 50),
          followers: Math.floor(Math.random() * 1000),
          following: Math.floor(Math.random() * 500),
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch user:", errorData);
        setError(errorData.error || "Failed to fetch user data");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("An error occurred while fetching user data");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        setError("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setError("An error occurred during logout");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-purple-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        {username ? (
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center mb-8">
              <Image
                className="mx-auto h-24 w-24 rounded-full border-4 border-white shadow-lg"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`}
                alt="Profile"
                width={96}
                height={96}
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Welcome, {username}!
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-800">
                  {stats.posts}
                </p>
                <p className="text-sm text-purple-600">Posts</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-800">
                  {stats.followers}
                </p>
                <p className="text-sm text-indigo-600">Followers</p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-pink-800">
                  {stats.following}
                </p>
                <p className="text-sm text-pink-600">Following</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Recent Activity
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">
                  You posted a new photo
                </li>
                <li className="text-sm text-gray-600">
                  You gained 5 new followers
                </li>
                <li className="text-sm text-gray-600">You liked 3 posts</li>
              </ul>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="px-4 py-5 sm:p-6 text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
