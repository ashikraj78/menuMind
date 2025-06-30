"use client";

import {
  ArrowLeft,
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

// Mock product data - this would typically come from an API or props
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Burger Deluxe",
      price: 10.3,
      originalPrice: 12.5,
      rating: 5.0,
      reviewCount: 120,
      image: "🍔",
      favorite: true,
      category: "Meal",
      description:
        "A delicious gourmet burger made with premium beef patty, fresh lettuce, tomatoes, onions, and our special sauce. Served with crispy fries.",
      ingredients: [
        "Beef Patty",
        "Fresh Lettuce",
        "Tomatoes",
        "Onions",
        "Special Sauce",
        "Brioche Bun",
      ],
      cookingTime: "15-20 mins",
      calories: 650,
      images: ["🍔", "🍟", "🥤"],
    },
  };
  return products[id as keyof typeof products];
};

export default function ProductDetailPage({
  productId,
  onBack,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addToCart } = useCart();
  const product = getProductById(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const sizes = [
    { name: "Small", price: product.price - 2 },
    { name: "Medium", price: product.price },
    { name: "Large", price: product.price + 3 },
  ];

  const currentPrice =
    sizes.find((size) => size.name === selectedSize)?.price || product.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: currentPrice,
      image: product.image,
      category: product.category,
      quantity: quantity,
      size: selectedSize,
    });

    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false);
      // Optionally navigate back or show success message
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="w-full mx-auto relative">
        {/* Header */}
        <div className="relative bg-[var(--primary-yellow)] pt-12 pb-6">
          <div className="flex items-center justify-between px-6 max-w-2xl mx-auto">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <ArrowLeft size={20} className="text-[var(--text-dark)]" />
            </button>

            <h1 className="text-[18px] font-bold text-[var(--text-dark)]">
              Product Details
            </h1>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart
                size={20}
                className={
                  isFavorite
                    ? "text-[var(--primary-orange)] fill-current"
                    : "text-[var(--primary-orange)]"
                }
              />
            </button>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="bg-[var(--primary-yellow)] pb-8">
          <div className="px-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-[20px] h-[250px] flex items-center justify-center relative shadow-md">
              <span className="text-9xl">
                {product.images[activeImageIndex]}
              </span>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === activeImageIndex
                        ? "bg-[var(--primary-orange)]"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-t-[30px] -mt-6 relative z-10 flex-1">
          <div className="px-6 pt-8 max-w-2xl mx-auto">
            {/* Product Info */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-[24px] font-bold text-[var(--text-dark)] flex-1">
                  {product.name}
                </h2>
                <div className="text-right">
                  <div className="text-[24px] font-bold text-[var(--primary-orange)]">
                    ${currentPrice.toFixed(2)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-[16px] text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star
                    size={16}
                    className="text-[var(--star-gold)] fill-current"
                  />
                  <span className="text-[16px] font-medium text-[var(--text-dark)]">
                    {product.rating}
                  </span>
                </div>
                <span className="text-[14px] text-[var(--text-gray)]">
                  ({product.reviewCount} reviews)
                </span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-[12px] text-[var(--text-gray)]">
                    ⏱️ {product.cookingTime}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] text-[var(--text-gray)] leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-[18px] font-bold text-[var(--text-dark)] mb-3">
                Size
              </h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`flex-1 py-3 px-4 rounded-[15px] border-2 ${
                      selectedSize === size.name
                        ? "border-[var(--primary-orange)] bg-[var(--primary-orange)]/10"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-[14px] font-medium ${
                          selectedSize === size.name
                            ? "text-[var(--primary-orange)]"
                            : "text-[var(--text-dark)]"
                        }`}
                      >
                        {size.name}
                      </div>
                      <div
                        className={`text-[12px] ${
                          selectedSize === size.name
                            ? "text-[var(--primary-orange)]"
                            : "text-[var(--text-gray)]"
                        }`}
                      >
                        ${size.price.toFixed(2)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-[18px] font-bold text-[var(--text-dark)] mb-3">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-[var(--background-gray)] text-[var(--text-dark)] px-3 py-1 rounded-[20px] text-[12px]"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="mb-8">
              <h3 className="text-[18px] font-bold text-[var(--text-dark)] mb-3">
                Nutrition
              </h3>
              <div className="bg-[var(--background-gray)] rounded-[15px] p-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[var(--text-dark)]">
                    Calories
                  </span>
                  <span className="text-[14px] font-medium text-[var(--text-dark)]">
                    {product.calories} cal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 w-full">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
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

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full py-4 rounded-[20px] text-[16px] font-bold flex items-center justify-center gap-2 ${
                isAddingToCart
                  ? "bg-green-500 text-white"
                  : "bg-[var(--primary-orange)] text-white"
              }`}
            >
              <ShoppingCart size={20} />
              {isAddingToCart
                ? "Added to Cart!"
                : `Add to Cart - $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
