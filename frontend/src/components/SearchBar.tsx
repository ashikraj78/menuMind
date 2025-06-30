"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 flex items-center gap-2 sm:gap-3 shadow-sm">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 text-xs sm:text-sm lg:text-base font-light text-[var(--text-gray)] bg-transparent outline-none placeholder:text-[var(--text-gray)]"
        />
        <div className="bg-[var(--primary-orange)] rounded-full p-1.5 sm:p-2 lg:p-2.5">
          <Search
            size={12}
            className="text-[var(--background-gray)] sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          />
        </div>
      </div>
    </div>
  );
}
