"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryNavigation from "@/components/CategoryNavigation";
import PromoCard from "@/components/PromoCard";
import FoodGrid from "@/components/FoodGrid";
import Recommendation from "@/components/Recommendation";
import CategoryProducts from "@/components/CategoryProducts";
import ProductDetailPage from "@/components/ProductDetailPage";
import CartPageModal from "@/components/CartPageModal";
import ChatInterface from "@/components/ChatInterface";
import { CartProvider } from "@/context/CartContext";

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "productDetail">(
    "home"
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleViewProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView("productDetail");
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProductId(null);
  };

  return (
    <CartProvider>
      {currentView === "productDetail" && selectedProductId ? (
        <ProductDetailPage
          productId={selectedProductId}
          onBack={handleBackToHome}
        />
      ) : (
        <>
          {/* Full viewport yellow background */}
          <div className="fixed inset-0 bg-[var(--primary-yellow)] -z-10"></div>

          <div className="w-full min-h-screen relative">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-20 w-full bg-[var(--primary-yellow)]">
              <div className="max-w-2xl mx-auto">
                <Header onCartClick={handleCartClick} />
              </div>
            </div>

            {/* Fixed Category Navigation */}
            <div className="fixed left-0 right-0 lg:top-26 top-18 z-20 w-full bg-[var(--primary-yellow)] pt-4 sm:pt-6">
              <div className="max-w-2xl mx-auto">
                <div className="bg-[var(--background-gray)] rounded-t-[20px] sm:rounded-t-[30px]  pt-4 pb-1 sm:pt-6">
                  <CategoryNavigation
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                  {/* Divider Line */}
                  <div className="mx-6 sm:mx-9 mb-0">
                    <div className="h-px bg-[var(--primary-yellow)]"></div>
                  </div>
                </div>
                {/* Extend gray background to full width below category nav */}
                {/* <div className="w-screen relative left-1/2 transform -translate-x-1/2 bg-[var(--background-gray)] h-0"></div> */}
              </div>
            </div>

            {/* Main Content Container */}
            <div
              className="w-full flex-1 flex flex-col min-h-0 pb-16 sm:pb-20 lg:pb-8 pt-2 lg:pt-8 relative"
              style={{ marginTop: "180px" }}
            >
              {/* Full width yellow background */}
              <div className="absolute inset-0 bg-[var(--primary-yellow)]"></div>

              <div className="max-w-2xl mx-auto w-full relative z-10">
                <div className="bg-[var(--background-gray)] pt-6 ">
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto ">
                    {activeCategory ? (
                      /* Show Category Products when a category is selected */
                      <CategoryProducts
                        category={activeCategory}
                        onViewDetails={handleViewProductDetails}
                      />
                    ) : (
                      /* Show Default Content (Best Seller, Promo, Recommend) when no category is selected */
                      <>
                        {/* Food Grid */}
                        <FoodGrid
                          activeCategory="Meal"
                          onViewDetails={handleViewProductDetails}
                        />

                        {/* Promotional Card */}
                        <PromoCard />

                        {/* Recommendation */}
                        <Recommendation
                          activeCategory="Vegan"
                          onViewDetails={handleViewProductDetails}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Chat Interface */}
            <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-[var(--primary-orange)]">
              <div className="max-w-2xl mx-auto">
                <ChatInterface />
              </div>
            </div>
          </div>

          {/* Cart Overlay */}
          {isCartOpen && (
            <CartPageModal isOpen={isCartOpen} onClose={handleCloseCart} />
          )}
        </>
      )}
    </CartProvider>
  );
}
