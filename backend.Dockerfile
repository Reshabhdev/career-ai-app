# 1. Use an official lightweight Python image
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Install system dependencies (needed for some Python packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	curl \
	git \
	libgomp1 \
	libsndfile1 \
	ffmpeg \
	&& rm -rf /var/lib/apt/lists/*

# 4. Copy requirements and install them
# (We assume you have a requirements.txt, if not we create it next)
COPY requirements.txt .
# Ensure pip is up-to-date then install requirements (use PyTorch CPU wheel index)
RUN python -m pip install --upgrade pip && \
	pip install --no-cache-dir -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

# 5. Copy the rest of your application code
COPY app ./app

# 6. Expose the port the app runs on (optional; Render provides $PORT at runtime)
EXPOSE 8000

# 7. Command to run the application
# Use the shell form so the `$PORT` env var provided by Render is expanded.
# Fall back to 8000 if PORT is not set locally.
CMD uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}"