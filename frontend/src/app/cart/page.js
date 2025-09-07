"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const handleQuantity = (id, action) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + (action === "inc" ? 1 : -1)) }
        : item
    );
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantity(item._id, "dec")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantity(item._id, "inc")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
