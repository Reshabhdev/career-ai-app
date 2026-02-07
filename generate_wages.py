import pandas as pd
import numpy as np
import os
from app.core.config import settings

def create_mock_wages():
    print("💰 Generating Realistic Wages Data...")
    
    # 1. Load your existing jobs to get the SOC Codes
    processed_path = os.path.join(settings.DATA_DIR, settings.PROCESSED_DATA_FILE)
    if not os.path.exists(processed_path):
        print("❌ Error: Processed data not found. Run data_processor.py (v2) first.")
        return

    df = pd.read_csv(processed_path)
    
    # 2. Create Realistic Logic
    # We will base salary on "Job Zone" (Education Level)
    # Zone 1 (Low skill) -> $30k - $45k
    # Zone 5 (High skill) -> $90k - $150k
    
    wages_data = []
    
    for _, row in df.iterrows():
        zone = row['Job Zone'] if 'Job Zone' in row else 3
        
        # Base salary logic
        base_salary = 30000 + (zone * 15000)
        random_variance = np.random.randint(-5000, 20000)
        final_salary = base_salary + random_variance
        
        # Growth logic (-2% to +15%)
        growth = np.random.randint(-2, 15)
        
        wages_data.append({
            "O*NET-SOC Code": row['O*NET-SOC Code'],
            "Median Annual Wage": f"${final_salary:,}", # Format as $55,000
            "Percent Change": growth
        })
    
    # 3. Save as the file we need
    wages_df = pd.DataFrame(wages_data)
    output_path = os.path.join(settings.DATA_DIR, "Wages and Employment.txt")
    
    # Save as Tab-Separated to mimic real O*NET
    wages_df.to_csv(output_path, sep="\t", index=False)
    
    print(f"✅ Created 'Wages and Employment.txt' with {len(wages_df)} entries.")
    print(f"   Sample: {wages_df.head(1).to_dict('records')}")

if __name__ == "__main__":
    create_mock_wages()