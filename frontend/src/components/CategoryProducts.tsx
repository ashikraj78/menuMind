"use client";

import { Star, Heart } from "lucide-react";
import { useState } from "react";
import FoodDetailModal from "./FoodDetailModal";

const allProducts = [
  // Meal items
  {
    id: 1,
    name: "Burger Deluxe",
    price: "$10.30",
    rating: 5.0,
    image: "🍔",
    favorite: true,
    category: "Meal",
  },
  {
    id: 2,
    name: "Pizza Special",
    price: "$12.99",
    rating: 5.0,
    image: "🍕",
    favorite: true,
    category: "Meal",
  },
  {
    id: 3,
    name: "Sushi Roll",
    price: "$15.50",
    rating: 4.8,
    image: "🍣",
    favorite: false,
    category: "Meal",
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: "$18.75",
    rating: 4.9,
    image: "🍝",
    favorite: true,
    category: "Meal",
  },
  {
    id: 13,
    name: "Caesar Salad",
    price: "$8.50",
    rating: 4.7,
    image: "🥗",
    favorite: false,
    category: "Meal",
  },
  {
    id: 14,
    name: "Chicken Wings",
    price: "$11.25",
    rating: 4.9,
    image: "🍗",
    favorite: true,
    category: "Meal",
  },
  // Snacks items
  {
    id: 5,
    name: "Chocolate Chips",
    price: "$5.99",
    rating: 4.6,
    image: "🍪",
    favorite: false,
    category: "Snacks",
  },
  {
    id: 6,
    name: "Potato Chips",
    price: "$3.50",
    rating: 4.3,
    image: "🥔",
    favorite: true,
    category: "Snacks",
  },
  {
    id: 15,
    name: "Nachos",
    price: "$6.75",
    rating: 4.4,
    image: "🌽",
    favorite: false,
    category: "Snacks",
  },
  {
    id: 16,
    name: "Pretzels",
    price: "$4.25",
    rating: 4.2,
    image: "🥨",
    favorite: true,
    category: "Snacks",
  },
  // Dessert items
  {
    id: 7,
    name: "Chocolate Cake",
    price: "$8.75",
    rating: 4.9,
    image: "🍰",
    favorite: true,
    category: "Dessert",
  },
  {
    id: 8,
    name: "Ice Cream",
    price: "$6.50",
    rating: 4.7,
    image: "🍦",
    favorite: false,
    category: "Dessert",
  },
  {
    id: 17,
    name: "Cheesecake",
    price: "$7.50",
    rating: 4.8,
    image: "🧀",
    favorite: true,
    category: "Dessert",
  },
  {
    id: 18,
    name: "Donuts",
    price: "$5.99",
    rating: 4.5,
    image: "🍩",
    favorite: false,
    category: "Dessert",
  },
  // Vegan items
  {
    id: 9,
    name: "Avocado Toast",
    price: "$9.25",
    rating: 4.8,
    image: "🥑",
    favorite: true,
    category: "Vegan",
  },
  {
    id: 10,
    name: "Green Smoothie",
    price: "$7.99",
    rating: 4.5,
    image: "🥬",
    favorite: false,
    category: "Vegan",
  },
  {
    id: 19,
    name: "Smoothie Bowl",
    price: "$9.99",
    rating: 4.8,
    image: "🍓",
    favorite: true,
    category: "Vegan",
  },
  {
    id: 20,
    name: "Quinoa Bowl",
    price: "$10.50",
    rating: 4.6,
    image: "🥙",
    favorite: true,
    category: "Vegan",
  },
  // Drinks items
  {
    id: 11,
    name: "Coffee",
    price: "$4.25",
    rating: 4.6,
    image: "☕",
    favorite: true,
    category: "Drinks",
  },
  {
    id: 12,
    name: "Fresh Juice",
    price: "$5.75",
    rating: 4.4,
    image: "🧃",
    favorite: false,
    category: "Drinks",
  },
  {
    id: 21,
    name: "Herbal Tea",
    price: "$3.75",
    rating: 4.3,
    image: "🍵",
    favorite: false,
    category: "Drinks",
  },
  {
    id: 22,
    name: "Iced Coffee",
    price: "$4.50",
    rating: 4.7,
    image: "🧊",
    favorite: true,
    category: "Drinks",
  },
];

interface CategoryProductsProps {
  category: string;
  onViewDetails?: (productId: string) => void;
}

export default function CategoryProducts({
  category,
  onViewDetails,
}: CategoryProductsProps) {
  const [selectedItem, setSelectedItem] = useState<
    (typeof allProducts)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter items based on selected category
  const categoryProducts = allProducts.filter(
    (item) => item.category === category
  );

  const handleItemClick = (item: (typeof allProducts)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="px-8">
        {/* Category Header */}
        <div className="mb-6">
          <h2 className="text-[24px] font-bold text-[var(--text-dark)]">
            {category}
          </h2>
          <p className="text-[14px] text-[var(--text-gray)] mt-1">
            {categoryProducts.length} items available
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categoryProducts.map((item) => (
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

              {/* Product Name */}
              <div className="px-2">
                <h3 className="text-[14px] font-medium text-[var(--text-dark)] text-center">
                  {item.name}
                </h3>
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
