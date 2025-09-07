"use client";
import { useEffect, useState } from "react";
import ProductList from "../app/components/ProductList.jsx";
import FilterSidebar from "../app/components/FilterSidebar.jsx";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  // fetch all items initially
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/item/getAll");
      const data = await res.json();
      setProducts(data.items || []);
    } catch (err) {
      console.error("Error fetching all products:", err);
    }
  };

  // fetch filtered items
  const fetchFilteredProducts = async (filters = {}) => {
    try {
      // If no filters, fetch all products
      if (!filters.category && !filters.minPrice && !filters.maxPrice) {
        fetchAllProducts();
        return;
      }

      let url = "http://localhost:8080/api/v1/item/filter";
      const params = new URLSearchParams(filters);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.items || []);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Sidebar for large screens */}
      <div className="hidden md:block md:w-64">
        <FilterSidebar onFilter={fetchFilteredProducts} />
      </div>

      {/* Horizontal filter bar for mobile */}
      <div className="md:hidden mb-4">
        <FilterSidebar onFilter={fetchFilteredProducts} horizontal />
      </div>

      {/* Products */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-6">All Products</h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}
