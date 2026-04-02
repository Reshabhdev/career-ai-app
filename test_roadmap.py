import urllib.request
import json
url = "http://localhost:8000/api/roadmap"
data = {
    "user_profile": {
        "interests": "coding",
        "skills": "Python",
        "age": 25,
        "education_level_id": 4
    },
    "job_title": "AI Engineer"
}
req = urllib.request.Request(url, data=json.dumps(data).encode(), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as response:
        print("SUCCESS:")
        print(response.read().decode())
except Exception as e:
    print("ERROR:")
    print(e.read().decode() if hasattr(e, 'read') else str(e))
