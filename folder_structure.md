# Application Folder Structure Details

This document provides a brief, detailed description of every folder within the Career Compass AI application.

## Root Directories

- **`app/`**
  The main backend application directory. It is built using FastAPI and contains all server-side logic, API endpoints, ML models integration, and data processing scripts.

- **`frontend/`**
  The frontend application directory. It is built with React 19, Vite, and Tailwind CSS. It contains all the UI components, pages, and logic for the user-facing web application.

- **`.git/`**
  The Git version control directory. It stores the repository's history, commits, branches, and configuration.

- **`.vscode/`**
  Workspace configuration folder for Visual Studio Code. It typically contains settings, debugging configurations (`launch.json`), and recommended extensions for the project.

- **`venv/`**
  The Python virtual environment. It isolates the backend Python dependencies (like FastAPI, pandas, sentence-transformers, Qdrant) from the global system Python packages.

---

## Backend (`app/`) Subdirectories

- **`app/api/`**
  Contains the definition of the RESTful API endpoints and Pydantic models (such as `models.py`) used for request validation and response formatting.

- **`app/core/`**
  Contains core backend configurations, such as environment variable loading (`config.py`), application settings, and database connection setups.

- **`app/services/`**
  The heart of the backend business logic. It includes:
  - `engine.py`: The semantic search engine matching user profiles to careers.
  - `indexer.py`: Scripts to embed job data and index it into the Qdrant vector database.
  - `advisor.py`: Integration with OpenAI's LLM to generate personalized career advice.
  - `data_processor.py`: Utilities for cleaning and preparing raw datasets before indexing.

- **`app/data/`**
  Directory for persistent and temporary data storage. It contains:
  - `qdrant_db/`: The local instance of the Qdrant vector database.
  - Precomputed embeddings (`career_embeddings.npy`) and processed datasets (`career_gold_dataset.csv`).

- **`app/__pycache__/`**
  Automatically generated folder by Python containing compiled bytecode (`.pyc` files), allowing the backend to start up faster on subsequent runs.

---

## Frontend (`frontend/`) Subdirectories

- **`frontend/src/`**
  The main source code directory for the React application. It includes main application components (`App.jsx`, `MainApp.jsx`), API clients (`api.js`), and global stylesheets (`App.css`).

- **`frontend/src/assets/`**
  Stores static assets like images, SVGs, or fonts that are imported directly into React components and processed by Vite during the build step.

- **`frontend/public/`**
  Contains static files that should be served as-is without being processed by Vite's build pipeline, such as `favicon.ico` or basic HTML templates.

- **`frontend/node_modules/`**
  The directory where npm installs all the third-party JavaScript libraries and dependencies required by the frontend application.
