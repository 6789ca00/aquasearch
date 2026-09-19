"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import FilterControls from "./FilterControl/FilterControls";

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

type SearchResultProps = {
  products: Product[];
  loading: boolean;
  searchQuery: string;
};

export default function SearchResult({
  products,
  loading,
  searchQuery,
}: SearchResultProps) {
  // 판매 상태 필터
  const [statusFilter, setStatusFilter] = useState<
    "all" | "on_sale" | "sold_out"
  >("all");

  // 쇼핑몰 필터
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  // 검색 결과에 포함된 쇼핑몰 목록
  const shops = Array.from(
    new Set(products.map((product) => product.shops.name))
  ).sort();

  // 필터 적용
  const filteredProducts = products.filter((product) => {
    // 판매 상태 필터
    if (
      statusFilter === "on_sale" &&
      product.status !== "on_sale"
    ) {
      return false;
    }

    if (
      statusFilter === "sold_out" &&
      product.status !== "sold_out"
    ) {
      return false;
    }

    // 쇼핑몰 필터
    if (
      selectedShops.length > 0 &&
      !selectedShops.includes(product.shops.name)
    ) {
      return false;
    }

    return true;
  });

  return (
    <section className="results-section">
      <div className="results-header">
        <div className="results-title">
          <h2>검색 결과</h2>

          {!loading && (
            <p>
              '{searchQuery}' 검색 결과 ·{" "}
              {filteredProducts.length}개
            </p>
          )}
        </div>

        {!loading && products.length > 0 && (
          <FilterControls
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            shops={shops}
            selectedShops={selectedShops}
            onShopChange={setSelectedShops}
          />
        )}
      </div>

      {loading ? (
        <p className="result-message">검색 중...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="result-message">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}