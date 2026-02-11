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

        # Try to connect to remote or local Qdrant; fall back to an in-process local search
        try:
            if settings.QDRANT_URL and settings.QDRANT_API_KEY:
                self.client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
            else:
                self.client = QdrantClient(path=db_path)
            print("✅ Qdrant client initialized")
        except Exception as e:
            print(f"⚠️ Qdrant initialization failed: {e} — falling back to local search")
            self.client = None

            # Local fallback: load precomputed embeddings and job metadata
            try:
                import numpy as _np
                import pandas as _pd

                emb_path = os.path.join(settings.DATA_DIR, "career_embeddings.npy")
                csv_path = os.path.join(settings.DATA_DIR, "career_gold_dataset.csv")
                self.embeddings = _np.load(emb_path)
                df = _pd.read_csv(csv_path)
                self.local_jobs = df.to_dict(orient="records")
                print(f"✅ Loaded local fallback data: {len(self.local_jobs)} jobs")
            except Exception as e2:
                print(f"❌ Failed to load local fallback data: {e2}")
                self.embeddings = None
                self.local_jobs = []

        # SentenceTransformer used both with Qdrant (to create query vectors)
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.collection = "careers"

    def search(self, user_query: str, max_education_level: int = 5, top_k=5):
        # If Qdrant is available, use it as before
        if self.client:
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
                    "id": payload.get('soc_code', str(hit.id)),
                    "title": payload.get('title', 'Unknown'),
                    "match_score": round(hit.score * 100, 2),
                    "education_requirement": payload.get('education', ''),
                    "description": payload.get('description', '')
                })

            return results

        # Local fallback search using precomputed embeddings
        if self.embeddings is None or not hasattr(self, 'local_jobs') or len(self.local_jobs) == 0:
            raise RuntimeError("No search backend available (Qdrant unavailable and local fallback missing)")

        # Compute similarity between query vector and embeddings
        query_vec = self.model.encode(user_query).reshape(1, -1)
        try:
            from sklearn.metrics.pairwise import cosine_similarity
            import numpy as _np

            sims = cosine_similarity(query_vec, self.embeddings)[0]
            # Filter by job_zone (csv column 'Job Zone' -- numeric), then take top_k
            indexed = list(enumerate(sims))
            # Apply education/job zone filter
            filtered = []
            for idx, score in indexed:
                try:
                    job_zone = float(self.local_jobs[idx].get('Job Zone', self.local_jobs[idx].get('Job_Zone', 5)))
                except Exception:
                    job_zone = 5.0
                if job_zone <= float(max_education_level):
                    filtered.append((idx, score))

            filtered.sort(key=lambda x: x[1], reverse=True)
            top = filtered[:top_k]

            results = []
            for idx, score in top:
                row = self.local_jobs[idx]
                results.append({
                    "id": row.get('O*NET-SOC Code') or row.get('O*NET_SOC Code') or str(idx),
                    "title": row.get('Title') or row.get('title') or 'Unknown',
                    "match_score": round(float(score) * 100, 2),
                    "education_requirement": row.get('Education_Level') or row.get('Education Level') or '',
                    "description": row.get('Description') or ''
                })

            return results
        except Exception as e:
            raise RuntimeError(f"Local search failed: {e}")