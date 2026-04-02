import os
import pandas as pd
import numpy as np
from datasets import load_dataset
from sentence_transformers import SentenceTransformer

def setup_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")
    
    csv_path = os.path.join(data_dir, "job_dataset.csv")
    out_npy_path = os.path.join(data_dir, "job_embeddings.npy")
    
    os.makedirs(data_dir, exist_ok=True)
    
    print("Loading azrai99/job-dataset from Hugging Face...")
    ds = load_dataset("azrai99/job-dataset")
    
    print("Converting to pandas DataFrame...")
    if 'train' in ds:
        df = ds['train'].to_pandas()
    else:
        split_name = list(ds.keys())[0]
        df = ds[split_name].to_pandas()
        
    print(f"Saving to {csv_path}...")
    df.to_csv(csv_path, index=False)
    
    print("Creating text descriptions for embedding...")
    df = df.fillna("")
    texts = df['job_title'] + " " + df['descriptions']
    texts = texts.tolist()
    
    print("Loading SentenceTransformer (this may download weights)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    print(f"Generating vectors for {len(texts)} jobs... This might take a couple of minutes.")
    embeddings = model.encode(texts, show_progress_bar=True, batch_size=256)
    
    print("Saving job_embeddings.npy...")
    np.save(out_npy_path, embeddings)
    print("Dataset and embeddings successfully setup!")

if __name__ == "__main__":
    setup_data()
