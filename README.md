# 🧭 Career Compass AI

A semantic search-powered career recommendation engine that matches user profiles (skills, interests, education level) to optimal career paths using AI embeddings and LLMs.

**Live Demo:**
- 🌐 **Frontend:** https://career-ai-app-iota.vercel.app
- 🔌 **Backend API:** https://careersystem-backend.onrender.com/

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **AI-Powered Career Recommendations** - Uses semantic search to find careers matching your profile
- **Vectorized Job Database** - All 1000+ careers are indexed with embeddings (Sentence-Transformers)
- **Multi-factor Matching** - Considers skills, interests, education level, and job zones
- **LLM-Generated Advice** - OpenAI integration for personalized career guidance
- **Cloud & Local Support** - Works with Qdrant Cloud or local vector database
- **RESTful API** - FastAPI with full CORS support
- **Modern Frontend** - React + Vite + Tailwind CSS
- **Production-Ready** - Docker containerization + Cloud deployment (Render, Vercel)

---

## 🛠 Tech Stack

### Backend
- **Framework:** FastAPI (async Python web framework)
- **ML/AI:** 
  - Sentence-Transformers (embedding generation)
  - PyTorch (deep learning)
  - OpenAI API (LLM for advice generation)
- **Vector DB:** Qdrant (semantic search)
- **Data Processing:** Pandas, NumPy, scikit-learn
- **Server:** Uvicorn + Gunicorn
- **Environment:** python-dotenv

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Deployment
- **Backend:** Render.com (Python)
- **Frontend:** Vercel (Node.js/Static)
- **Reverse Proxy:** Nginx
- **Containerization:** Docker + Docker Compose

---

## 📁 Project Structure

```
careersystem/
├── app/                              # Backend application
│   ├── __init__.py
│   ├── main.py                       # FastAPI entry point
│   ├── api/
│   │   ├── __init__.py
│   │   └── models.py                 # Request/Response schemas
│   ├── core/
│   │   └── config.py                 # Settings & configuration
│   ├── services/
│   │   ├── __init__.py
│   │   ├── indexer.py                # Qdrant indexing script
│   │   ├── engine.py                 # Career search engine
│   │   ├── advisor.py                # LLM-based career advisor
│   │   └── data_processor.py         # Data cleaning & preprocessing
│   └── data/
│       ├── career_embeddings.npy     # Precomputed embeddings
│       ├── career_gold_dataset.csv   # Processed job catalog
│       └── qdrant_db/                # Local vector database
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── main.jsx                  # App entry point
│   │   ├── App.jsx                   # Main component
│   │   ├── Landing.jsx               # Landing page
│   │   ├── MainApp.jsx               # Application shell
│   │   ├── api.js                    # API client
│   │   ├── App.css
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── requirements.txt                  # Python dependencies
├── backend.Dockerfile                # Backend Docker image
├── frontend.Dockerfile               # Frontend Docker image
├── docker-compose.yml                # Multi-container setup
├── nginx.conf                        # Reverse proxy config
├── render.yaml                       # Render deployment config
├── generate_wages.py                 # Data generation script
├── implementationplan.md              # Development roadmap
└── README.md                         # This file
```

---

## 📦 Prerequisites

- **Python:** 3.10 or higher
- **Node.js:** 18 or higher (for frontend)
- **Git:** For version control
- **API Keys:**
  - OpenAI API key (for LLM advice generation)
  - Qdrant Cloud API key (optional, for cloud deployment)

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Reshabhdev/career-ai-app.git
cd careersystem
```

### 2. Backend Setup

#### Create Python Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Download Pre-trained Models

Sentence-Transformers models will be automatically downloaded on first use. Ensure you have internet connectivity.

### 3. Frontend Setup

```bash
cd frontend
npm install
cd ..
```

---

## ⚙️ Configuration

### Create `.env` File

In the project root, create a `.env` file with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Qdrant Cloud Configuration (Optional - for cloud deployment)
QDRANT_URL=https://your-qdrant-instance.qdrant.io
QDRANT_API_KEY=your-qdrant-api-key

# Frontend API Base URL (adjust as needed)
VITE_API_BASE_URL=http://localhost:8000

# Environment
ENVIRONMENT=development
```

### Configuration File

Backend settings are managed in [app/core/config.py](app/core/config.py):
- Data directory paths
- Model configurations
- Database settings

---

## 🏃 Running Locally

### Backend Server

```bash
# From project root, with venv activated
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Index Data to Qdrant (One-time setup)

Before first use, index the career data:

```bash
python app/services/indexer.py
```

This will:
1. Connect to Qdrant (cloud or local)
2. Load career data from CSV
3. Generate embeddings for all jobs
4. Create indexed collections for filtering

### Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Health Check

```bash
GET /health
```

Response:
```json
{
  "status": "healthy"
}
```

### Get Recommendations

```bash
POST /api/recommend
Content-Type: application/json

{
  "interests": "software development, web applications",
  "skills": "Python, JavaScript, React, SQL",
  "education_level_id": 4,
  "job_zone": 3
}
```

Response:
```json
{
  "user_summary": "Based on your Python and JavaScript skills...",
  "recommendations": [
    {
      "id": 0,
      "title": "Software Developer",
      "description": "Develop software applications...",
      "education": "Bachelor's Degree",
      "job_zone": 3
    },
    ...
  ]
}
```

### API Documentation

Interactive Swagger UI: `GET /docs`

---

## 🐳 Docker & Containerization

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This starts:
- Backend API on port 8000
- Frontend on port 3000
- Nginx reverse proxy on port 80

### Individual Docker Builds

**Backend:**
```bash
docker build -f backend.Dockerfile -t career-backend .
docker run -p 8000:8000 career-backend
```

**Frontend:**
```bash
docker build -f frontend.Dockerfile -t career-frontend .
docker run -p 3000:3000 career-frontend
```

---

## 🌐 Deployment

### Backend Deployment (Render.com)

1. Push to GitHub repository
2. Connect Render to your repo
3. Create new Web Service with:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app.main:app --workers 4`
   - **Environment Variables:** Add `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`
4. Deploy from [render.yaml](render.yaml)

**Live Backend:** https://careersystem-backend.onrender.com/

### Frontend Deployment (Vercel)

1. Push `frontend/` to GitHub
2. Import project on Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_BASE_URL=https://careersystem-backend.onrender.com`

**Live Frontend:** https://career-ai-app-iota.vercel.app

---

## 📊 Data Pipeline

### Data Sources

- **O*NET Database:** Career descriptions, required skills, education levels
- **Wage Data:** BLS employment and wage statistics

### Processing Steps

1. **Data Cleaning:** [data_processor.py](app/services/data_processor.py)
   - Normalize titles and descriptions
   - Extract and standardize skills
   - Remove duplicates and invalid entries

2. **Embedding Generation:** [indexer.py](app/services/indexer.py)
   - Use Sentence-Transformers (`all-MiniLM-L6-v2`) 
   - Create 384-dimensional vectors for all careers
   - Index in Qdrant with metadata (job zone, education level)

3. **Search & Ranking:** [engine.py](app/services/engine.py)
   - Semantic similarity matching
   - Filter by education level and job zone
   - Return top-K results

4. **AI Advice:** [advisor.py](app/services/advisor.py)
   - Use OpenAI API to generate personalized career guidance
   - Consider user profile and search results

---

## 🔑 Key Models & Components

### Request Schema ([api/models.py](app/api/models.py))

```python
class UserProfile(BaseModel):
    interests: str
    skills: str
    education_level_id: int
    job_zone: Optional[int] = None
```

### Response Schema

```python
class RecommendationResponse(BaseModel):
    user_summary: str
    recommendations: List[CareerMatch]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

### Development Workflow

- Follow PEP 8 style guide (Python)
- Run linting: `npm run lint` (frontend)
- Update README for significant changes
- Test locally before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

- **Issues:** GitHub Issues
- **Email:** contact@careercompass.ai
- **Documentation:** See [implementationplan.md](implementationplan.md) for architecture details

---

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Resume upload & parsing
- [ ] Salary prediction model
- [ ] User profiles & saved recommendations
- [ ] Mobile app (React Native)
- [ ] Advanced filtering (remote, industry, location)
- [ ] Career progression paths
- [ ] Skill gap analysis

---

**Built with ❤️ by the Career Compass Team**
