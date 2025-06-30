"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface UploadedMenu {
  id: string;
  name: string;
  status: "uploading" | "processing" | "ready" | "approved";
  uploadedAt: Date;
  imageCount: number;
}

export default function RestaurantOwnerDashboard() {
  const [uploadedMenus, setUploadedMenus] = useState<UploadedMenu[]>([
    {
      id: "1",
      name: "Main Menu",
      status: "approved",
      uploadedAt: new Date("2024-01-15"),
      imageCount: 3,
    },
    {
      id: "2",
      name: "Breakfast Special",
      status: "ready",
      uploadedAt: new Date("2024-01-20"),
      imageCount: 2,
    },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newMenu: UploadedMenu = {
      id: Date.now().toString(),
      name: `Menu Upload ${uploadedMenus.length + 1}`,
      status: "uploading",
      uploadedAt: new Date(),
      imageCount: files.length,
    };

    setUploadedMenus((prev) => [newMenu, ...prev]);

    // Simulate upload process
    setTimeout(() => {
      setUploadedMenus((prev) =>
        prev.map((menu) =>
          menu.id === newMenu.id ? { ...menu, status: "processing" } : menu
        )
      );
    }, 2000);

    setTimeout(() => {
      setUploadedMenus((prev) =>
        prev.map((menu) =>
          menu.id === newMenu.id ? { ...menu, status: "ready" } : menu
        )
      );
      setIsUploading(false);
    }, 5000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "ready":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "uploading":
        return "Uploading...";
      case "processing":
        return "AI Processing...";
      case "ready":
        return "Ready for Review";
      case "approved":
        return "Live";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--primary-yellow)]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="MenuMind Logo"
                width={48}
                height={48}
                className="rounded-[12px]"
              />
              <div>
                <h1
                  className="text-[20px] font-bold text-[var(--text-dark)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  MenuMind Dashboard
                </h1>
                <p
                  className="text-[12px] text-[var(--text-gray)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  Manage your restaurant menus
                </p>
              </div>
            </div>
            <button
              className="text-[12px] text-[var(--primary-orange)] font-medium"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-[30px] p-8 mb-8 shadow-lg">
          <h2
            className="text-[20px] font-medium text-[var(--text-dark)] mb-4"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Upload Menu Images
          </h2>
          <p
            className="text-[12px] text-[var(--text-gray)] mb-6"
            style={{ fontFamily: "League Spartan, sans-serif" }}
          >
            Upload images of your menu cards. Our AI will extract the menu
            items, descriptions, and prices.
          </p>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-[20px] p-8 text-center transition-colors ${
              dragActive
                ? "border-[var(--primary-orange)] bg-orange-50"
                : "border-gray-300 hover:border-[var(--primary-orange)]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-[var(--text-gray)]"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              className="text-[16px] font-medium text-[var(--text-dark)] mb-2"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Drag and drop your menu images here
            </h3>
            <p
              className="text-[12px] text-[var(--text-gray)] mb-4"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Or click to browse files (PNG, JPG, PDF)
            </p>
            <label
              className="inline-block bg-[var(--primary-orange)] text-white px-6 py-3 rounded-[20px] text-[12px] font-medium cursor-pointer hover:opacity-90 transition-opacity"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Choose Files
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={isUploading}
              />
            </label>
          </div>

          {isUploading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-[20px] flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--primary-orange)]"></div>
              <span
                className="ml-3 text-[12px] text-[var(--text-dark)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Uploading and processing your menu images...
              </span>
            </div>
          )}
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-[20px] font-medium text-[var(--text-dark)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Your Menus
            </h2>
            <span
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {uploadedMenus.length} menu{uploadedMenus.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-4">
            {uploadedMenus.map((menu) => (
              <div
                key={menu.id}
                className="border border-gray-200 rounded-[20px] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-[16px] font-medium text-[var(--text-dark)]"
                        style={{ fontFamily: "League Spartan, sans-serif" }}
                      >
                        {menu.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-medium ${getStatusColor(
                          menu.status
                        )}`}
                        style={{ fontFamily: "League Spartan, sans-serif" }}
                      >
                        {getStatusText(menu.status)}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-4 text-[12px] text-[var(--text-gray)]"
                      style={{ fontFamily: "League Spartan, sans-serif" }}
                    >
                      <span>
                        {menu.imageCount} image
                        {menu.imageCount !== 1 ? "s" : ""}
                      </span>
                      <span>•</span>
                      <span>
                        Uploaded {menu.uploadedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {menu.status === "ready" && (
                      <Link
                        href={`/restaurant-owner/review/${menu.id}`}
                        className="bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                        style={{ fontFamily: "League Spartan, sans-serif" }}
                      >
                        Review & Approve
                      </Link>
                    )}
                    {menu.status === "approved" && (
                      <Link
                        href={`/restaurant-owner/qr-code/${menu.id}`}
                        className="bg-[var(--accent-yellow)] text-[var(--text-dark)] px-4 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                        style={{ fontFamily: "League Spartan, sans-serif" }}
                      >
                        View QR Code
                      </Link>
                    )}
                    <button
                      className="text-[var(--text-gray)] px-4 py-2 text-[12px]"
                      style={{ fontFamily: "League Spartan, sans-serif" }}
                    >
                      •••
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {uploadedMenus.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[var(--text-gray)] mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-[16px] font-medium text-[var(--text-dark)] mb-2"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                No menus uploaded yet
              </h3>
              <p
                className="text-[12px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Upload your first menu to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
