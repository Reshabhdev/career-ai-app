from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.services.engine import CareerEngine
from app.services.advisor import CareerAdvisor
from app.api.models import UserProfile, RecommendationResponse, RoadmapRequest, RoadmapResponse

import asyncio
import threading

service_container = {}
service_lock = threading.Lock()

def get_engine():
    with service_lock:
        if "engine" not in service_container:
            try:
                service_container["engine"] = CareerEngine()
            except Exception as e:
                print(f"⚠️ Failed to initialize CareerEngine: {e}")
                service_container["engine"] = None
    return service_container.get("engine")

def get_advisor():
    with service_lock:
        if "advisor" not in service_container:
            try:
                service_container["advisor"] = CareerAdvisor()
            except Exception as e:
                print(f"⚠️ Failed to initialize CareerAdvisor: {e}")
                service_container["advisor"] = None
    return service_container.get("advisor")

def init_services():
    get_engine()
    get_advisor()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting Server...")
    # Background initialization prevents port-binding timeout on platforms like Render
    try:
        loop = asyncio.get_running_loop()
        loop.run_in_executor(None, init_services)
    except Exception as e:
        print(f"⚠️ Failed to schedule background init: {e}")
    yield
    print("🛑 Shutting down...")

app = FastAPI(title="Career Compass AI", version="1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "name": "Career Compass AI",
        "version": "1.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "api_docs": "/docs",
            "recommendations": "POST /api/recommend"
        }
    }

@app.post("/api/recommend", response_model=RecommendationResponse)
def get_recommendations(user: UserProfile):
    engine = get_engine()
    advisor = get_advisor()

    if not engine or not advisor:
        raise HTTPException(status_code=500, detail="Services not initialized")

    search_query = f"{user.interests}. My skills are: {user.skills}."
    

    import time
    t0 = time.time()
    try:
        results = engine.search(
            user_query=search_query,
            max_education_level=user.education_level_id,
            top_k=5
        )
    except Exception as e:
        print(f"❌ SEARCH ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Search Error: {str(e)}")
    t1 = time.time()
    print(f"[TIMING] /api/recommend total search time: {t1-t0:.3f}s")

    ai_summary = advisor.generate_advice(user_profile=user.dict(), jobs=results)

    return {
        "user_summary": ai_summary,
        "recommendations": results
    }

@app.post("/api/roadmap", response_model=RoadmapResponse)
def get_roadmap(req: RoadmapRequest):
    advisor = get_advisor()

    if not advisor:
        raise HTTPException(status_code=500, detail="Advisor Service not initialized")

    import time
    t0 = time.time()
    try:
        roadmap_md = advisor.generate_roadmap(
            user_profile=req.user_profile.dict(),
            job_title=req.job_title
        )
    except Exception as e:
        print(f"❌ ROADMAP ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Roadmap Error: {str(e)}")
    t1 = time.time()
    print(f"[TIMING] /api/roadmap total generation time: {t1-t0:.3f}s")

    return {
        "roadmap": roadmap_md
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}