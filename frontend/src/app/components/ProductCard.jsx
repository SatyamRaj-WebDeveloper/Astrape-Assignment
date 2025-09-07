"use client";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleAddToCart = async () => {
  if (!token) {
    alert("Please login to add items to cart");
    return;
  }

  try {
    const res = await fetch("https://astrape-assignment.onrender.com/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product._id, quantity: 1 }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Add to cart failed:", data.message);
      alert(data.message || "Error adding to cart");
      return;
    }

    setAdded(true); // button UI feedback
    console.log("Cart updated:", data.cart); // optional
  } catch (err) {
    console.error("Error syncing with backend:", err);
  }
};


  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={product.imageurl}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="mt-4 text-lg font-medium">{product.title}</h3>
      <p className="text-gray-500">{product.category}</p>
      <p className="mt-2 font-semibold text-indigo-600">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full py-2 rounded cursor-pointer ${
          added
            ? "bg-green-500 text-white"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}
