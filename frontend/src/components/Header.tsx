"use client";

import { Battery, Signal, Wifi } from "lucide-react";
import SearchBar from "./SearchBar";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onCartClick?: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <div className="py-2 sm:py-3 lg:py-4 bg-[var(--primary-yellow)] text-[var(--text-dark)]">
      {/* Top Icons */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 lg:mb-6 px-4 sm:px-6 lg:px-8 mt-3 sm:mt-4 lg:mt-6">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Menu Icon */}
          <div className="bg-[var(--primary-orange)] p-2 sm:p-3 lg:p-4 rounded sm:rounded-lg">
            <div className="flex flex-col gap-1">
              <div className="w-3 sm:w-4 lg:w-5 h-0.5 sm:h-1 lg:h-1.5 bg-white rounded"></div>
              <div className="w-3 sm:w-4 lg:w-5 h-0.5 sm:h-1 lg:h-1.5 bg-white rounded"></div>
              <div className="w-3 sm:w-4 lg:w-5 h-0.5 sm:h-1 lg:h-1.5 bg-white rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-4 sm:mx-6 lg:mx-8">
          <SearchBar />
        </div>

        {/* Cart Icon */}
        <button
          onClick={onCartClick}
          className="bg-[var(--background-gray)] p-2 sm:p-3 lg:p-4 rounded sm:rounded-lg relative"
        >
          <ShoppingCart
            size={16}
            className="text-[var(--primary-orange)] sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          />
          {cartItemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-[var(--primary-orange)] text-white text-[10px] sm:text-xs lg:text-sm font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
