"use client"
import FilterSidebar from "../components/FilterSidebar";
import { useState } from "react";

export default function AdminPage() {
  const [items, setItems] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchItems = async (filters = {}) => {
    let url = "https://astrape-assignment.onrender.com/api/v1/item/filter";
    const params = new URLSearchParams(filters);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <FilterSidebar onFilter={fetchItems} />

      {/* Admin Table */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
        {/* table code here (same as before) */}
      </div>
    </div>
  );
}
