# --- Stage 1: Build the React App ---
FROM node:18-slim as build
WORKDIR /app

# Build in production mode for smaller bundles
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install minimal build tools for native addons (some deps need compilation)
RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	python3 \
	&& rm -rf /var/lib/apt/lists/*

# Copy package.json first for layer caching
COPY frontend/package*.json ./
# Install full dependencies (devDependencies are required for the build e.g. Vite)
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the project (creates the 'dist' folder)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx config (we will create this in a second)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]