import pandas as pd
import os
import sys

sys.path.append(os.getcwd())
from app.core.config import settings

def load_and_process_data():
    print("⏳ Starting Data Pipeline (Clean Version)...")
    
    # 1. Load Occupations
    occ_path = os.path.join(settings.DATA_DIR, settings.RAW_DATA_FILE)
    occupations = pd.read_csv(occ_path, sep="\t")

    # 2. Load Job Zones (Education)
    zones_path = os.path.join(settings.DATA_DIR, "Job Zones.txt")
    job_zones = pd.read_csv(zones_path, sep="\t")[["O*NET-SOC Code", "Job Zone"]]

    # 3. Load Skills
    skills_path = os.path.join(settings.DATA_DIR, settings.RAW_SKILLS_FILE)
    skills = pd.read_csv(skills_path, sep="\t")
    
    important_skills = skills[(skills["Scale ID"] == "IM") & (skills["Data Value"] >= 3.0)]
    skills_aggregated = (
        important_skills.groupby("O*NET-SOC Code")["Element Name"]
        .apply(lambda x: ", ".join(x))
        .reset_index()
    )
    skills_aggregated.rename(columns={"Element Name": "Skills"}, inplace=True)

    # 4. Merge Data
    print("   🔗 Merging datasets...")
    full_data = pd.merge(occupations[["O*NET-SOC Code", "Title", "Description"]], skills_aggregated, on="O*NET-SOC Code", how="left")
    full_data = pd.merge(full_data, job_zones, on="O*NET-SOC Code", how="left")

    # 5. Cleanup
    full_data["Skills"] = full_data["Skills"].fillna("General Skills")
    full_data["Job Zone"] = full_data["Job Zone"].fillna(1)

    zone_map = {
        1: "Entry Level", 2: "High School", 3: "Associate/Vocational",
        4: "Bachelor's Degree", 5: "Master's or Higher"
    }
    full_data["Education_Level"] = full_data["Job Zone"].map(zone_map)

    # 6. Create Search Text
    full_data["combined_text"] = (
        "Job Title: " + full_data["Title"] + ". " +
        "Education: " + full_data["Education_Level"].astype(str) + ". " +
        "Skills: " + full_data["Skills"] + ". " +
        "Description: " + full_data["Description"]
    )

    # 7. Save
    output_path = os.path.join(settings.DATA_DIR, settings.PROCESSED_DATA_FILE)
    full_data.to_csv(output_path, index=False)
    print(f"   🎉 Clean Data saved to: {settings.PROCESSED_DATA_FILE}")

if __name__ == "__main__":
    load_and_process_data()