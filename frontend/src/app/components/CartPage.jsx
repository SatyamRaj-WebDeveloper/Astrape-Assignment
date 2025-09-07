"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
  

  const API_BASE = "http://localhost:8080/api/v1/cart";

  const safeJson = async (res) => {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      return await res.json();
    }
    const text = await res.text();
    console.error("Non-JSON response:", text);
    throw new Error(text || "Non-JSON response from server");
  };
  const fetchCart = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/cart/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
    console.log(data);
    setCartItems(data.cart || []);
    calculateTotal(data.cart || []);
  } catch (err) {
    console.error("Error fetching cart:", err);
    if (err.message && err.message.toLowerCase().includes("token")) {
      router.push("/login");
    }
  }
};


  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + (item.product.price || 0) * (item.quantity || 0),
      0
    );
    setTotal(sum);
  };

  // update quantity by sending the absolute new quantity
  const updateQuantityTo = async (productId, newQty) => {
    if (newQty < 1) return; // avoid zero/negative — or you could call remove
    try {
      const res = await fetch(`${API_BASE}/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        console.error("Update failed:", data);
        alert(data.message || "Failed to update quantity");
        return;
      }
      setCartItems(data.cart || []);
      calculateTotal(data.cart || []);
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Network or server error while updating quantity");
    }
  };

  const incrementQuantity = (productId) => {
    const item = cartItems.find(
      (i) =>
        i.product._id === productId ||
        (i.product._id && i.product._id.toString() === productId)
    );
    if (!item) return;
    updateQuantityTo(productId, item.quantity + 1);
  };

  const decrementQuantity = (productId) => {
    const item = cartItems.find(
      (i) =>
        i.product._id === productId ||
        (i.product._id && i.product._id.toString() === productId)
    );
    if (!item) return;
    const newQty = Math.max(1, item.quantity - 1);
    updateQuantityTo(productId, newQty);
  };

  const removeItem = async (productId) => {
    if (!confirm("Remove this item from your cart?")) return;
    try {
      const res = await fetch(`${API_BASE}/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await safeJson(res);
      if (!res.ok) {
        console.error("Remove failed:", data);
        alert(data.message || "Failed to remove item");
        return;
      }
      setCartItems(data.cart || []);
      calculateTotal(data.cart || []);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Network or server error while removing item");
    }
  };

  useEffect(() => {
    console.log("token :" ,token);
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!cartItems || cartItems.length === 0)
    return <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => {
          const pid =
            item.product._id?.toString?.() || item.product.toString?.() || "";
          return (
            <div
              key={pid}
              className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 gap-4 hover:shadow-lg transition-shadow"
            >
              {/* Left */}
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.product.imageurl || item.product.url || "/placeholder.png"}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.title}</h3>
                  <p className="text-gray-500">{item.product.category}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 w-full md:w-1/3 justify-end">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => decrementQuantity(pid)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => incrementQuantity(pid)}
                  >
                    +
                  </button>
                </div>
                <p className="font-medium">₹{item.product.price * item.quantity}</p>
                <button
                  onClick={() => removeItem(pid)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end bg-white shadow-md rounded-lg p-4">
        <p className="text-xl font-semibold">Total: ₹{total}</p>
      </div>
    </div>
  );
}
