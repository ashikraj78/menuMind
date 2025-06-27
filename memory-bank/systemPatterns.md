# System Patterns: MenuMind

## 1. System Architecture

The MenuMind application follows a modern, decoupled architecture with a Next.js frontend and a FastAPI backend. This separation of concerns allows for independent development, scaling, and maintenance of the client and server applications.

```mermaid
graph TD
    subgraph "User Devices"
        A[Restaurant Owner's Browser]
        B[Customer's Mobile Browser]
    end

    subgraph "Frontend (Next.js on Vercel)"
        C[Admin Dashboard]
        D[Menu Landing Page]
        E[Chat Interface]
    end

    subgraph "Backend (FastAPI)"
        F[REST API Endpoints]
        G[Menu Parsing Service]
        H[Image Generation Service]
        I[RAG Search Service]
    end

    subgraph "Cloud Services"
        J[Supabase Auth]
        K[Supabase Database (Postgres)]
        L[Supabase Storage]
        M[Azure GPT-4o]
        N[Google Gemini]
    end

    A -- "Manages Menu" --> C
    B -- "Views Menu & Chats" --> D
    D -- "Uses" --> E

    C -- "API Calls" --> F
    D -- "API Calls" --> F
    E -- "API Calls" --> F

    F -- "Handles Auth" --> J
    F -- "CRUD Ops" --> K
    F -- "Stores Files" --> L

    F -- "Delegates to" --> G
    F -- "Delegates to" --> H
    F -- "Delegates to" --> I

    G -- "Calls" --> M
    H -- "Calls" --> N
    I -- "Queries" --> K

```

## 2. Key Technical Patterns & Decisions

### 2.1. API Communication
-   **Protocol:** A RESTful API will be the primary method of communication between the Next.js frontend and the FastAPI backend.
-   **Authentication:** All authenticated endpoints will be protected using JWTs provided by Supabase Auth. The frontend will be responsible for acquiring, storing, and refreshing these tokens. The backend will validate the token on every protected request.

### 2.2. Menu Digitization Flow
1.  **Image Upload:** The Next.js client sends the menu image to a dedicated FastAPI endpoint.
2.  **Backend Processing:** The FastAPI server receives the image and forwards it to the **Menu Parsing Service**.
3.  **AI Parsing:** This service sends the image and the detailed prompt to **Azure GPT-4o**.
4.  **Data Storage:** The structured JSON response from Azure is then validated and stored in the `menu_items` table in the Supabase database. The relationship to the specific `menu` and `restaurant` is maintained via foreign keys.

### 2.3. Image Generation Flow
1.  **Request:** The owner clicks "Generate Image" for a menu item in the Admin Dashboard.
2.  **Backend Service:** A request is sent to the FastAPI backend, which calls the **Image Generation Service**.
3.  **AI Generation:** The service uses the item's description to prompt the **Google Gemini** image generation API.
4.  **Image Storage:** The generated image is received by the backend and uploaded directly to **Supabase Storage** in a designated bucket. The URL of the stored image is then saved in the corresponding `menu_items` table record.

### 2.4. RAG and Hybrid Search
-   **Vector Embeddings:** When a menu item is created or updated, the FastAPI backend will generate a vector embedding from its name and description. This embedding will be stored in a `vector` column in the `menu_items` table, using the `pgvector` extension in Supabase.
-   **Querying:** The customer's natural language query from the chat interface is sent to the **RAG Search Service** in the backend.
-   **Hybrid Search Logic:**
    1.  The service first converts the user's query into a vector embedding.
    2.  It performs a vector similarity search on the `menu_items` table to find semantically similar items.
    3.  It simultaneously parses the query for structured filters (e.g., "under 200", "vegetarian"). This will involve regular expressions or a simple keyword analysis to extract price constraints, dietary flags, etc.
    4.  The results from the vector search and the structured filter are combined to produce the final, most relevant list of recommendations.
    5.  This list is returned to the frontend for display in the chat window.
