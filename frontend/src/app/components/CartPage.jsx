"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.cart || []);
        calculateTotal(data.cart || []);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(sum);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, []);

  if (cartItems.length === 0)
    return <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 gap-4 hover:shadow-lg transition-shadow"
          >
            {/* Left: Image + Title + Category */}
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={item.product.imageUrl || item.product.url}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.product.title}</h3>
                <p className="text-gray-500">{item.product.category}</p>
              </div>
            </div>

            {/* Right: Quantity, Total Price, Remove */}
            <div className="flex items-center gap-4 w-full md:w-1/3 justify-end">
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  onClick={() => {
                    /* decrement quantity */
                  }}
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  onClick={() => {
                    /* increment quantity */
                  }}
                >
                  +
                </button>
              </div>
              <p className="font-medium">₹{item.product.price * item.quantity}</p>
              <button
                onClick={() => {
                  /* remove item */
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-6 flex justify-end bg-white shadow-md rounded-lg p-4">
        <p className="text-xl font-semibold">Total: ₹{total}</p>
      </div>
    </div>
  );
}
