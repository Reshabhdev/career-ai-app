from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from qdrant_client.models import Filter, FieldCondition, Range
import os
import sys

sys.path.append(os.getcwd())
from app.core.config import settings

class CareerEngine:
    def __init__(self):
        print("⚙️  Connecting to Qdrant...")
        db_path = getattr(settings, "QDRANT_LOCAL_PATH", os.path.join(settings.DATA_DIR, "qdrant_db"))
        if settings.QDRANT_URL and settings.QDRANT_API_KEY:
            self.client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
        else:
            self.client = QdrantClient(path=db_path)
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.collection = "careers"

    def search(self, user_query: str, max_education_level: int = 5, top_k=5):
        query_vector = self.model.encode(user_query).tolist()

        search_result = self.client.query_points(
            collection_name=self.collection,
            query=query_vector,
            limit=top_k,
            with_payload=True,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="job_zone",
                        range=Range(lte=max_education_level)
                    )
                ]
            )
        )

        results = []
        for hit in search_result.points:
            payload = hit.payload
            results.append({
                "id": payload['soc_code'],
                "title": payload['title'],
                "match_score": round(hit.score * 100, 2),
                "education_requirement": payload['education'],
                "description": payload['description']
            })
            
        return results