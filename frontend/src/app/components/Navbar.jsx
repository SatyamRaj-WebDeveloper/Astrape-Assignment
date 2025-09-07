"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setRole(storedRole);
    };

    // Run once on mount
    checkAuth();

    // ✅ Re-run whenever localStorage changes (login/logout)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // ✅ Trigger update immediately
    window.dispatchEvent(new Event("storage"));

    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-indigo-600 p-4 text-white">
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        {isLoggedIn && role === "admin" && <Link href="/admin">Admin</Link>}
        {isLoggedIn && <Link href="/cart">Cart</Link>}
      </div>

      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="ml-4">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="ml-4">
              Login
            </Link>
            <Link href="/register" className="ml-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
