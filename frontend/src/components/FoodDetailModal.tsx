"use client";

import { X, Star, Heart, Plus, Minus, Eye } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface FoodItem {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  favorite: boolean;
  category: string;
}

interface FoodDetailModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: (productId: string) => void;
}

export default function FoodDetailModal({
  item,
  isOpen,
  onClose,
  onViewDetails,
}: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(item?.favorite || false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addToCart } = useCart();

  if (!isOpen || !item) return null;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Convert price string to number (remove $ and convert)
    const priceNumber = parseFloat(item.price.replace("$", ""));

    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: priceNumber,
      image: item.image,
      category: item.category,
      quantity: quantity,
    });

    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false);
      onClose(); // Close modal after adding to cart
    }, 1000);
  };

  return (
    <div className="fixed  inset-0 bg-black/50 z-100 flex items-end justify-center">
      <div
        className="bg-white rounded-t-[30px] w-full p-6 animate-slide-up max-w-2xl"
        // style={{ maxWidth: "393px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold text-[var(--text-dark)]">
            Menu Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[var(--background-gray)]"
          >
            <X size={20} className="text-[var(--text-dark)]" />
          </button>
        </div>

        {/* Food Image */}
        <div className="bg-[var(--background-gray)] rounded-[20px] h-[200px] flex items-center justify-center mb-6 relative">
          <span className="text-8xl">{item.image}</span>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <Heart
              size={16}
              className={
                isFavorite
                  ? "text-[var(--primary-orange)] fill-current"
                  : "text-[var(--primary-orange)]"
              }
            />
          </button>
        </div>

        {/* Food Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[20px] font-bold text-[var(--text-dark)]">
              {item.name}
            </h3>
            <span className="text-[20px] font-bold text-[var(--primary-orange)]">
              {item.price}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star
                size={16}
                className="text-[var(--star-gold)] fill-current"
              />
              <span className="text-[14px] font-medium text-[var(--text-dark)]">
                {item.rating}
              </span>
            </div>
            <span className="text-[12px] text-[var(--text-gray)]">
              (120 reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-[14px] text-[var(--text-gray)] leading-relaxed mb-6">
            Delicious {item.name.toLowerCase()} made with fresh ingredients and
            traditional recipes. Perfect for {item.category.toLowerCase()} time
            with amazing flavors that will satisfy your cravings.
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[16px] font-medium text-[var(--text-dark)]">
            Quantity
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementQuantity}
              className="w-10 h-10 rounded-full bg-[var(--background-gray)] flex items-center justify-center"
            >
              <Minus size={16} className="text-[var(--text-dark)]" />
            </button>
            <span className="text-[18px] font-bold text-[var(--text-dark)] min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="w-10 h-10 rounded-full bg-[var(--primary-orange)] flex items-center justify-center"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* View Details Button */}
          {onViewDetails && (
            <button
              onClick={() => {
                onViewDetails(item.id.toString());
                onClose();
              }}
              className="w-full bg-[var(--background-gray)] text-[var(--text-dark)] py-4 rounded-[20px] text-[16px] font-bold flex items-center justify-center gap-2"
            >
              <Eye size={20} />
              View Full Details
            </button>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full py-4 rounded-[20px] text-[16px] font-bold ${
              isAddingToCart
                ? "bg-green-500 text-white"
                : "bg-[var(--primary-orange)] text-white"
            }`}
          >
            {isAddingToCart ? "Added to Cart!" : `Add to Cart - ${item.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add CSS for slide-up animation
const styles = `
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
