# 🧭 Project: Real-Time Career Recommendation Engine
**Status:** 🚧 In Progress  
**Role:** Senior ML Engineer  
**Goal:** Build a semantic search engine that matches user profiles (skills, interests) to career paths using Vector Embeddings and LLMs.

---

## 📅 Phase 1: Architecture & Environment Setup
*Establish the foundation. Do not write business logic yet; ensure the factory floor is ready.*

- [ ] **1.1 Define Tech Stack**
    - [ ] Language: Python 3.10+
    - [ ] API Framework: FastAPI (Async efficiency)
    - [ ] ML Framework: PyTorch / Sentence-Transformers
    - [ ] Vector Database: FAISS (Local dev) or Pinecone (Cloud prod)
    - [ ] Data Processing: Pandas, NumPy
- [ ] **1.2 Project Scaffolding**
    - [ ] Initialize Git repository
    - [ ] Create virtual environment (`venv` or `poetry`)
    - [ ] Setup folder structure:
      ```
      /app
        /api        # Endpoints
        /core       # Config & Security
        /services   # ML Logic (Inference)
        /data       # Raw & Processed Data
      /notebooks    # EDA & Experiments
      ```
- [ ] **1.3 Dependency Management**
    - [ ] Create `requirements.txt` with locked versions.

---

## 🗄️ Phase 2: Data Engineering (The "Ground Truth")
*A model is only as good as its data. We need a standardized catalog of careers.*

- [ ] **2.1 Data Sourcing**
    - [ ] Download **O*NET Database** (Occupational Information Network).
    - [ ] (Optional) Download **ESCO** dataset for alternative skill mapping.
- [ ] **2.2 Data Cleaning & Normalization**
    - [ ] Merge disparate tables (Job Titles + Descriptions + Skills).
    - [ ] **Text Preprocessing:**
        - [ ] Lowercasing & Punctuation removal.
        - [ ] Stopword removal (be careful not to remove semantic words like "C" or "IT").
        - [ ] Skill entity extraction (Standardizing "React.js" -> "React").
- [ ] **2.3 Dataset Construction**
    - [ ] Create a "Golden CSV" with columns: `[id, title, description, skills_list, combined_text_blob]`.
    - [ ] Validate data quality (check for nulls, duplicates).

---

## 🧠 Phase 3: The AI Engine (Embeddings & Search)
*The core logic. Converting text to math and finding neighbors.*

- [ ] **3.1 Embedding Pipeline**
    - [ ] Select Model: `all-MiniLM-L6-v2` (Speed) or `text-embedding-3-small` (Quality).
    - [ ] Write script to batch-process the "Golden CSV" into vectors.
    - [ ] Save embeddings to disk (`.npy` or `.pickle`) for local caching.
- [ ] **3.2 Vector Database Integration**
    - [ ] Initialize Vector Index (FAISS or Pinecone).
    - [ ] Upload career vectors to the index.
- [ ] **3.3 Search Logic (The Matchmaker)**
    - [ ] Implement `search(user_vector, top_k=5)` function.
    - [ ] Implement **Cosine Similarity** scoring.
    - [ ] Add **Metadata Filtering** (e.g., Filter by `Degree Level` or `Sector`).

---

## 🔌 Phase 4: API Development (FastAPI)
*Exposing the brain to the world. Building a robust backend.*

- [ ] **4.1 API Basics**
    - [ ] Setup `main.py` entry point.
    - [ ] Create Health Check endpoint (`/health`).
- [ ] **4.2 Request/Response Modeling (Pydantic)**
    - [ ] Define `UserProfile` schema (Inputs: interest, skills, age, etc.).
    - [ ] Define `CareerRecommendation` schema (Outputs: title, score, reason).
- [ ] **4.3 The Recommendation Endpoint**
    - [ ] `POST /api/v1/recommend`: Accepts user JSON, runs logic, returns JSON.
    - [ ] Implement async handlers to prevent blocking.

---

## 🚀 Phase 5: "Industry Level" Polish
*Moving from "it works" to "it's smart."*

- [ ] **5.1 RAG Layer (Explainability)**
    - [ ] Integrate an LLM (Gemini/GPT/Llama).
    - [ ] Prompt Engineering: "Here is the user profile and the job. Explain WHY they match."
- [ ] **5.2 User Cold Start Handling**
    - [ ] Implement a fallback for users with sparse data (e.g., broad category matching).
- [ ] **5.3 Performance Optimization**
    - [ ] Cache frequent queries (Redis).
    - [ ] Optimize vector search latency (<200ms).

---

## 📦 Phase 6: Deployment & Ops
*Shipping the code.*

- [ ] **6.1 Containerization**
    - [ ] Write `Dockerfile` (Multi-stage build for small image size).
- [ ] **6.2 Documentation**
    - [ ] Write `README.md` with setup instructions.
    - [ ] Ensure Swagger UI (`/docs`) is descriptive.