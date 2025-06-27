# Active Context: MenuMind

## Last Updated: 2025-06-27

## 1. Current Focus: Backend Vector Search Unblocked, AI Integration Next

The FastAPI backend is operational, with all core CRUD endpoints and the Azure GPT-4o-powered menu parsing endpoint implemented. The major backend blocker—vector search errors due to the execute_sql function—has been resolved. Focus is now shifting to advanced AI features (image generation, RAG search) and frontend integration.

## 2. Recent Changes & Accomplishments

- **Vector Search Debugging & Fix:**  
  - Identified and resolved a critical issue with the Supabase `execute_sql` function, which caused "invalid input syntax for type json" errors when running vector search queries.
  - Root cause: The original function attempted to cast the entire result set (including custom types like pgvector) into a single jsonb variable, which Postgres cannot do for multi-row/multi-column SELECTs.
  - Solution: Replaced the function with a version that wraps the query as `SELECT jsonb_agg(t) FROM (<query>) t`, aggregating all rows into a JSON array. This is a standard, robust pattern for dynamic SQL-to-JSON conversion in Postgres.
  - Updated the backend SQL to cast `embedding` to text (`embedding::text as embedding`) to ensure JSON compatibility.
  - Confirmed that all embeddings in the database are valid float arrays; no corrupted or string values remain.
  - The search endpoint now returns results as expected, unblocking further backend and AI development.

- **FastAPI Backend Scaffolded:** All project routers and models for restaurants, menus, and menu items are implemented.
- **CRUD Endpoints Live:** Endpoints for creating, reading, updating, and deleting restaurants, menus, and menu items are available and protected by Supabase Auth.
- **Menu Parsing Endpoint:** `/parse-menu/` endpoint leverages Azure GPT-4o with a detailed prompt for extracting and enriching menu data from images.
- **Hybrid Search Embedding Integration:** Backend calls Azure OpenAI for generating embeddings for natural language queries (for RAG search).
- **Router Registration:** All routers are registered in `main.py` and the backend is ready for API consumption.
- **API Key Management:** Azure and Gemini API keys are referenced via environment variables and never exposed to the client.
- **Supabase Auth Test Endpoint:** `/auth/token` endpoint for obtaining a JWT using email and password (for development/testing only).
- **Menu Items by Menu Endpoint:** `GET /menu-items/menu/{menu_id}` lists all menu items for a given menu.
- **Decimal Serialization Fix:** Update endpoint for menu items now converts Decimal values (e.g., price) to float before sending to Supabase, preventing JSON serialization errors.
- **Postman Collection Updated:** All endpoints are documented for easy testing.
- **.env Loading Fixed:** Environment variable loading is robust; backend starts successfully from any working directory.

## 3. Next Steps

1. **Gemini Image Generation Endpoint:** Integrate Google Gemini for AI-powered dish image generation.
2. **RAG Search Endpoint:** Complete the hybrid search endpoint using pgvector for vector search and structured filtering.
3. **Frontend Integration:** Connect the Next.js frontend to the backend API for end-to-end functionality.
4. **Testing & Hardening:** Add tests, error handling, and security reviews for all endpoints.

## 4. Active Decisions & Considerations

- **Backend-First Approach:** Backend is now ready for frontend and AI feature integration.
- **Security:** All sensitive keys are managed via environment variables.
- **Supabase as Source of Truth:** All data operations are performed via Supabase, with RLS and ownership checks enforced in the API.
- **AI Prompt Consistency:** Azure GPT-4o prompt is kept in sync with the original mobile implementation for consistent results.
- **Schema Synchronization:** Backend code and memory bank schema are ahead of the actual Supabase database; migrations must be run to keep the DB in sync with the code and documentation.
- **Dynamic SQL-to-JSON Pattern:** The new execute_sql function using jsonb_agg is now the standard for dynamic SQL result serialization in this project.
