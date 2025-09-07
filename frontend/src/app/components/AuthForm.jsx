"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // ✅ use "name", not "username"
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url =
      type === "login" ? "/login/user" : "/register/user";

    try {
      const res = await fetch(`https://astrape-assignment.onrender.com/api/v1/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Invalid server response");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (type === "login") {
        // ✅ Login successful
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.user.role);

        // Trigger re-render for Navbar (storage event)
        window.dispatchEvent(new Event("storage"));

        // ✅ Redirect based on role
        if (data.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        // ✅ Register successful → redirect to login
        alert("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (err) {
      setError("Network error. Try again.");
      console.error("AuthForm error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 capitalize">{type}</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {type === "register" && (
        <input
          name="username"
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3 rounded"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <button className="w-full bg-indigo-600 text-white py-2 rounded mt-2 hover:bg-indigo-700">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
