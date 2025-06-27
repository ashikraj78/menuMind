# Project Brief: MenuMind

## 1. Project Overview

MenuMind is a web application designed to modernize the restaurant dining experience. It allows restaurant owners to digitize their menus effortlessly by scanning a physical menu card. The scanned menu is converted into a structured, editable digital format using AI. This digital menu is then made available to customers through a unique QR code.

Customers can scan the QR code to view the menu, and more importantly, interact with it through a natural language chatbot to get recommendations, filter dishes, and manage their orders.

The application will be a Progressive Web App (PWA), optimized for mobile and search engines (SEO).

## 2. Core Objectives

*   **For Restaurant Owners:**
    *   Provide a simple, fast way to digitize and manage menus.
    *   Eliminate the need for manual data entry.
    *   Enable easy updates to menu items, prices, and availability.
    *   Offer AI-powered image generation for menu items without photos.
    *   Generate a shareable QR code for each menu.

*   **For Customers:**
    *   Provide a modern, interactive, and accessible menu experience.
    *   Enable powerful, natural language search and filtering of menu items (e.g., "Find me a vegetarian pasta dish under ₹500").
    *   Offer a seamless cart and ordering system (ordering to be planned in a later phase).
    *   Ensure a fast, responsive, and mobile-first user interface.

## 3. Key Stakeholders & Roles

*   **Restaurant Owner:** The primary user of the admin-facing side of the application. They manage menus, items, and restaurant details.
*   **Customer:** The end-user who scans the QR code to view and interact with the menu.

## 4. High-Level Technical Stack

*   **Frontend:** Next.js (React)
*   **Backend:** FastAPI (Python)
*   **Database & Auth:** Supabase (PostgreSQL)
*   **AI Services:**
    *   **Menu Parsing:** Azure GPT-4o
    *   **Image Generation:** Google Gemini
    *   **Search/RAG:** Supabase pgvector
*   **Deployment:** To be determined (e.g., Vercel for frontend, a cloud provider for the backend).
