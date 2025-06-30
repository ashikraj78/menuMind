"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function QRCodePage() {
  const params = useParams();
  const menuId = params.id as string;

  // Mock restaurant data - in real app this would come from API
  const restaurantData = {
    name: "Bella Vista Restaurant",
    menuUrl: `https://menumind.app/menu/${menuId}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://menumind.app/menu/${menuId}`,
    menuName: "Main Menu",
    approvedDate: "January 20, 2024",
    itemCount: 24,
  };

  const [qrSize, setQrSize] = useState(200);
  const [includeRestaurantName, setIncludeRestaurantName] = useState(true);
  const [includeInstructions, setIncludeInstructions] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a download link for the QR code
    const link = document.createElement("a");
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
      restaurantData.menuUrl
    )}`;
    link.download = `${restaurantData.name}-menu-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(restaurantData.menuUrl);
    alert("Menu link copied to clipboard!");
  };

  const generateQRCodeUrl = (size: number) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      restaurantData.menuUrl
    )}`;
  };

  return (
    <div className="min-h-screen bg-[var(--primary-yellow)]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/restaurant-owner/dashboard"
                className="text-[var(--primary-orange)] hover:opacity-70"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <Image
                src="/logo.png"
                alt="MenuMind Logo"
                width={40}
                height={40}
                className="rounded-[10px]"
              />
              <div>
                <h1
                  className="text-[20px] font-bold text-[var(--text-dark)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  QR Code & Menu Link
                </h1>
                <p
                  className="text-[12px] text-[var(--text-gray)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  Print and display your QR code for customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Preview */}
          <div className="bg-white rounded-[30px] p-8 shadow-lg">
            <h2
              className="text-[20px] font-medium text-[var(--text-dark)] mb-6"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              QR Code Preview
            </h2>

            {/* QR Code Display */}
            <div className="bg-gray-50 rounded-[20px] p-8 text-center mb-6">
              {includeRestaurantName && (
                <h3
                  className="text-[16px] font-bold text-[var(--text-dark)] mb-4"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  {restaurantData.name}
                </h3>
              )}

              <div className="inline-block bg-white p-4 rounded-[20px] shadow-sm">
                <img
                  src={generateQRCodeUrl(qrSize)}
                  alt="Menu QR Code"
                  className="mx-auto"
                  style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
                />
              </div>

              {includeInstructions && (
                <div className="mt-4">
                  <p
                    className="text-[12px] text-[var(--text-dark)] font-medium mb-1"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Scan to view our menu
                  </p>
                  <p
                    className="text-[10px] text-[var(--text-gray)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Point your phone camera at this code
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 bg-[var(--primary-orange)] text-white py-3 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Print QR Code
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-[var(--accent-yellow)] text-[var(--text-dark)] py-3 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Download
              </button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* QR Code Settings */}
            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <h3
                className="text-[16px] font-medium text-[var(--text-dark)] mb-4"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Customize QR Code
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-[12px] font-medium text-[var(--text-dark)] mb-2"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    QR Code Size: {qrSize}px
                  </label>
                  <input
                    type="range"
                    min="150"
                    max="300"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div
                    className="flex justify-between text-[10px] text-[var(--text-gray)] mt-1"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] text-[var(--text-dark)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Include restaurant name
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={includeRestaurantName}
                      onChange={(e) =>
                        setIncludeRestaurantName(e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-orange)]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] text-[var(--text-dark)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Include instructions
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={includeInstructions}
                      onChange={(e) => setIncludeInstructions(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-orange)]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Menu Link */}
            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <h3
                className="text-[16px] font-medium text-[var(--text-dark)] mb-4"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Direct Menu Link
              </h3>

              <div className="bg-gray-50 rounded-[20px] p-4 mb-4">
                <p
                  className="text-[10px] text-[var(--text-gray)] mb-2"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  Share this link directly with customers:
                </p>
                <div className="bg-white rounded-[15px] p-3 border border-gray-200">
                  <code
                    className="text-[11px] text-[var(--text-dark)] break-all"
                    style={{ fontFamily: "monospace" }}
                  >
                    {restaurantData.menuUrl}
                  </code>
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full bg-[var(--primary-orange)] text-white py-3 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Copy Link
              </button>
            </div>

            {/* Menu Information */}
            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <h3
                className="text-[16px] font-medium text-[var(--text-dark)] mb-4"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Menu Information
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span
                    className="text-[12px] text-[var(--text-gray)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Menu Name:
                  </span>
                  <span
                    className="text-[12px] text-[var(--text-dark)] font-medium"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    {restaurantData.menuName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span
                    className="text-[12px] text-[var(--text-gray)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Items:
                  </span>
                  <span
                    className="text-[12px] text-[var(--text-dark)] font-medium"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    {restaurantData.itemCount} items
                  </span>
                </div>

                <div className="flex justify-between">
                  <span
                    className="text-[12px] text-[var(--text-gray)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Published:
                  </span>
                  <span
                    className="text-[12px] text-[var(--text-dark)] font-medium"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    {restaurantData.approvedDate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span
                    className="text-[12px] text-[var(--text-gray)]"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    Status:
                  </span>
                  <span
                    className="text-[12px] text-green-600 font-medium"
                    style={{ fontFamily: "League Spartan, sans-serif" }}
                  >
                    ● Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg mt-8">
          <h3
            className="text-[16px] font-medium text-[var(--text-dark)] mb-4"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            How to Use Your QR Code
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[var(--accent-yellow)] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span
                  className="text-[16px] font-bold text-[var(--text-dark)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  1
                </span>
              </div>
              <h4
                className="text-[12px] font-medium text-[var(--text-dark)] mb-2"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Print & Display
              </h4>
              <p
                className="text-[10px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Print your QR code and place it on tables, counters, or entrance
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[var(--accent-yellow)] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span
                  className="text-[16px] font-bold text-[var(--text-dark)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  2
                </span>
              </div>
              <h4
                className="text-[12px] font-medium text-[var(--text-dark)] mb-2"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Customer Scans
              </h4>
              <p
                className="text-[10px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Customers scan with their phone camera to access your menu
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[var(--accent-yellow)] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span
                  className="text-[16px] font-bold text-[var(--text-dark)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  3
                </span>
              </div>
              <h4
                className="text-[12px] font-medium text-[var(--text-dark)] mb-2"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Browse & Order
              </h4>
              <p
                className="text-[10px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                They can browse your menu and chat with AI for recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section,
          .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--primary-orange);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--primary-orange);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
