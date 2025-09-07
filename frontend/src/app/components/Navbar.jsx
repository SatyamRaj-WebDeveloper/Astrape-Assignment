"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
      fetchCartCount();
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, [token]);

  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const totalItems = (data.cart || []).reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">MyStore</Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/" className="hover:underline">
              Home
            </Link>

            <Link href="/cart" className="relative text-2xl hover:underline">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
