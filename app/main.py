from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.services.engine import CareerEngine
from app.services.advisor import CareerAdvisor
from app.api.models import UserProfile, RecommendationResponse

service_container = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting Server...")
    service_container["engine"] = CareerEngine()
    service_container["advisor"] = CareerAdvisor()
    yield
    print("🛑 Shutting down...")

app = FastAPI(title="Career Compass AI", version="1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.post("/api/recommend", response_model=RecommendationResponse)
def get_recommendations(user: UserProfile):
    engine = service_container.get("engine")
    advisor = service_container.get("advisor")

    if not engine or not advisor:
        raise HTTPException(status_code=500, detail="Services not initialized")

    search_query = f"{user.interests}. My skills are: {user.skills}."
    
    try:
        results = engine.search(
            user_query=search_query,
            max_education_level=user.education_level_id,
            top_k=5
        )
    except Exception as e:
        print(f"❌ SEARCH ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Search Error: {str(e)}")

    ai_summary = advisor.generate_advice(user_profile=user.dict(), jobs=results)

    return {
        "user_summary": ai_summary,
        "recommendations": results
    }