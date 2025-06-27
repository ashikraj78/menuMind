# Technical Context: MenuMind

## 1. Frontend: Next.js

-   **Framework:** Next.js 14+ (using App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS for utility-first styling.
-   **UI Components:** Shadcn/UI for accessible and reusable components (e.g., buttons, dialogs, cards). This will help us build the UI quickly and consistently.
-   **State Management:** React Context API for simple global state (like user auth). For more complex client-side state, we might consider Zustand if needed.
-   **Data Fetching:** React Query (TanStack Query) for managing server state, caching, and mutations.
-   **Forms:** React Hook Form for performant and easy-to-manage forms in the admin dashboard.
-   **PWA:** Standard PWA features will be implemented using `next-pwa`.

## 2. Backend: FastAPI

-   **Framework:** FastAPI
-   **Language:** Python 3.10+
-   **Data Validation:** Pydantic for request/response data validation and settings management.
-   **Database ORM:** SQLAlchemy or directly using the `supabase-py` library for database interactions. Given the direct integration, `supabase-py` is preferred for simplicity.
-   **Dependencies:**
    *   `uvicorn`: ASGI server to run the application.
    *   `python-multipart`: For handling file uploads (menu images).
    *   `openai`: The official Python client for interacting with Azure's OpenAI service.
    *   `google-generativeai`: The official Python client for the Gemini API.
    *   `supabase-py`: The official Python client for Supabase.
    *   `pgvector`: To be used with `supabase-py` for vector operations.

## 3. Database & Services: Supabase

-   **Authentication:** Supabase Auth will handle user (restaurant owner) sign-up, login, and session management.
-   **Database:** Supabase's PostgreSQL will be our primary database. Key tables will include `restaurants`, `menus`, and `menu_items`. Row-Level Security (RLS) will be enabled to ensure owners can only access their own data.
-   **Storage:** Supabase Storage will be used to store all user-uploaded images and AI-generated images for menu items.
-   **Vector Search:** The `pgvector` extension will be enabled in Supabase to handle the vector embeddings and similarity search required for the RAG functionality.

## 4. AI & External Services

-   **Menu Parsing:** **Azure GPT-4o Vision**. We will use the REST API via the `openai` python library. The API key will be stored securely as an environment variable in the FastAPI backend.
-   **Image Generation:** **Google Gemini API**. We will use the REST API via the `google-generativeai` python library. The API key will be stored securely as an environment variable in the FastAPI backend.

## 5. Development & Deployment

-   **Code Management:** Git and GitHub.
-   **Environment Variables:** `python-dotenv` for the backend and Next.js's built-in environment variable support for the frontend.
-   **Deployment (Proposed):**
    *   **Next.js Frontend:** Vercel, for its seamless integration with Next.js.
    *   **FastAPI Backend:** A containerized service (e.g., using Docker) deployed on a cloud platform like Google Cloud Run, AWS Fargate, or another PaaS that supports Python.
