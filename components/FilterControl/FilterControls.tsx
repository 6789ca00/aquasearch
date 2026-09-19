"use client";

import StatusFilter from "./StatusFilter";
import ShopFilter from "./ShopFilter";

type StatusFilterValue = "all" | "on_sale" | "sold_out";

type FilterControlsProps = {
  statusFilter: StatusFilterValue;
  onStatusChange: (value: StatusFilterValue) => void;

  shops: string[];
  selectedShops: string[];
  onShopChange: (shops: string[]) => void;
};

export default function FilterControls({
  statusFilter,
  onStatusChange,
  shops,
  selectedShops,
  onShopChange,
}: FilterControlsProps) {
  return (
    <div className="result-controls">
      <StatusFilter
        value={statusFilter}
        onChange={onStatusChange}
      />

      <ShopFilter
        shops={shops}
        selectedShops={selectedShops}
        onApply={onShopChange}
      />

      <button
        type="button"
        className="sort-button"
      >
        관련도순 ▾
      </button>
    </div>
  );
}