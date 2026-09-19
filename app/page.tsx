"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";

type Product = {
  id: number;
  name: string;
  price: number | null;
  status: "on_sale" | "sold_out";
  product_url: string;
  image_url: string;
  shops: {
    name: string;
  };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const query = search.trim();

    if (!query) {
      return;
    }

    setSearchedQuery(query);
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("검색 요청에 실패했습니다.");
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("검색 오류:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>AquaSearch</h1>
        <p>수족관 상품을 한 곳에서 검색하세요.</p>
      </header>

      <section className="search-section">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />
      </section>

      {searched && (
        <SearchResult
          products={products}
          loading={loading}
          searchQuery={searchedQuery}
        />
      )}
    </main>
  );
}