import pandas as pd
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
# FIXED IMPORT LINE BELOW:
from qdrant_client.models import PointStruct, VectorParams, Distance, PayloadSchemaType
import os
import sys
from dotenv import load_dotenv

# Load .env file explicitly
load_dotenv()

# Add project root to path
sys.path.append(os.getcwd())
from app.core.config import settings

def index_to_qdrant():
    print("🚀 Starting Indexing Process...")

    # --- 1. CONNECT (Hybrid Cloud/Local Logic) ---
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_key = os.getenv("QDRANT_API_KEY")

    if qdrant_url and qdrant_key:
        print(f"☁️  Cloud Detected. Connecting to: {qdrant_url[:20]}...")
        try:
            client = QdrantClient(url=qdrant_url, api_key=qdrant_key, timeout=60)
        except Exception as e:
            print(f"⚠️ Cloud Connection Failed: {e}")
            return
    else:
        print("💾 No Cloud Keys found. Using Local Disk (app/data/qdrant_db)...")
        db_path = os.path.join(settings.DATA_DIR, "qdrant_db")
        client = QdrantClient(path=db_path)
    
    COLLECTION_NAME = "careers"

    # --- 2. RESET COLLECTION & CREATE INDEX ---
    try:
        print("   Recreating Collection...")
        client.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )
        
        # *** INDEX CREATION (Fixed) ***
        print("   Creating Index for 'job_zone' filtering...")
        client.create_payload_index(
            collection_name=COLLECTION_NAME,
            field_name="job_zone",
            field_schema=PayloadSchemaType.INTEGER  # Use the Enum, not a raw string
        )
        print("   ✅ Collection ready.")
        
    except Exception as e:
        print(f"❌ Critical Error creating collection: {e}")
        return

    # --- 3. LOAD DATA ---
    csv_path = os.path.join(settings.DATA_DIR, settings.PROCESSED_DATA_FILE)
    if not os.path.exists(csv_path):
        print(f"❌ Error: Data file not found at {csv_path}")
        return

    df = pd.read_csv(csv_path).fillna("Unknown")
    
    print(f"   🧠 Vectorizing {len(df)} jobs...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    vectors = model.encode(df['combined_text'].tolist(), show_progress_bar=True)

    points = []
    for idx, row in df.iterrows():
        # Handle potential float/NaN issues in Job Zone
        try:
            jz = int(row['Job Zone'])
        except:
            jz = 1

        points.append(PointStruct(
            id=idx,
            vector=vectors[idx].tolist(),
            payload={
                "title": row['Title'],
                "soc_code": row['O*NET-SOC Code'],
                "education": row['Education_Level'],
                "job_zone": jz,
                "description": str(row['Description'])[:400]
            }
        ))

    # --- 4. UPLOAD IN BATCHES ---
    print(f"   📤 Uploading {len(points)} points...")
    
    BATCH_SIZE = 100
    for i in range(0, len(points), BATCH_SIZE):
        batch = points[i : i + BATCH_SIZE]
        try:
            client.upsert(collection_name=COLLECTION_NAME, points=batch)
            print(f"      - Uploaded batch {i} to {i + len(batch)}")
        except Exception as e:
            print(f"      ❌ Failed to upload batch {i}: {e}")

    print("   🎉 Indexing Complete!")

if __name__ == "__main__":
    index_to_qdrant()