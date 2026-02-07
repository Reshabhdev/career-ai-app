from pydantic import BaseModel, Field
from typing import List

class UserProfile(BaseModel):
    interests: str
    skills: str
    age: int
    education_level_id: int

class CareerRecommendation(BaseModel):
    id: str
    title: str
    match_score: float
    education_requirement: str
    description: str

class RecommendationResponse(BaseModel):
    user_summary: str
    recommendations: List[CareerRecommendation]