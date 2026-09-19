"use client";

import { useEffect, useState } from "react";

type ShopFilterProps = {
  shops: string[];
  selectedShops: string[];
  onApply: (shops: string[]) => void;
};

export default function ShopFilter({
  shops,
  selectedShops,
  onApply,
}: ShopFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedShops, setTempSelectedShops] =
    useState<string[]>(selectedShops);

  // 모달이 열릴 때 현재 적용된 필터를 임시 선택 상태로 복사
  useEffect(() => {
    if (isOpen) {
      setTempSelectedShops(selectedShops);
    }
  }, [isOpen, selectedShops]);

  // 모달 열기/닫기
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // 쇼핑몰 선택/해제
  const handleToggle = (shop: string) => {
    setTempSelectedShops((prev) => {
      if (prev.includes(shop)) {
        return prev.filter((item) => item !== shop);
      }

      return [...prev, shop];
    });
  };

  // 전체 선택
  const handleSelectAll = () => {
    setTempSelectedShops([]);
  };

  // 적용
  const handleApply = () => {
    onApply(tempSelectedShops);
    setIsOpen(false);
  };

  const buttonLabel =
    selectedShops.length === 0
      ? "쇼핑몰"
      : `쇼핑몰 ${selectedShops.length}`;

  return (
    <>
      <button
        type="button"
        className="filter-button"
        onClick={handleOpen}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="shop-modal-overlay"
          onClick={handleClose}
        >
          <div
            className="shop-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="shop-modal-header">
              <h3>쇼핑몰 선택</h3>

              <button
                type="button"
                className="shop-modal-close"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <div className="shop-modal-content">
              <button
                type="button"
                className={`shop-option shop-all ${
                  tempSelectedShops.length === 0
                    ? "active"
                    : ""
                }`}
                onClick={handleSelectAll}
              >
                전체
              </button>

              {shops.map((shop) => (
                <label
                  key={shop}
                  className="shop-option"
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedShops.includes(shop)}
                    onChange={() => handleToggle(shop)}
                  />

                  <span>{shop}</span>
                </label>
              ))}
            </div>

            <div className="shop-modal-footer">
              <button
                type="button"
                className="shop-modal-cancel"
                onClick={handleClose}
              >
                취소
              </button>

              <button
                type="button"
                className="shop-modal-apply"
                onClick={handleApply}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}