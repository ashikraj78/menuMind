"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RestaurantOwnerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    restaurantName: "",
    ownerName: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Form submitted:", formData);
    // For demo purposes, redirect to dashboard
    window.location.href = "/restaurant-owner/dashboard";
  };

  return (
    <div className="min-h-screen bg-[var(--primary-yellow)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="MenuMind Logo"
              width={80}
              height={80}
              className="rounded-[20px]"
            />
          </div>
          <h1
            className="text-[30px] font-bold text-[var(--text-dark)] mb-2"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            MenuMind
          </h1>
          <p
            className="text-[13px] font-medium text-[var(--text-dark)]"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Restaurant Owner Portal
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2
              className="text-[20px] font-medium text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {isLogin
                ? "Sign in to manage your restaurant menu"
                : "Join MenuMind to digitize your menu"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant Name"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-[20px] text-[12px] text-[var(--text-dark)] placeholder-[var(--text-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Owner Name"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-[20px] text-[12px] text-[var(--text-dark)] placeholder-[var(--text-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-200 rounded-[20px] text-[12px] text-[var(--text-dark)] placeholder-[var(--text-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-[20px] text-[12px] text-[var(--text-dark)] placeholder-[var(--text-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-[20px] text-[12px] text-[var(--text-dark)] placeholder-[var(--text-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary-orange)] text-white py-4 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[12px] text-[var(--primary-orange)] font-medium"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button
                className="text-[12px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            href="/restaurant"
            className="text-[12px] text-[var(--text-dark)] font-medium"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            ← Back to Customer App
          </Link>
        </div>
      </div>
    </div>
  );
}
