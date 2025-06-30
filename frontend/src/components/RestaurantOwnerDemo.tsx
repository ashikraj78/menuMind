"use client";

import Link from "next/link";
import Image from "next/image";

export default function RestaurantOwnerDemo() {
  return (
    <div className="min-h-screen bg-[var(--primary-yellow)] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="MenuMind Logo"
              width={100}
              height={100}
              className="rounded-[25px]"
            />
          </div>
          <h1
            className="text-[32px] font-bold text-[var(--text-dark)] mb-4"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            MenuMind for Restaurant Owners
          </h1>
          <p
            className="text-[16px] text-[var(--text-dark)] mb-8"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Transform your physical menu cards into smart digital experiences
            with AI
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Step 1: Login/Signup */}
          <div className="bg-white rounded-[30px] p-6 shadow-lg text-center">
            <div className="bg-[var(--primary-orange)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3
              className="text-[16px] font-bold text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Sign Up / Login
            </h3>
            <p
              className="text-[12px] text-[var(--text-gray)] mb-4"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Create your restaurant owner account
            </p>
            <Link
              href="/restaurant-owner"
              className="inline-block bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Try Demo
            </Link>
          </div>

          {/* Step 2: Upload Menu */}
          <div className="bg-white rounded-[30px] p-6 shadow-lg text-center">
            <div className="bg-[var(--primary-orange)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3
              className="text-[16px] font-bold text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Upload Menu Images
            </h3>
            <p
              className="text-[12px] text-[var(--text-gray)] mb-4"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Upload photos of your menu cards
            </p>
            <Link
              href="/restaurant-owner/dashboard"
              className="inline-block bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              View Upload
            </Link>
          </div>

          {/* Step 3: Review & Approve */}
          <div className="bg-white rounded-[30px] p-6 shadow-lg text-center">
            <div className="bg-[var(--primary-orange)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3
              className="text-[16px] font-bold text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Review AI Data
            </h3>
            <p
              className="text-[12px] text-[var(--text-gray)] mb-4"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Review and edit AI-extracted menu data
            </p>
            <Link
              href="/restaurant-owner/review/2"
              className="inline-block bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              View Review
            </Link>
          </div>

          {/* Step 4: QR Code */}
          <div className="bg-white rounded-[30px] p-6 shadow-lg text-center">
            <div className="bg-[var(--primary-orange)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3
              className="text-[16px] font-bold text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Get QR Code
            </h3>
            <p
              className="text-[12px] text-[var(--text-gray)] mb-4"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Print QR code for customers to scan
            </p>
            <Link
              href="/restaurant-owner/qr-code/1"
              className="inline-block bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              View QR Code
            </Link>
          </div>
        </div>

        {/* Design System Colors */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg mb-8">
          <h3
            className="text-[20px] font-bold text-[var(--text-dark)] mb-6"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Design System from Figma
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-orange)] rounded-[20px] mx-auto mb-2"></div>
              <p
                className="text-[10px] text-[var(--text-dark)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Primary Orange
                <br />
                #E95322
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-yellow)] rounded-[20px] mx-auto mb-2"></div>
              <p
                className="text-[10px] text-[var(--text-dark)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Primary Yellow
                <br />
                #F5CB58
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent-yellow)] rounded-[20px] mx-auto mb-2"></div>
              <p
                className="text-[10px] text-[var(--text-dark)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Accent Yellow
                <br />
                #F3E9B5
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--text-dark)] rounded-[20px] mx-auto mb-2"></div>
              <p
                className="text-[10px] text-[var(--text-dark)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Text Dark
                <br />
                #391713
              </p>
            </div>
          </div>

          <div
            className="text-[12px] text-[var(--text-gray)]"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            <p className="mb-2">
              <strong>Typography:</strong> League Spartan (300, 400, 500, 600,
              700)
            </p>
            <p className="mb-2">
              <strong>Border Radius:</strong> 20px, 30px, 50px
            </p>
            <p>
              <strong>Components:</strong> Rounded cards, outlined icons, clean
              shadows
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg">
          <h3
            className="text-[20px] font-bold text-[var(--text-dark)] mb-6"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Features Implemented
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                className="text-[16px] font-medium text-[var(--text-dark)] mb-3"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                🔐 Authentication
              </h4>
              <ul
                className="text-[12px] text-[var(--text-gray)] space-y-1"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                <li>• Login/Signup toggle interface</li>
                <li>• Restaurant owner registration</li>
                <li>• Responsive form design</li>
              </ul>
            </div>

            <div>
              <h4
                className="text-[16px] font-medium text-[var(--text-dark)] mb-3"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                📤 Menu Upload
              </h4>
              <ul
                className="text-[12px] text-[var(--text-gray)] space-y-1"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                <li>• Drag & drop interface</li>
                <li>• Multiple file support</li>
                <li>• Upload progress tracking</li>
              </ul>
            </div>

            <div>
              <h4
                className="text-[16px] font-medium text-[var(--text-dark)] mb-3"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                ✅ AI Review System
              </h4>
              <ul
                className="text-[12px] text-[var(--text-gray)] space-y-1"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                <li>• AI confidence scores</li>
                <li>• Inline editing capabilities</li>
                <li>• Category organization</li>
              </ul>
            </div>

            <div>
              <h4
                className="text-[16px] font-medium text-[var(--text-dark)] mb-3"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                🎯 QR Code Generation
              </h4>
              <ul
                className="text-[12px] text-[var(--text-gray)] space-y-1"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                <li>• Customizable QR codes</li>
                <li>• Print functionality</li>
                <li>• Direct menu links</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link
            href="/restaurant"
            className="text-[12px] text-[var(--text-dark)] font-medium hover:opacity-70 transition-opacity"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            ← View Customer Experience
          </Link>
        </div>
      </div>
    </div>
  );
}
