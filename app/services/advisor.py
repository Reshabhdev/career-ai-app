import os
from openai import OpenAI
from app.core.config import settings

class CareerAdvisor:
    def __init__(self):
        # We try to load the API key from environment
        # If no key is found, we will use "Mock Mode"
        api_key = getattr(settings, "OPENAI_API_KEY", None) or os.getenv("OPENAI_API_KEY")
        self.model = "gpt-3.5-turbo"
        if api_key:
            if api_key.startswith("AIza"):
                self.client = OpenAI(api_key=api_key, base_url="https://generativelanguage.googleapis.com/v1beta/openai/")
                self.model = "gemini-2.5-flash"
            else:
                self.client = OpenAI(api_key=api_key)
        else:
            self.client = None

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
                model=self.model, # Or gpt-4o / gemini-pro
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Could not generate advice: {str(e)}"

    def generate_roadmap(self, user_profile: dict, job_title: str):
        """
        user_profile: Dict with 'interests', 'skills', 'age'
        job_title: The selected career title
        """
        if not self.client:
            print("⚠️ No API Key found. Using Mock Advisor.")
            skills = user_profile.get('skills') or 'your field'
            return (
                f"# Roadmap for {job_title}\n\n"
                f"## Role Overview\n"
                f"As a **{job_title}**, you will be responsible for defining, designing, and delivering high-quality solutions in your domain. This role requires a strong mixture of technical proficiency, problem-solving, and continuous learning.\n\n"
                f"## Career Opportunities & Demand\n"
                f"- **Demand**: High demand across multiple industries including tech, finance, and enterprise software.\n"
                f"- **Salary Expectations**: Highly competitive, with specialized roles commanding premium compensation.\n"
                f"- **Growth Path**: Rapid progression into Lead, Staff, or Management positions.\n\n"
                f"## Recommended Study Strategy\n"
                f"To transition effectively into this role, focus heavily on project-based learning. Spend 30% of your time on theory (courses, documentation) and 70% on building real-world projects. Engage with online communities and build a highly visible public portfolio.\n\n"
                f"## 1. Foundations (Months 1-2)\n"
                f"- Review the core fundamentals and architecture of the industry.\n"
                f"- Complete a foundational certification or a highly-rated online bootcamp.\n\n"
                f"## 2. Advanced Skills (Months 3-4)\n"
                f"- Leverage your existing skills in **{skills}** to drastically accelerate your learning curve.\n"
                f"- Build two complex, end-to-end projects that solve a real problem.\n\n"
                f"## 3. Getting Hired (Month 5+)\n"
                f"- Create an online portfolio showcasing your newly built projects.\n"
                f"- Optimize your resume and actively network for **{job_title}** positions!\n\n"
                f"> **System Notice:** This is a locally generated system template. To receive a dynamic, highly personalized AI evaluation based on your exact profile parameters, please add an `OPENAI_API_KEY` to the `.env` file and restart the backend server."
            )

        system_prompt = "You are an expert Career Counselor and educational planner. Generate a highly detailed, step-by-step roadmap in Markdown format. Be encouraging, professional, and thorough."
        
        user_prompt = f"""
        User Profile:
        - Interests: {user_profile.get('interests')}
        - Current Skills: {user_profile.get('skills')}
        
        Target Career: {job_title}
        
        Task:
        Create a comprehensive, personalized roadmap to help this user achieve this target career.
        Format the response in rich Markdown. Make it sleek and highly readable (use bullet points, bold text, headers).
        Include:
        1. An encouraging introduction.
        2. A brief overview of the role and its day-to-day responsibilities.
        3. Key career opportunities (salary expectations, industry demand).
        4. Phases (e.g., Phase 1: Foundation, Phase 2: Skill Building, Phase 3: Portfolio/Experience).
        5. Specific skills they need to learn (bridging the gap from their current skills).
        6. Estimated timelines for each phase.
        7. How they can study (suggested types of resources, platforms, or actionable projects to complete).
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"**System Error**: Could not generate roadmap: {str(e)}"