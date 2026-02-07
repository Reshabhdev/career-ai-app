# 1. Use an official lightweight Python image
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Install system dependencies (needed for some Python packages)
RUN apt-get update && apt-get install -y \
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
# Use PyTorch's CPU wheel index to avoid building from source in constrained build environments
RUN pip install --no-cache-dir -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

# 5. Copy the rest of your application code
COPY app ./app

# 6. Expose the port the app runs on
EXPOSE 8000

# 7. Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]