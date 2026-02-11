import pandas as pd
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance, CreateIndexRequest
import os
import sys

sys.path.append(os.getcwd())
from app.core.config import settings

def index_to_qdrant():
    print("🚀 Starting Indexing (Clean)...")

    db_path = getattr(settings, "QDRANT_LOCAL_PATH", os.path.join(settings.DATA_DIR, "qdrant_db"))
    # If QDRANT_URL and QDRANT_API_KEY are provided (set them in your environment),
    # use the cloud Qdrant instance. Otherwise fall back to local file-based DB.
    if settings.QDRANT_URL and settings.QDRANT_API_KEY:
        try:
            client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY, timeout=30)
        except Exception as e:
            print(f"⚠️ Failed to connect to remote Qdrant: {e}")
            print("   Using local Qdrant fallback instead.")
            client = QdrantClient(path=db_path)
    else:
        client = QdrantClient(path=db_path)
    
    COLLECTION_NAME = "careers"

    # Reset Collection
    try:
        client.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )
        # Create index on job_zone field for filtering
        client.create_payload_index(
            collection_name=COLLECTION_NAME,
            field_name="job_zone",
            field_schema="integer"
        )
    except Exception as e:
        print(f"⚠️ Failed to recreate collection: {e}")
        print("   Skipping indexing. Using local fallback embeddings instead.")
        return

    # Load Data
    csv_path = os.path.join(settings.DATA_DIR, settings.PROCESSED_DATA_FILE)
    df = pd.read_csv(csv_path).fillna("Unknown")
    
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print(f"   🧠 Vectorizing {len(df)} jobs...")
    vectors = model.encode(df['combined_text'].tolist(), show_progress_bar=True)

    # Upload
    points = []
    for idx, row in df.iterrows():
        points.append(PointStruct(
            id=idx,
            vector=vectors[idx].tolist(),
            payload={
                "title": row['Title'],
                "soc_code": row['O*NET-SOC Code'],
                "education": row['Education_Level'],
                "job_zone": int(row['Job Zone']),
                "description": str(row['Description'])[:400]
            }
        ))

    try:
        client.upsert(collection_name=COLLECTION_NAME, points=points)
        print(f"   ✅ Indexed {len(points)} jobs.")
    except Exception as e:
        print(f"⚠️ Failed to upload to Qdrant: {e}")
        print("   The application will use local fallback embeddings for search.")

if __name__ == "__main__":
    index_to_qdrant()