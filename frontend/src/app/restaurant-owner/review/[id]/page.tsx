"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  aiConfidence: number;
}

export default function MenuReview() {
  const params = useParams();
  const menuId = params.id as string;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      description:
        "Fresh tomato sauce, mozzarella cheese, and basil on a crispy thin crust",
      price: "$18.99",
      category: "Main Course",
      image: "/placeholder-food.jpg",
      aiConfidence: 95,
    },
    {
      id: "2",
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese",
      price: "$12.50",
      category: "Salads",
      image: "/placeholder-food.jpg",
      aiConfidence: 87,
    },
    {
      id: "3",
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie served with vanilla ice cream",
      price: "$8.99",
      category: "Desserts",
      image: "/placeholder-food.jpg",
      aiConfidence: 92,
    },
    {
      id: "4",
      name: "Grilled Salmon",
      description:
        "Fresh Atlantic salmon grilled to perfection with lemon herbs",
      price: "$24.99",
      category: "Main Course",
      image: "/placeholder-food.jpg",
      aiConfidence: 78,
    },
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item.id);
    setEditForm(item);
  };

  const handleSave = () => {
    if (!editingItem) return;

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === editingItem ? ({ ...item, ...editForm } as MenuItem) : item
      )
    );
    setEditingItem(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditForm({});
  };

  const handleDelete = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApprove = () => {
    // Here you would typically send the approved menu to your backend
    alert("Menu approved and published successfully!");
    window.location.href = "/restaurant-owner/dashboard";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-[var(--primary-yellow)]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
                  Review Menu Data
                </h1>
                <p
                  className="text-[12px] text-[var(--text-gray)]"
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                >
                  Review AI-extracted menu items and make any necessary
                  adjustments
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                className="bg-[var(--primary-orange)] text-white px-6 py-2 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Approve & Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-[20px] p-6 text-center">
            <div
              className="text-[24px] font-bold text-[var(--primary-orange)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {menuItems.length}
            </div>
            <div
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Items Found
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-6 text-center">
            <div
              className="text-[24px] font-bold text-[var(--primary-orange)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {categories.length}
            </div>
            <div
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Categories
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-6 text-center">
            <div
              className="text-[24px] font-bold text-green-600"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              {Math.round(
                menuItems.reduce((acc, item) => acc + item.aiConfidence, 0) /
                  menuItems.length
              )}
              %
            </div>
            <div
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Avg Confidence
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-6 text-center">
            <div
              className="text-[24px] font-bold text-[var(--primary-orange)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Ready
            </div>
            <div
              className="text-[12px] text-[var(--text-gray)]"
              style={{ fontFamily: "League Spartan, sans-serif" }}
            >
              Status
            </div>
          </div>
        </div>

        {/* Menu Items by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <h2
                className="text-[20px] font-medium text-[var(--text-dark)] mb-6"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                {category}
              </h2>

              <div className="space-y-4">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-[20px] p-6"
                    >
                      {editingItem === item.id ? (
                        // Edit Mode
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                className="block text-[12px] font-medium text-[var(--text-dark)] mb-2"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              >
                                Item Name
                              </label>
                              <input
                                type="text"
                                value={editForm.name || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full p-3 border border-gray-200 rounded-[20px] text-[12px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              />
                            </div>
                            <div>
                              <label
                                className="block text-[12px] font-medium text-[var(--text-dark)] mb-2"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              >
                                Price
                              </label>
                              <input
                                type="text"
                                value={editForm.price || ""}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    price: e.target.value,
                                  })
                                }
                                className="w-full p-3 border border-gray-200 rounded-[20px] text-[12px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              className="block text-[12px] font-medium text-[var(--text-dark)] mb-2"
                              style={{
                                fontFamily: "League Spartan, sans-serif",
                              }}
                            >
                              Description
                            </label>
                            <textarea
                              value={editForm.description || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full p-3 border border-gray-200 rounded-[20px] text-[12px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
                              style={{
                                fontFamily: "League Spartan, sans-serif",
                              }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSave}
                              className="bg-[var(--primary-orange)] text-white px-4 py-2 rounded-[20px] text-[12px] font-medium"
                              style={{
                                fontFamily: "League Spartan, sans-serif",
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-100 text-[var(--text-dark)] px-4 py-2 rounded-[20px] text-[12px] font-medium"
                              style={{
                                fontFamily: "League Spartan, sans-serif",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3
                                className="text-[16px] font-medium text-[var(--text-dark)]"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              >
                                {item.name}
                              </h3>
                              <span
                                className="text-[16px] font-bold text-[var(--primary-orange)]"
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              >
                                {item.price}
                              </span>
                              <span
                                className={`text-[10px] font-medium ${getConfidenceColor(
                                  item.aiConfidence
                                )}`}
                                style={{
                                  fontFamily: "League Spartan, sans-serif",
                                }}
                              >
                                {item.aiConfidence}% confidence
                              </span>
                            </div>
                            <p
                              className="text-[12px] text-[var(--text-gray)] leading-relaxed"
                              style={{
                                fontFamily: "League Spartan, sans-serif",
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-[var(--primary-orange)] hover:opacity-70 p-2"
                              title="Edit"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 hover:opacity-70 p-2"
                              title="Delete"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="bg-white rounded-[30px] p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-[16px] font-medium text-[var(--text-dark)] mb-2"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Ready to publish?
              </h3>
              <p
                className="text-[12px] text-[var(--text-gray)]"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Once approved, your menu will be live and customers can access
                it via QR code.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/restaurant-owner/dashboard"
                className="bg-gray-100 text-[var(--text-dark)] px-6 py-3 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Save Draft
              </Link>
              <button
                onClick={handleApprove}
                className="bg-[var(--primary-orange)] text-white px-6 py-3 rounded-[20px] text-[12px] font-medium hover:opacity-90 transition-opacity"
                style={{ fontFamily: "League Spartan, sans-serif" }}
              >
                Approve & Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
