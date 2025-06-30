"use client";

import { Utensils, Cake, Leaf, Coffee, Cookie } from "lucide-react";

const categories = [
  { name: "Snacks", icon: Cookie },
  { name: "Meal", icon: Utensils },
  { name: "Vegan", icon: Leaf },
  { name: "Dessert", icon: Cake },
  { name: "Drinks", icon: Coffee },
];

interface CategoryNavigationProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryNavigation({
  activeCategory,
  onCategoryChange,
}: CategoryNavigationProps) {
  return (
    <div className="flex justify-center gap-8 px-8 mb-4 ">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.name;
        return (
          <div
            key={category.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onCategoryChange(isActive ? null : category.name)}
          >
            {/* Icon Background */}
            <div
              className={`rounded-[30px] p-3 mb-1 transition-colors ${
                isActive
                  ? "bg-[var(--primary-orange)]"
                  : "bg-[var(--accent-yellow)]"
              }`}
            >
              <Icon
                size={24}
                className={`transition-colors ${
                  isActive ? "text-white" : "text-[var(--primary-orange)]"
                }`}
                strokeWidth={1}
              />
            </div>

            {/* Category Name */}
            <span
              className={`text-[12px] font-normal text-center transition-colors ${
                isActive
                  ? "text-[var(--primary-orange)] font-medium"
                  : "text-[var(--text-dark)]"
              }`}
            >
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
