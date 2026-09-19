"use client";

import { useState } from "react";

type StatusFilterValue = "all" | "on_sale" | "sold_out";

type StatusFilterProps = {
    value: StatusFilterValue;
    onChange: (value: StatusFilterValue) => void;
};

export default function StatusFilter({
    value,
    onChange,
}: StatusFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        {
            value: "all" as const,
            label: "전체",
            className: "",
        },
        {
            value: "on_sale" as const,
            label: "판매중",
            className: "on-sale",
        },
        {
            value: "sold_out" as const,
            label: "품절",
            className: "sold-out",
        },
    ];

    const selectedOption = options.find(
        (option) => option.value === value
    );

    const handleSelect = (newValue: StatusFilterValue) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className="filter-wrapper">
            <button
                type="button"
                className="filter-button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedOption?.label ?? "전체"} ▾
            </button>

            {isOpen && (
                <div className="filter-dropdown">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`filter-option ${option.className} ${value === option.value ? "active" : ""
                                }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}