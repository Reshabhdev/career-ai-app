import os
from openai import OpenAI
from app.core.config import settings

class CareerAdvisor:
    def __init__(self):
        # We try to load the API key from environment
        # If no key is found, we will use "Mock Mode"
        api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=api_key) if api_key else None

    def generate_advice(self, user_profile: dict, jobs: list):
        """
        user_profile: Dict with 'interests', 'skills', 'age'
        jobs: List of top matching career dictionaries
        """
        
        # --- Mock Mode (Fallback if no API Key) ---
        if not self.client:
            print("⚠️ No API Key found. Using Mock Advisor.")
            top_job = jobs[0]['title']
            return (
                f"Based on your interest in '{user_profile['interests']}', "
                f"I highly recommend looking into **{top_job}**. "
                f"Your skills in {user_profile['skills']} align perfectly with this role."
            )

        # --- Real AI Mode ---
        # 1. Construct the Prompt (The "Context")
        system_prompt = "You are an expert Career Counselor. Be encouraging, professional, and concise."
        
        user_prompt = f"""
        Analyze this user profile:
        - Interests: {user_profile['interests']}
        - Skills: {user_profile['skills']}
        - Age: {user_profile['age']}
        
        We have identified these top career matches from our database:
        { [j['title'] for j in jobs] }
        
        Task:
        1. Select the #1 best option and explain WHY it fits their specific skills.
        2. Suggest one "alternative path" from the list for variety.
        3. Keep the response under 100 words.
        """

        # 2. Call the LLM
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo", # Or gpt-4o / gemini-pro
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=150
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Could not generate advice: {str(e)}"