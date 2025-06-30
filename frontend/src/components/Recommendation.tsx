"use client";

import { Star, Heart } from "lucide-react";
import { useState } from "react";
import FoodDetailModal from "./FoodDetailModal";

const recommendedItems = [
  {
    id: 1,
    name: "Caesar Salad",
    price: "$8.50",
    rating: 4.7,
    image: "🥗",
    favorite: false,
    category: "Meal",
  },
  {
    id: 2,
    name: "Chicken Wings",
    price: "$11.25",
    rating: 4.9,
    image: "🍗",
    favorite: true,
    category: "Meal",
  },
  {
    id: 3,
    name: "Fish Tacos",
    price: "$13.75",
    rating: 4.6,
    image: "🌮",
    favorite: false,
    category: "Meal",
  },
  {
    id: 4,
    name: "Smoothie Bowl",
    price: "$9.99",
    rating: 4.8,
    image: "🍓",
    favorite: true,
    category: "Vegan",
  },
  {
    id: 5,
    name: "Nachos",
    price: "$6.75",
    rating: 4.4,
    image: "🌽",
    favorite: false,
    category: "Snacks",
  },
  {
    id: 6,
    name: "Pretzels",
    price: "$4.25",
    rating: 4.2,
    image: "🥨",
    favorite: true,
    category: "Snacks",
  },
  {
    id: 7,
    name: "Cheesecake",
    price: "$7.50",
    rating: 4.8,
    image: "🍰",
    favorite: true,
    category: "Dessert",
  },
  {
    id: 8,
    name: "Donuts",
    price: "$5.99",
    rating: 4.5,
    image: "🍩",
    favorite: false,
    category: "Dessert",
  },
  {
    id: 9,
    name: "Quinoa Bowl",
    price: "$10.50",
    rating: 4.6,
    image: "🥙",
    favorite: true,
    category: "Vegan",
  },
  {
    id: 10,
    name: "Herbal Tea",
    price: "$3.75",
    rating: 4.3,
    image: "🍵",
    favorite: false,
    category: "Drinks",
  },
  {
    id: 11,
    name: "Iced Coffee",
    price: "$4.50",
    rating: 4.7,
    image: "🧊",
    favorite: true,
    category: "Drinks",
  },
];

interface RecommendationProps {
  activeCategory: string;
  onViewDetails?: (productId: string) => void;
}

export default function Recommendation({
  activeCategory,
  onViewDetails,
}: RecommendationProps) {
  const [selectedItem, setSelectedItem] = useState<
    (typeof recommendedItems)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter items based on active category
  const filteredItems = recommendedItems.filter(
    (item) => item.category === activeCategory
  );

  const handleItemClick = (item: (typeof recommendedItems)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="px-9 pb-16 lg:pb-24">
        {/* Recommendation Header */}
        <div className="mb-4">
          <h3 className="text-[20px] font-medium text-[var(--text-dark)]">
            Recommend
          </h3>
        </div>

        {/* Recommendation Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {filteredItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              {/* Food Image Container */}
              <div className="bg-white rounded-[20px] h-[140px] flex items-center justify-center mb-2 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <span className="text-6xl">{item.image}</span>

                {/* Favorite Button */}
                <button
                  className="absolute top-2 right-2 w-4 h-4 bg-[var(--text-white)] rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle favorite toggle here if needed
                  }}
                >
                  <Heart
                    size={8}
                    className={
                      item.favorite
                        ? "text-[var(--primary-orange)] fill-current"
                        : "text-[var(--primary-orange)]"
                    }
                  />
                </button>

                {/* Rating */}
                <div className="absolute bottom-2 left-2 bg-white rounded-[30px] px-2 py-1 flex items-center gap-1">
                  <span className="text-[12px] font-normal text-[var(--text-dark)]">
                    {item.rating}
                  </span>
                  <Star
                    size={8}
                    className="text-[var(--star-gold)] fill-current"
                  />
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-2 right-2 bg-[var(--primary-orange)] rounded-tl-[30px] rounded-bl-[30px] px-3 py-2">
                  <span className="text-[12px] font-normal text-white">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Detail Modal */}
      <FoodDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewDetails={onViewDetails}
      />
    </>
  );
}
