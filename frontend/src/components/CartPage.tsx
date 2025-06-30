"use client";

import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartPageProps {
  onBack: () => void;
}

export default function CartPage({ onBack }: CartPageProps) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white min-h-screen w-full max-w-[393px] mx-auto relative">
          {/* Header */}
          <div className="relative bg-[var(--primary-yellow)] pt-12 pb-6">
            <div className="flex items-center justify-between px-6">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={20} className="text-[var(--text-dark)]" />
              </button>

              <h1 className="text-[18px] font-bold text-[var(--text-dark)]">
                My Cart
              </h1>

              <div className="w-10 h-10"></div>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
            <div className="w-32 h-32 bg-[var(--background-gray)] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={64} className="text-[var(--text-gray)]" />
            </div>
            <h2 className="text-[24px] font-bold text-[var(--text-dark)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[16px] text-[var(--text-gray)] text-center mb-8">
              Add some delicious items to your cart to get started!
            </p>
            <button
              onClick={onBack}
              className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-[20px] text-[16px] font-bold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white min-h-screen w-full max-w-[393px] mx-auto relative">
        {/* Header */}
        <div className="relative bg-[var(--primary-yellow)] pt-12 pb-6">
          <div className="flex items-center justify-between px-6">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <ArrowLeft size={20} className="text-[var(--text-dark)]" />
            </button>

            <h1 className="text-[18px] font-bold text-[var(--text-dark)]">
              My Cart ({totalItems} items)
            </h1>

            <button
              onClick={clearCart}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Trash2 size={20} className="text-[var(--primary-orange)]" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div
          className="px-6 py-6 pb-32 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "default"}`}
                className="bg-[var(--background-gray)] rounded-[20px] p-4"
              >
                <div className="flex items-center gap-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-white rounded-[15px] flex items-center justify-center">
                    <span className="text-3xl">{item.image}</span>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-[var(--text-dark)] mb-1">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-[12px] text-[var(--text-gray)] mb-1">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="text-[14px] font-medium text-[var(--primary-orange)]">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
                    <Trash2
                      size={16}
                      className="text-[var(--primary-orange)]"
                    />
                  </button>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                    >
                      <Minus size={16} className="text-[var(--text-dark)]" />
                    </button>
                    <span className="text-[16px] font-bold text-[var(--text-dark)] min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-[var(--primary-orange)] flex items-center justify-center"
                    >
                      <Plus size={16} className="text-white" />
                    </button>
                  </div>

                  <div className="text-[18px] font-bold text-[var(--text-dark)]">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-8 bg-[var(--background-gray)] rounded-[20px] p-6">
            <h3 className="text-[18px] font-bold text-[var(--text-dark)] mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[14px] text-[var(--text-gray)]">
                  Subtotal
                </span>
                <span className="text-[14px] font-medium text-[var(--text-dark)]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[14px] text-[var(--text-gray)]">
                  Delivery Fee
                </span>
                <span className="text-[14px] font-medium text-[var(--text-dark)]">
                  $2.50
                </span>
              </div>
              <div className="h-px bg-gray-200 my-3"></div>
              <div className="flex justify-between">
                <span className="text-[16px] font-bold text-[var(--text-dark)]">
                  Total
                </span>
                <span className="text-[16px] font-bold text-[var(--primary-orange)]">
                  ${(totalPrice + 2.5).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Checkout Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <button className="w-full bg-[var(--primary-orange)] text-white py-4 rounded-[20px] text-[16px] font-bold">
            Proceed to Checkout - ${(totalPrice + 2.5).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
