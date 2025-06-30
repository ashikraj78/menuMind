"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleUserClick = () => {
    router.push("/restaurant");
  };

  const handleRestaurantOwnerClick = () => {
    router.push("/restaurant-owner");
  };

  const handleDemoClick = () => {
    router.push("/demo");
  };

  return (
    <div className="responsive-container">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--primary-yellow)] to-yellow-300 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8 lg:space-y-12 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="MenuMind Logo"
              width={120}
              height={120}
              className="rounded-[30px] shadow-lg"
            />
          </div>

          {/* Hello World */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
            Hello World
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Welcome to MenuMind - Your AI-Powered Food Discovery Platform
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center items-center max-w-lg mx-auto">
            <button
              onClick={handleUserClick}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-12 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:min-w-[240px] lg:min-w-[300px] text-base sm:text-lg lg:text-xl"
            >
              For Customers
            </button>

            <button
              onClick={handleRestaurantOwnerClick}
              className="bg-[var(--primary-orange)] hover:bg-orange-600 text-white font-semibold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-12 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:min-w-[240px] lg:min-w-[300px] text-base sm:text-lg lg:text-xl"
            >
              For Restaurant Owners
            </button>

            <button
              onClick={handleDemoClick}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-12 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:min-w-[240px] lg:min-w-[300px] text-base sm:text-lg lg:text-xl"
            >
              View Demo & Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
