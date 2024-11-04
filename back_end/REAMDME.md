# Backend Setup 

The backend of this application is managed through server1.js. Please follow the steps below to run the backend:

Ensure you have all dependencies installed:
npm install

**Start the backend server by running:**
**node server1.js**
The backend will start and listen on the configured port (default is typically http://localhost:5000)

# Running the Backend with Docker

Build the Docker Image
From the project root, build the Docker image:
**docker build -t weatherapp-backend .**

This command creates a Docker image named weatherapp-backend

Run the Docker Container
# Start a container from the image:
docker run -p 5000:5000 weatherapp-backend

