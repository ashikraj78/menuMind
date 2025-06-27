# Product Context: MenuMind

## 1. The Problem

In today's fast-paced world, traditional restaurant menus are static and outdated. 
- **For restaurant owners:** Creating, updating, and printing menus is a costly and time-consuming process. They lack an easy way to digitize their offerings, showcase their dishes with high-quality images, or handle special requests and updates dynamically.
- **For customers:** Paper menus offer a limited experience. They cannot be easily searched, lack rich visuals, and don't cater to dietary restrictions or preferences effectively. Finding specific items requires manually scanning the entire menu, which is inefficient and frustrating.

## 2. The Solution: Why MenuMind?

MenuMind bridges this gap by transforming the static menu into a dynamic, interactive experience. It empowers restaurant owners to take control of their digital presence with minimal effort while providing customers with a powerful and intuitive tool to explore their dining options.

The core value proposition is **intelligent digitization**. We are not just putting a PDF online; we are creating a structured, queryable, and enhanceable dataset from a simple photo.

## 3. How It Should Work: User Experience Goals

### Restaurant Owner Flow
1.  **Onboarding:** The owner signs up and creates their restaurant profile.
2.  **Menu Creation:**
    *   The owner takes a photo of their existing menu.
    *   The app's AI engine (Azure GPT-4o) parses the image, extracting items, descriptions, and prices into a structured JSON format. It intelligently infers missing data like categories, vegetarian status, and spice levels.
    *   The owner is presented with a clean, editable digital menu.
3.  **Menu Management:**
    *   The owner can review, add, edit, or delete any menu item.
    *   For items without an image, they can either upload their own or use the AI-powered image generator (Gemini) to create a high-quality, appealing photo based on the item's description.
4.  **Publishing:** Once satisfied, the owner generates a unique QR code for the menu, ready to be displayed in their restaurant.

### Customer Flow
1.  **Access:** The customer scans the QR code on their table with their smartphone.
2.  **Menu Landing Page:** They are immediately taken to a mobile-optimized, fast-loading web page displaying the menu. No app download or authentication is required.
    *   The interface is clean and visual, with categories as tabs and items displayed in a two-column grid with large images.
3.  **Interactive Discovery:**
    *   A prominent chat bar is available at the bottom of the screen.
    *   The customer can type natural language queries (e.g., "what are the spicy chicken dishes?", "show me vegan options under 200").
    *   The AI-powered RAG search provides intelligent, visual recommendations in the chat window, not just plain text.
4.  **Ordering:**
    *   Clicking an item (either from the grid or the chat results) opens a bottom sheet with detailed information and an option to add it to their cart.
    *   The cart functionality allows them to review their selections before placing an order (the ordering submission system will be defined later).
